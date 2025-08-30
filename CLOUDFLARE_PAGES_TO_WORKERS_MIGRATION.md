# Cloudflare Pages to Workers Migration - Deployment Configuration

## Important: Migration Steps for Cloudflare Dashboard

Since you have automated deployment enabled through Cloudflare, you need to **migrate your project from Pages to Workers**.

### ⚠️ Current Issue
Your project is still configured as a **Cloudflare Pages** project, but the code has been migrated to use **Cloudflare Workers**. This is why the build is failing.

### 🔄 Migration Options

#### Option 1: Create New Workers Project (Recommended)
1. **Create a new Workers project:**
   - Go to Cloudflare Dashboard → Workers & Pages
   - Click "Create" → "Create Worker"
   - Choose "Upload Worker" or "Connect to Git"
   
2. **Connect your repository:**
   - Select your GitHub repository
   - Branch: `main`
   - Build command: `npm run build:worker`
   - Root directory: `/` (or leave empty)

3. **Environment Variables:**
   - No special environment variables needed for basic setup
   - Set `NODE_VERSION` to `20` if needed

4. **Deploy:**
   - The new Workers project will use `wrangler.toml` configuration
   - Automatic deployments will work correctly

#### Option 2: Convert Existing Pages Project (Alternative)
Unfortunately, Cloudflare doesn't provide a direct migration path from Pages to Workers. You'll need to create a new Workers project.

### 📋 New Build Configuration for Workers

When setting up the new Workers project:

**Build Settings:**
- **Framework preset:** None (custom)
- **Build command:** `npm run build:worker`
- **Root directory:** `/` (leave empty)
- **Node.js version:** `20.x`

**Environment Variables:**
- Set any custom environment variables you were using in Pages
- Use `wrangler secret put <KEY>` for sensitive values

### 🚀 Benefits After Migration

1. **Better Performance:** Node.js runtime instead of edge runtime
2. **More Features:** Access to KV, Durable Objects, Cron Triggers
3. **Future-Proof:** Cloudflare's strategic focus is on Workers
4. **Enhanced APIs:** Full Node.js API compatibility

### 🔧 Verification Steps

After setting up the new Workers project:

1. **Verify Build:** Check that the build completes successfully
2. **Test Routes:** Ensure all pages load correctly
   - `/` (Homepage)
   - `/privacy` (Privacy Policy)
   - `/terms` (Terms of Service)
3. **Test Features:**
   - Theme switching (light/dark)
   - Language toggle (Japanese/English)
   - Mobile responsiveness

### 📞 Next Steps

1. **Create the new Workers project** using Option 1 above
2. **Update your DNS** if using a custom domain
3. **Delete the old Pages project** once everything is working
4. **Monitor the first few deployments** to ensure stability

### 🆘 If You Need Help

If you encounter issues during the migration:

1. **Check build logs** in the new Workers dashboard
2. **Verify wrangler.toml** configuration is correct
3. **Test locally** using `npm run preview`
4. **Review documentation:**
   - [Cloudflare Workers](https://developers.cloudflare.com/workers/)
   - [OpenNext Cloudflare](https://opennext.js.org/cloudflare)

---

**Status:** ✅ Code migration complete - Dashboard migration required