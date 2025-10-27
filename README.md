# SafeTap Sphere - Complete Safety Application

## 🚀 Quick Start

### Option 1: Automated Setup
```bash
# Run the startup script
start.bat
```

### Option 2: Manual Setup

1. **Backend Setup**
```bash
cd backend
npm install
npm start
```

2. **Frontend Setup**
- Open `Safetap.html` in your browser
- Login with demo account: `demo@safetap.com` / `demo123`

## 🔧 Features Implemented

### ✅ Complete Backend
- **Supabase Database**: Users, reports, alerts tables
- **Authentication**: Login/register with Supabase Auth
- **RESTful API**: Reports, SOS alerts, SMS integration
- **AI Risk Analysis**: Location-based safety assessment
- **SMS Integration**: Twilio emergency alerts

### ✅ Frontend Integration
- **Real-time Data**: API integration with localStorage fallback
- **Interactive Maps**: Leaflet with AI risk overlays
- **SOS System**: Backend-integrated emergency alerts
- **Community Features**: Live report sharing
- **Mobile Optimized**: Responsive design

## 🛠 Technology Stack

- **Backend**: Node.js, Express, Supabase
- **Frontend**: HTML5, CSS3, JavaScript
- **Database**: PostgreSQL (Supabase)
- **Maps**: Leaflet.js
- **SMS**: Twilio API
- **Charts**: Chart.js

## 📱 Usage

1. **Login**: Use demo account or create new profile
2. **SOS**: Press SOS button to send emergency alerts
3. **Reports**: Submit anonymous incident reports
4. **Map**: View safety zones and incident markers with AI risk analysis
5. **Community**: See real-time community safety data

## 🔐 Environment Variables

Backend uses these environment variables (already configured):
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`

## 🎯 Key Improvements Made

1. **Authentication System**: Full Supabase Auth integration
2. **AI Risk Analysis**: Smart safety assessment based on location and historical data
3. **Real-time Backend**: API endpoints for all major features
4. **SMS Integration**: Emergency alerts to trusted contacts
5. **Database Integration**: Persistent data storage with Supabase
6. **API Fallbacks**: Graceful degradation to localStorage when offline

## 🚨 Demo Credentials
- **Email**: demo@safetap.com
- **Password**: demo123

---
*Built for FNB Hackathon by TUT Students*