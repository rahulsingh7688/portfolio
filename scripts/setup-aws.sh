#!/usr/bin/env bash
set -euo pipefail

# ─── Config ───────────────────────────────────────────────────────────────────
APP_NAME="rahul-singh-portfolio"
REGION="${AWS_REGION:-ap-south-1}"
GITHUB_REPO="${GITHUB_REPO:-https://github.com/YOUR_USERNAME/portfolio}"

echo "🔧 Setting up AWS infrastructure for: $APP_NAME"
echo "   Region: $REGION"
echo ""

# ── 1. Create IAM user for CI/CD ─────────────────────────────────────────────
echo "👤 Creating IAM user for GitHub Actions..."
aws iam create-user --user-name "${APP_NAME}-deployer" 2>/dev/null || echo "   User already exists"

aws iam attach-user-policy \
  --user-name "${APP_NAME}-deployer" \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess-Amplify 2>/dev/null || true

# Create access keys for CI
echo "🔑 Creating access keys..."
KEYS=$(aws iam create-access-key --user-name "${APP_NAME}-deployer")
ACCESS_KEY=$(echo "$KEYS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['AccessKey']['AccessKeyId'])")
SECRET_KEY=$(echo "$KEYS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['AccessKey']['SecretAccessKey'])")

echo ""
echo "⚠️  Save these credentials — they won't be shown again!"
echo "   AWS_ACCESS_KEY_ID:     $ACCESS_KEY"
echo "   AWS_SECRET_ACCESS_KEY: $SECRET_KEY"
echo ""
echo "   Add them to GitHub: Settings → Secrets → Actions"
echo ""

# ── 2. Create Amplify app ─────────────────────────────────────────────────────
echo "🚀 Creating AWS Amplify app..."
AMPLIFY_RESULT=$(aws amplify create-app \
  --name "$APP_NAME" \
  --platform WEB_COMPUTE \
  --region "$REGION" \
  --environment-variables "NEXT_PUBLIC_SITE_URL=https://rahulsingh.dev" \
  2>/dev/null || echo '{"app":{"appId":"already-exists"}}')

APP_ID=$(echo "$AMPLIFY_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin)['app']['appId'])" 2>/dev/null || \
  aws amplify list-apps --query "apps[?name=='$APP_NAME'].appId" --output text)

echo "   Amplify App ID: $APP_ID"
echo "   Add to GitHub Secrets as: AMPLIFY_APP_ID=$APP_ID"

# ── 3. Create Amplify branch ──────────────────────────────────────────────────
echo "🌿 Creating main branch in Amplify..."
aws amplify create-branch \
  --app-id "$APP_ID" \
  --branch-name main \
  --stage PRODUCTION \
  --region "$REGION" 2>/dev/null || echo "   Branch already exists"

echo ""
echo "✅ AWS setup complete!"
echo ""
echo "Next steps:"
echo "  1. Add GitHub secrets: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AMPLIFY_APP_ID"
echo "  2. Connect GitHub repo in Amplify Console (required for webhook triggers)"
echo "  3. Push to main branch to trigger first deployment"
echo "  4. Configure custom domain in Amplify Console → Domain management"
