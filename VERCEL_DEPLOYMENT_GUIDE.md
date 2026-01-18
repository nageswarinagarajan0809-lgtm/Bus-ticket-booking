# Vercel Deployment Guide - Complete Setup

## 🚀 Vercel Build Commands

### Automatic Build (from vercel.json)
```
Root Build Command:
npm install -g npm@latest && npm install --workspaces

Frontend Build:
npm run build --workspace=frontend

Backend Start:
node backend/server.js
```

### Manual Build Commands (if needed)
```bash
# Build everything
npm run build

# Build only frontend
npm run build:frontend

# Build only backend
npm run build:backend

# Start backend
npm run start
```

---

## 📋 Vercel Environment Variables Required

Add these in **Vercel Dashboard → Settings → Environment Variables**:

### Backend Variables (REQUIRED)
```
PORT=8000
NODE_ENV=production
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret_key_here_minimum_32_chars
```

### Frontend Variables (OPTIONAL - if needed)
```
VITE_API_URL=/api
```

---

## 🔧 Step-by-Step Deployment

### 1. Prepare Your GitHub Repository
```bash
# Verify code is pushed
git status
git log --oneline -5
```

### 2. Connect to Vercel
- Go to https://vercel.com
- Click **"Add New"** → **"Project"**
- Select **"Import Git Repository"**
- Choose **"Bus-ticket-booking"** repo
- Click **Import**

### 3. Configure Build Settings
Vercel will auto-detect from `vercel.json`:
- **Build Command**: `npm install -g npm@latest && npm install --workspaces`
- **Output Directory**: Auto-configured
- **Install Command**: Leave default

### 4. Add Environment Variables
**In Vercel Dashboard:**
1. Go to **Settings → Environment Variables**
2. Add each variable:

| Key | Value | Applies To |
|-----|-------|-----------|
| `MONGO_URI` | Your MongoDB connection string | Production |
| `JWT_SECRET` | Your secret key | Production |
| `PORT` | 8000 | Production |
| `NODE_ENV` | production | Production |

### 5. Deploy
- Click **Deploy**
- Wait for build to complete (usually 2-3 minutes)

---

## 🔗 Vercel Configuration (vercel.json)

Your current configuration handles:

```json
{
  "version": 2,
  "buildCommand": "npm install -g npm@latest && npm install --workspaces",
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node",
      "config": {
        "maxLambdaSize": "50mb",
        "runtime": "nodejs18.x"
      }
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "buildCommand": "npm run build --workspace=frontend",
        "outputDirectory": "frontend/dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/dist/index.html"
    }
  ]
}
```

---

## 🎯 API Routing After Deployment

### Frontend → Backend Communication
- **Local Dev**: `http://localhost:8000/api`
- **Production**: `/api` (same domain)

Update in `frontend/.env.production`:
```
VITE_API_URL=/api
```

---

## ✅ Testing After Deployment

### 1. Test Frontend
```
https://your-app.vercel.app/
```

### 2. Test Backend Health
```
https://your-app.vercel.app/health
```

### 3. Test API
```bash
# Register
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test"}'

# Login
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get Buses
curl https://your-app.vercel.app/api/buses
```

---

## 🐛 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| 502 Bad Gateway | Backend environment variables missing | Add MONGO_URI, JWT_SECRET |
| 404 on routes | Frontend build failed | Check build logs in Vercel |
| CORS errors | API domain not allowed | Update CORS in backend/middleware/auth.js |
| API not found | Routes not configured | Verify vercel.json "routes" section |
| Timeout errors | Database connection slow | Check MONGO_URI is correct |

---

## 📊 Monitoring & Logs

### View Deployment Logs
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Deployments"**
4. Click latest deployment
5. View **"Build Logs"** or **"Runtime Logs"**

### Check Function Logs
```bash
vercel logs <deployment-url>
```

---

## 🔄 Redeployment

### Automatic (on Git Push)
```bash
git commit -m "your message"
git push origin main
# Vercel auto-deploys
```

### Manual
```bash
npm i -g vercel
vercel
```

---

## 📦 Production Checklist

- [ ] MongoDB URI configured in Vercel
- [ ] JWT_SECRET set to strong value
- [ ] CORS middleware allows Vercel domain
- [ ] Frontend .env.production has VITE_API_URL=/api
- [ ] vercel.json is in root directory
- [ ] Node modules are not in .gitignore issues
- [ ] All commits pushed to GitHub
- [ ] Vercel project connected to GitHub repo
- [ ] All environment variables added in Vercel
- [ ] Initial deployment successful

---

## 🚨 Emergency Rollback

If deployment has issues:

1. Go to Vercel Dashboard
2. Click **"Deployments"**
3. Find stable previous deployment
4. Click **"Promote to Production"**

---

## 📞 Support Resources

- Vercel Docs: https://vercel.com/docs
- Node.js Runtime: https://vercel.com/docs/concepts/functions/serverless-functions
- Static Export: https://vercel.com/docs/build-output-api/v3/static-files
