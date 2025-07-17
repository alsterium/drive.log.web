# Cloudflare Pages Deployment Configuration

This document outlines the deployment settings required for deploying this Next.js application to Cloudflare Pages.

## Cloudflare Pages Dashboard Settings

### Build Configuration

**Framework preset:** `Next.js (Static HTML Export)`

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
out
```

**Root directory (monorepo):**
```
(leave empty - deploy from root)
```

### Environment Variables

No environment variables are required for this static deployment. If you need to add environment variables in the future:

1. Go to your Cloudflare Pages project dashboard
2. Navigate to Settings > Environment variables
3. Add variables for Production and/or Preview environments

### Node.js Version

**Node.js version:** `18` or higher (recommended: `18.17.0`)

This can be set by adding a `.nvmrc` file to your project root or by setting the `NODE_VERSION` environment variable in Cloudflare Pages.

### Build Settings Summary

| Setting | Value |
|---------|-------|
| Framework | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | 18+ |
| Install command | `npm ci` (automatic) |

## Deployment Files

The following files have been created to support Cloudflare Pages deployment:

### `public/_headers`
- Configures security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Sets appropriate cache headers for static assets
- Optimizes caching for Next.js static files

### `public/_redirects`
- Handles client-side routing for the single-page application
- Redirects all routes to `index.html` to support direct navigation
- Ensures proper SPA behavior on Cloudflare Pages

## Deployment Process

1. **Connect Repository:**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect your Git repository (GitHub, GitLab, etc.)

2. **Configure Build Settings:**
   - Use the settings documented above
   - Framework preset: Next.js (Static HTML Export)
   - Build command: `npm run build`
   - Build output directory: `out`

3. **Deploy:**
   - Click "Save and Deploy"
   - Cloudflare will automatically build and deploy your application
   - Subsequent pushes to the main branch will trigger automatic deployments

## Custom Domain (Optional)

To use a custom domain:

1. Go to your Cloudflare Pages project
2. Navigate to "Custom domains"
3. Add your domain
4. Update your domain's DNS settings to point to Cloudflare

## Performance Optimizations

The deployment is optimized for Cloudflare's global CDN:

- Static assets are cached for optimal performance
- Security headers are configured for protection
- Client-side routing is properly handled
- Build output is optimized for edge delivery

## Troubleshooting

### Common Issues:

1. **Build fails:** Ensure Node.js version is 18+
2. **Routes not working:** Verify `_redirects` file is in the `public` directory
3. **Assets not loading:** Check that build output directory is set to `out`
4. **Security warnings:** Verify `_headers` file is properly configured

### Build Logs:
Check the build logs in Cloudflare Pages dashboard for detailed error information.

### Support:
- Cloudflare Pages documentation: https://developers.cloudflare.com/pages/
- Next.js static export documentation: https://nextjs.org/docs/app/building-your-application/deploying/static-exports