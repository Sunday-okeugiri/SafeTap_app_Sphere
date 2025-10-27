# SafeTap Sphere Deployment Guide

## 🚀 Deploy Backend (Railway)

1. **Sign up**: https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. **Connect** your GitHub repository
4. **Select** `backend` folder as root directory
5. **Add Environment Variables**:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_key
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   PORT=3001
   ```
6. **Deploy** - Railway will auto-deploy
7. **Copy** your Railway URL (e.g., `https://safetap-backend.up.railway.app`)

## 🌐 Deploy Frontend (Netlify)

1. **Sign up**: https://netlify.com
2. **New site from Git** → **GitHub**
3. **Select** your SafeTap repository
4. **Build settings**:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
5. **Deploy site**
6. **Update site name** to `safetap-sphere` (optional)

## 🔧 Update API URLs

After Railway deployment, update `api-integration.js`:
```javascript
const API_BASE = 'https://YOUR-RAILWAY-URL.up.railway.app/api';
```

## ✅ Test Deployment

1. **Frontend**: Visit your Netlify URL
2. **Backend**: Test `https://your-railway-url.up.railway.app`
3. **Login**: Use `demo@safetap.com` / `demo123`
4. **SOS**: Test emergency alerts

## 🔗 Final URLs

- **Frontend**: `https://safetap-sphere.netlify.app`
- **Backend**: `https://safetap-backend.up.railway.app`
- **Database**: Supabase (already configured)

Your SafeTap Sphere app is now live! 🎉