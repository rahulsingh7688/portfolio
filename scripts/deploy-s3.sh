#!/usr/bin/env bash
set -euo pipefail

# ─── Config ───────────────────────────────────────────────────────────────────
BUCKET_NAME="${S3_BUCKET:-rahulsingh-portfolio}"
REGION="${AWS_REGION:-ap-south-1}"
CLOUDFRONT_DIST_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"

echo "🚀 Building Next.js static export..."
npm run build

echo "📦 Syncing to S3 bucket: s3://$BUCKET_NAME"

# Upload static assets with long cache (immutable)
aws s3 sync ./out "s3://$BUCKET_NAME" \
  --region "$REGION" \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "*.json"

# Upload HTML and JSON with no-cache (always revalidate)
aws s3 sync ./out "s3://$BUCKET_NAME" \
  --region "$REGION" \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --include "*.json"

# Invalidate CloudFront cache if distribution ID is set
if [ -n "$CLOUDFRONT_DIST_ID" ]; then
  echo "🔄 Invalidating CloudFront distribution: $CLOUDFRONT_DIST_ID"
  aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_DIST_ID" \
    --paths "/*"
fi

echo "✅ Deployment complete!"
echo "🌐 Site: https://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
