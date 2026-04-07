# Deployment Guide — Rahul Singh Portfolio

This document covers version control setup, environment configuration, and deployment to AWS.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Version Control — Git Setup](#version-control--git-setup)
3. [Environment Variables](#environment-variables)
4. [Local Development](#local-development)
5. [AWS Deployment — Option A: AWS Amplify (Recommended)](#aws-deployment--option-a-aws-amplify-recommended)
6. [AWS Deployment — Option B: EC2 + Nginx + PM2](#aws-deployment--option-b-ec2--nginx--pm2)
7. [AWS Deployment — Option C: S3 + CloudFront (Static Export)](#aws-deployment--option-c-s3--cloudfront-static-export)
8. [CI/CD Pipeline — GitHub Actions](#cicd-pipeline--github-actions)
9. [Domain & SSL](#domain--ssl)
10. [Monitoring & Rollback](#monitoring--rollback)

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 18.x or 20.x | https://nodejs.org |
| npm | 9.x+ | Bundled with Node |
| Git | 2.x+ | https://git-scm.com |
| AWS CLI | 2.x | https://aws.amazon.com/cli |
| AWS Account | — | https://aws.amazon.com |

---

## Version Control — Git Setup

### Initialize repository

```bash
git init
git add .
git commit -m "feat: initial portfolio website"
```

### Connect to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Branching strategy

```
main          ← production (auto-deploys to AWS)
develop       ← staging / integration
feature/*     ← new features
fix/*         ← bug fixes
```

```bash
# Create and switch to develop branch
git checkout -b develop
git push -u origin develop

# Start a new feature
git checkout -b feature/add-blog-section
# ... make changes ...
git add .
git commit -m "feat: add blog section"
git push origin feature/add-blog-section
# Open Pull Request → develop → main
```

### Commit message convention (Conventional Commits)

```
feat:     new feature
fix:      bug fix
docs:     documentation only
style:    formatting, no logic change
refactor: code restructure
test:     adding tests
chore:    build process, dependencies
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

**Never commit `.env.local` to Git.** It is already in `.gitignore`.

For AWS deployments, set environment variables in:
- **Amplify**: Console → App settings → Environment variables
- **EC2**: `/etc/environment` or via AWS Systems Manager Parameter Store
- **GitHub Actions**: Repository → Settings → Secrets and variables → Actions

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build

# Start production server locally
npm start
```

---

## AWS Deployment — Option A: AWS Amplify (Recommended)

AWS Amplify is the simplest path — it handles build, deploy, SSL, and CDN automatically.

### Step 1: Push code to GitHub

```bash
git push origin main
```

### Step 2: Create Amplify app

```bash
# Using AWS CLI
aws amplify create-app \
  --name "rahul-singh-portfolio" \
  --repository "https://github.com/YOUR_USERNAME/portfolio" \
  --platform WEB_COMPUTE \
  --region ap-south-1
```

Or via Console: AWS Console → Amplify → New app → Host web app → GitHub → select repo.

### Step 3: Configure build settings

Amplify auto-detects Next.js. Verify `amplify.yml` at root:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Step 4: Set environment variables in Amplify Console

Go to App settings → Environment variables → Add:
- `NEXT_PUBLIC_SITE_URL` = `https://rahulsingh.dev`
- `RESEND_API_KEY` = your key

### Step 5: Connect custom domain

Amplify Console → Domain management → Add domain → follow DNS instructions.

**Cost estimate**: ~$0–5/month for low traffic (Amplify free tier: 1000 build minutes/month, 15 GB served/month).

---

## AWS Deployment — Option B: EC2 + Nginx + PM2

Use this for full server control or if you need custom server-side logic.

### Step 1: Launch EC2 instance

```bash
# Using AWS CLI — t3.small is sufficient for a portfolio
aws ec2 run-instances \
  --image-id ami-0f58b397bc5c1f2e8 \
  --instance-type t3.small \
  --key-name your-key-pair \
  --security-group-ids sg-xxxxxxxxxx \
  --subnet-id subnet-xxxxxxxxxx \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=portfolio-server}]' \
  --region ap-south-1
```

Security group rules needed:
- Port 22 (SSH) — your IP only
- Port 80 (HTTP) — 0.0.0.0/0
- Port 443 (HTTPS) — 0.0.0.0/0

### Step 2: SSH into instance and install dependencies

```bash
ssh -i your-key.pem ec2-user@YOUR_EC2_IP

# Update system
sudo yum update -y   # Amazon Linux
# OR
sudo apt update && sudo apt upgrade -y   # Ubuntu

# Install Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo yum install -y nginx   # Amazon Linux
# OR
sudo apt install -y nginx   # Ubuntu
```

### Step 3: Deploy application

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/portfolio.git /var/www/portfolio
cd /var/www/portfolio

# Install dependencies and build
npm ci
npm run build

# Start with PM2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup   # follow the printed command to enable auto-start
```

### Step 4: Configure Nginx

```bash
sudo nano /etc/nginx/conf.d/portfolio.conf
```

Paste:

```nginx
server {
    listen 80;
    server_name rahulsingh.dev www.rahulsingh.dev;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Step 5: SSL with Certbot

```bash
sudo yum install -y certbot python3-certbot-nginx
sudo certbot --nginx -d rahulsingh.dev -d www.rahulsingh.dev
# Auto-renewal is set up automatically
```

---

## AWS Deployment — Option C: S3 + CloudFront (Static Export)

Use this for maximum performance and minimum cost if you don't need server-side features (API routes).

> **Note**: This disables the `/api/contact` route. You'd need a separate Lambda or third-party form service (Formspree, EmailJS).

### Step 1: Enable static export in `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
module.exports = nextConfig;
```

### Step 2: Build and export

```bash
npm run build
# Output is in /out directory
```

### Step 3: Create S3 bucket and deploy

```bash
# Create bucket
aws s3 mb s3://rahulsingh-portfolio --region ap-south-1

# Enable static website hosting
aws s3 website s3://rahulsingh-portfolio \
  --index-document index.html \
  --error-document 404.html

# Upload build output
aws s3 sync ./out s3://rahulsingh-portfolio \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html"

aws s3 sync ./out s3://rahulsingh-portfolio \
  --delete \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html"
```

### Step 4: Create CloudFront distribution

```bash
aws cloudfront create-distribution \
  --distribution-config file://scripts/cloudfront-config.json
```

**Cost estimate**: ~$0.50–2/month for a portfolio site.

---

## CI/CD Pipeline — GitHub Actions

See `.github/workflows/deploy.yml` — it runs on every push to `main`:
1. Runs tests
2. Builds the app
3. Deploys to AWS Amplify (or S3 depending on strategy)

---

## Domain & SSL

### Route 53 (recommended with AWS)

```bash
# Create hosted zone
aws route53 create-hosted-zone \
  --name rahulsingh.dev \
  --caller-reference $(date +%s)

# Note the nameservers from output and update at your domain registrar
```

### Point domain to Amplify / CloudFront

Follow the CNAME/A record instructions in the Amplify Console or CloudFront distribution settings.

---

## Monitoring & Rollback

### View PM2 logs (EC2)

```bash
pm2 logs portfolio
pm2 monit
```

### Rollback on EC2

```bash
cd /var/www/portfolio
git log --oneline -10          # find the commit to roll back to
git checkout <commit-hash>
npm ci && npm run build
pm2 restart portfolio
```

### Rollback on Amplify

Amplify Console → App → Deployments → click any previous deployment → Redeploy.

### CloudWatch alarms (optional)

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name "portfolio-5xx-errors" \
  --metric-name "5XXError" \
  --namespace "AWS/CloudFront" \
  --statistic Sum \
  --period 300 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1 \
  --alarm-actions arn:aws:sns:ap-south-1:ACCOUNT_ID:alerts
```

> **Note**: Make shell scripts executable before use: `chmod +x scripts/*.sh`
