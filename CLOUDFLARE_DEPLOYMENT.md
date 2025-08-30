# Cloudflare Workers Deployment Configuration

This document outlines the deployment settings and process for deploying this Next.js application to Cloudflare Workers using @opennextjs/cloudflare.

## Cloudflare Workers Configuration

### Prerequisites

1. **Wrangler CLI**: Install the Cloudflare Wrangler CLI
   ```bash
   npm install -g wrangler
   ```

2. **Authentication**: Login to your Cloudflare account
   ```bash
   wrangler login
   ```

### Build Configuration

The project uses `@opennextjs/cloudflare` to transform Next.js builds for Workers deployment.

**Framework:** Next.js with @opennextjs/cloudflare adapter
**Build command:** `npm run build:worker`
**Worker file:** `.open-next/worker.js`
**Assets directory:** `.open-next/assets`

### Configuration Files

#### wrangler.toml
The main configuration file for Workers deployment:
```toml
name = "drive-log-web"
compatibility_date = "2024-12-01" 
compatibility_flags = ["nodejs_compat"]
main = ".open-next/worker.js"

[build]
command = "npm run build:worker"

[assets]
directory = ".open-next/assets"
binding = "ASSETS"
```

#### open-next.config.ts
OpenNext configuration with R2 incremental cache support:
```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
	incrementalCache: r2IncrementalCache,
});
```

### Environment Variables

Environment variables can be set using Wrangler secrets:

```bash
# Set a secret
wrangler secret put MY_SECRET

# List secrets
wrangler secret list
```

For development, use `.env.local` file (not committed to git).

### Node.js Version

**Node.js version:** `18` or higher (recommended: `20+`)
**Runtime:** Node.js compatibility in Cloudflare Workers

## Available NPM Scripts

```json
{
  "build": "next build",
  "build:worker": "next build && npx @opennextjs/cloudflare build",
  "dev": "next dev",
  "dev:worker": "wrangler dev",
  "deploy": "npm run build:worker && wrangler deploy",
  "preview": "npm run build:worker && wrangler dev"
}
```

## Deployment Process

### Method 1: Direct Deployment

1. **Build the project:**
   ```bash
   npm run build:worker
   ```

2. **Deploy to Workers:**
   ```bash
   npm run deploy
   ```
   or
   ```bash
   wrangler deploy
   ```

### Method 2: CI/CD with GitHub Actions

1. **Set up GitHub secrets:**
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

2. **Create `.github/workflows/deploy.yml`:**
   ```yaml
   name: Deploy to Cloudflare Workers
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '20'
             cache: 'npm'
         - run: npm ci
         - run: npm run build:worker
         - uses: cloudflare/wrangler-action@v3
           with:
             apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
             accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
   ```

### Method 3: Development and Preview

1. **Local development:**
   ```bash
   npm run dev          # Next.js dev server
   npm run dev:worker   # Wrangler dev server (with hot reload)
   ```

2. **Preview build:**
   ```bash
   npm run preview      # Build and run with Wrangler dev
   ```

## Custom Domain

To use a custom domain with Workers:

1. **Add a custom domain in Cloudflare Dashboard:**
   - Go to Workers & Pages → Your Worker → Triggers
   - Click "Add Custom Domain"
   - Enter your domain name

2. **DNS Configuration:**
   - Ensure your domain is managed by Cloudflare
   - The DNS will be automatically configured

## Performance Optimizations

The deployment is optimized for Cloudflare Workers:

- **Node.js Runtime:** Full Node.js compatibility with better performance
- **Static Assets:** Served from Cloudflare's global edge network
- **Incremental Cache:** R2 storage for Next.js ISR support
- **Edge Computing:** Code runs at Cloudflare's edge locations worldwide

## Advanced Features

### KV Storage (Optional)
For caching or session management:

```toml
[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id"
preview_id = "your-preview-kv-namespace-id"
```

### Durable Objects (Optional)
For real-time features or stateful applications:

```toml
[[durable_objects.bindings]]
name = "MY_DURABLE_OBJECT"
class_name = "MyDurableObject"
```

### Scheduled Tasks (Optional)
For background jobs:

```toml
[triggers]
crons = ["0 0 * * *"]  # Daily at midnight
```

## Migration from Pages to Workers Benefits

- **More Features:** Access to KV, Durable Objects, Cron Triggers
- **Better Performance:** Node.js runtime instead of edge runtime limitations
- **Future-Proof:** Cloudflare's focus is on Workers platform
- **Same Pricing:** Similar cost structure to Pages
- **Enhanced APIs:** Full Node.js API support

## Troubleshooting

### Common Issues:

1. **Build fails:** 
   - Ensure Node.js version is 18+
   - Check that `@opennextjs/cloudflare` is installed
   - Verify `open-next.config.ts` exists

2. **Worker doesn't start:**
   - Check `wrangler.toml` configuration
   - Ensure `main = ".open-next/worker.js"`
   - Verify build completed successfully

3. **Assets not loading:**
   - Check assets binding in `wrangler.toml`
   - Ensure `.open-next/assets` directory exists

4. **Size limits:**
   - Workers have a 1MB compressed limit (10MB uncompressed)
   - Use code splitting to reduce bundle size

### Debug Commands:
```bash
# Check build output
ls -la .open-next/

# Test local build
npm run preview

# Check wrangler version
wrangler --version

# Validate configuration
wrangler config
```

### Support:
- **@opennextjs/cloudflare:** https://opennext.js.org/cloudflare
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/
- **Wrangler CLI:** https://developers.cloudflare.com/workers/wrangler/