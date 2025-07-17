# Cloudflare Pages Local Testing Guide

This document explains how to test your Next.js application locally using Wrangler to simulate the Cloudflare Pages environment.

## Available Scripts

### `npm run preview:cloudflare`
Starts a local Cloudflare Pages development server on port 8788.
```bash
npm run preview:cloudflare
```

### `npm run test:cloudflare`
Builds the application and then starts the local Cloudflare Pages server.
```bash
npm run test:cloudflare
```

### `npm run test:cloudflare-local`
Runs comprehensive automated tests to verify the Cloudflare Pages setup.
```bash
npm run test:cloudflare-local
```

## Manual Testing Steps

1. **Build the application** (if not already built):
   ```bash
   npm run build:cloudflare
   ```

2. **Start the local Cloudflare Pages server**:
   ```bash
   npm run preview:cloudflare
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:8788
   ```

4. **Test the following**:
   - ✅ Main page loads correctly
   - ✅ All static assets (CSS, JS, images) load properly
   - ✅ Navigation and interactions work as expected
   - ✅ Application behaves the same as in production

## What Gets Tested

The local Cloudflare environment tests:

- **Static File Serving**: Ensures all HTML, CSS, JS, and image files are served correctly
- **HTTP Headers**: Validates security and caching headers are applied
- **Asset Optimization**: Confirms that static assets are properly optimized and cached
- **Routing**: Tests that the application routing works in the Cloudflare environment

## Configuration Files

The following files configure the Cloudflare Pages behavior:

### `out/_headers`
Defines HTTP headers for security and caching:
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Cache-Control headers for static assets

### `out/_redirects`
Handles client-side routing for the single-page application:
- Redirects 404 errors to the main index.html for SPA behavior

## Troubleshooting

### Server Won't Start
- Ensure port 8788 is not in use by another application
- Check that the `out` directory exists (run `npm run build:cloudflare` first)

### Assets Not Loading
- Verify the build completed successfully
- Check that all files exist in the `out` directory
- Ensure the Next.js configuration is set for static export

### Wrangler Version Warning
If you see a warning about Wrangler being out of date:
```bash
npm install --save-dev wrangler@4
```

## Production Deployment

Once local testing is successful, you can deploy to Cloudflare Pages with these settings:

- **Build command**: `npm run build:cloudflare`
- **Build output directory**: `out`
- **Node.js version**: 18 or higher

The local testing environment closely mirrors the production Cloudflare Pages environment, so successful local tests indicate the application will work correctly when deployed.