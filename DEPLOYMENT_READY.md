# Vercel Deployment & Testing Setup - Complete

## ✅ Current Status

### Running Servers
- **Frontend**: http://localhost:3000 (Vite dev server)
- **Backend**: http://localhost:8000 (Node.js with port changed from 5000)

### Environment Files Created
1. **frontend/.env.local** - Local development (uses http://localhost:8000/api)
2. **frontend/.env.production** - Production (uses /api for relative routing)
3. **backend/.env.example** - Template for backend variables

### Updated Configuration
- **vercel.json** - Now configured for monorepo with both backend and frontend
- **Root package.json** - npm workspaces setup complete

## 🚀 Deployment Checklist

### Before Deploying to Vercel:

1. **Backend Environment Variables** (Set in Vercel Dashboard)
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=8000
   NODE_ENV=production
   ```

2. **Test Endpoints Locally**
   - Health check: `curl http://localhost:8000/health`
   - Register: `curl -X POST http://localhost:8000/api/auth/register`
   - Login: `curl -X POST http://localhost:8000/api/auth/login`

3. **Push to GitHub**
   - Ensure `.env` is in `.gitignore`
   - Commit all files

4. **Connect to Vercel**
   - Link GitHub repository to Vercel
   - Add environment variables in Vercel Dashboard
   - Deploy

## 📦 Vercel Configuration

### Current Setup:
- **Backend**: Deployed as Serverless Node.js function
- **Frontend**: Built and deployed as static files
- **Routes**: API calls routed to backend, others to frontend SPA

### Potential Issues & Fixes:

| Issue | Fix |
|-------|-----|
| CORS errors | Ensure CORS middleware allows Vercel origin |
| 404 on routes | vercel.json fallback to index.html working |
| API not found | Check backend environment variables |
| Static files 404 | Frontend build output correct (frontend/dist) |

## 🔗 Quick Commands

```bash
# Start both locally
npm run dev:backend    # Terminal 1
npm run dev:frontend   # Terminal 2

# Build for production
npm run build

# Test health
curl http://localhost:8000/health
```

## 📝 Next Steps

1. Update `.env` in backend with real MongoDB URI and JWT secret
2. Test all API endpoints locally
3. Commit and push to GitHub
4. Connect repository to Vercel
5. Add environment variables to Vercel
6. Monitor deployment logs
