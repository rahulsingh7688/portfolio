#!/usr/bin/env bash
set -euo pipefail

# ─── Config ───────────────────────────────────────────────────────────────────
EC2_HOST="${EC2_HOST:-}"
EC2_USER="${EC2_USER:-ec2-user}"
EC2_KEY="${EC2_KEY_PATH:-~/.ssh/portfolio-key.pem}"
APP_DIR="/var/www/portfolio"
PM2_APP_NAME="portfolio"

if [ -z "$EC2_HOST" ]; then
  echo "❌ EC2_HOST environment variable is required"
  exit 1
fi

echo "🚀 Deploying to EC2: $EC2_USER@$EC2_HOST"

ssh -i "$EC2_KEY" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" << 'ENDSSH'
  set -euo pipefail
  cd /var/www/portfolio

  echo "📥 Pulling latest code..."
  git pull origin main

  echo "📦 Installing dependencies..."
  npm ci --production=false

  echo "🔨 Building application..."
  npm run build

  echo "♻️  Restarting PM2 process..."
  pm2 restart portfolio || pm2 start npm --name "portfolio" -- start
  pm2 save

  echo "✅ Deployment complete on EC2!"
ENDSSH

echo "🌐 Site should be live at https://rahulsingh.dev"
