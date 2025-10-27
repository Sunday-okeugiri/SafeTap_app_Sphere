// API Integration for SafeTap
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api'
  : 'https://safetap-sphere-app-production.up.railway.app/api';
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Auth functions
async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
      currentUser = data.user;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function registerUser(email, password, fullName, trustedContact) {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName, trustedContact })
    });
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

// Report functions
async function saveReportToAPI(report) {
  try {
    const response = await fetch(`${API_BASE}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    const reports = JSON.parse(localStorage.getItem('safetap_reports_v1') || '[]');
    reports.push(report);
    localStorage.setItem('safetap_reports_v1', JSON.stringify(reports));
    return report;
  }
}

async function loadReportsFromAPI() {
  try {
    const response = await fetch(`${API_BASE}/reports`);
    return await response.json();
  } catch (error) {
    return JSON.parse(localStorage.getItem('safetap_reports_v1') || '[]');
  }
}

// AI Risk Analysis
async function analyzeRisk(lat, lon) {
  try {
    const response = await fetch(`${API_BASE}/ai/analyze-risk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon })
    });
    return await response.json();
  } catch (error) {
    return { riskLevel: 'unknown', recommendations: ['Stay alert'] };
  }
}

// SOS Alert
async function triggerSOSAlert(lat, lon, message) {
  try {
    if (!currentUser) throw new Error('User not logged in');
    const response = await fetch(`${API_BASE}/sos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: currentUser.id, lat, lon, message })
    });
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

// SMS function
async function sendSMS(phoneNumber, message) {
  try {
    const response = await fetch(`${API_BASE}/send-sms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: phoneNumber, message })
    });
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

// Export functions
window.loginUser = loginUser;
window.registerUser = registerUser;
window.saveReportToAPI = saveReportToAPI;
window.loadReportsFromAPI = loadReportsFromAPI;
window.analyzeRisk = analyzeRisk;
window.triggerSOSAlert = triggerSOSAlert;
window.sendSMS = sendSMS;