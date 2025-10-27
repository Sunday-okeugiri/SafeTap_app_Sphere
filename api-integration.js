// API Integration for SafeTap - v2.0
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api'
  : 'https://safetap-app-sphere.onrender.com/api';

console.log('API_BASE loaded:', API_BASE);

// Test API connection
const testAPIConnection = async () => {
  try {
    const response = await fetch(API_BASE.replace('/api', ''));
    const data = await response.json();
    console.log('API Connection:', data);
    return true;
  } catch (error) {
    console.error('API Connection Failed:', error);
    return false;
  }
};

// Test connection on load
testAPIConnection();
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Auth functions
async function loginUser(email, password) {
  try {
    console.log('Attempting login to:', `${API_BASE}/auth/login`);
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    console.log('Login response:', response.status, data);
    
    if (!response.ok) {
      return { error: data.error || `HTTP ${response.status}: ${response.statusText}` };
    }
    
    if (data.success) {
      currentUser = data.user;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return { error: `Failed to fetch: ${error.message}` };
  }
}

async function registerUser(email, password, fullName, trustedContact) {
  try {
    console.log('Attempting registration to:', `${API_BASE}/auth/register`);
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password, fullName, trustedContact })
    });
    
    const data = await response.json();
    console.log('Registration response:', response.status, data);
    
    if (!response.ok) {
      return { error: data.error || `HTTP ${response.status}: ${response.statusText}` };
    }
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    return { error: `Failed to fetch: ${error.message}` };
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