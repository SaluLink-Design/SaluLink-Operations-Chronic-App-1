# Deployment Guide - SaluLink Chronic Treatment App

## Overview

This guide covers deploying the SaluLink Chronic Treatment App to various hosting platforms.

## Prerequisites

- Git repository (optional but recommended)
- Node.js 18+ installed locally
- Account on chosen hosting platform

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Steps

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   cd "/Users/tjmoipolai/Documents/SaluLink App Building/SaluLink Operations App/Chronic App 1"
   vercel
   ```

4. **Follow Prompts**
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: salulink-chronic-app
   - Directory: ./
   - Override settings: No

5. **Production Deployment**

   ```bash
   vercel --prod
   ```

#### Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Option 2: Netlify

1. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

2. **Login**

   ```bash
   netlify login
   ```

3. **Initialize**

   ```bash
   netlify init
   ```

4. **Deploy**

   ```bash
   netlify deploy --prod
   ```

#### Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Option 3: Docker

#### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

#### Build and Run

```bash
# Build image
docker build -t salulink-chronic-app .

# Run container
docker run -p 3000:3000 salulink-chronic-app

# Or use docker-compose
docker-compose up -d
```

### Option 4: AWS Amplify

1. **Install Amplify CLI**

   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Configure Amplify**

   ```bash
   amplify configure
   ```

3. **Initialize**

   ```bash
   amplify init
   ```

4. **Add Hosting**

   ```bash
   amplify add hosting
   ```

5. **Publish**

   ```bash
   amplify publish
   ```

### Option 5: Traditional VPS (Ubuntu)

#### Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

#### Application Setup

```bash
# Clone or upload application
cd /var/www
sudo mkdir salulink-chronic-app
sudo chown $USER:$USER salulink-chronic-app
cd salulink-chronic-app

# Upload files (use scp, rsync, or git)
# Then:
npm install
npm run build
```

#### PM2 Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'salulink-chronic-app',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/salulink-chronic-app',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

Start with PM2:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Nginx Configuration

Create `/etc/nginx/sites-available/salulink-chronic-app`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/salulink-chronic-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Variables

For production, create `.env.production`:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

## Build Optimization

### Next.js Configuration

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // For Docker
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
}

module.exports = nextConfig
```

### Performance Tips

1. **Enable Compression**
   - Gzip/Brotli in Nginx or hosting platform

2. **CDN Integration**
   - Use Vercel Edge Network or Cloudflare

3. **Image Optimization**
   - Next.js Image component handles this

4. **Caching Strategy**
   - Static assets: 1 year
   - API responses: As appropriate

## Monitoring

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking

Consider integrating:

- Sentry
- LogRocket
- Datadog

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] CORS configured
- [ ] Rate limiting (if applicable)
- [ ] Security headers set
- [ ] Dependencies updated
- [ ] Secrets not in code

## Post-Deployment

### Verify Deployment

1. Visit your deployed URL
2. Test the complete workflow
3. Check browser console for errors
4. Verify data loading
5. Test case save/load

### Performance Testing

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --view
```

### Monitoring Setup

1. Set up uptime monitoring
2. Configure error alerts
3. Monitor performance metrics
4. Track user analytics

## Rollback Plan

### Vercel

```bash
vercel rollback
```

### Docker

```bash
docker-compose down
docker-compose up -d --build
```

### PM2

```bash
pm2 restart salulink-chronic-app
```

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Backup Strategy

### Database (Future)

- Automated daily backups
- Point-in-time recovery
- Offsite storage

### Application

- Git repository
- Tagged releases
- Configuration backups

## Scaling Considerations

### Horizontal Scaling

- Multiple instances with load balancer
- Stateless application design
- Shared session storage

### Vertical Scaling

- Increase server resources
- Optimize bundle size
- Code splitting

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Runtime Errors

- Check environment variables
- Verify Node.js version
- Review error logs

### Performance Issues

- Enable production mode
- Check bundle size
- Optimize images

## Support

For deployment issues:

1. Check hosting platform docs
2. Review error logs
3. Test locally first
4. Contact SaluLink team

---

**Deployment Complete!** Your SaluLink Chronic Treatment App is now live 🚀
