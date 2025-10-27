const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const app = express();

require('dotenv').config();

// Twilio credentials from environment
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

app.use(cors());
app.use(express.json());

app.post('/api/send-sms', async (req, res) => {
  const { to, message } = req.body;
  
  try {
    const sms = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: to
    });
    
    console.log(`✅ SMS sent to ${to}: ${sms.sid}`);
    res.json({ 
      success: true, 
      message: 'SMS sent successfully',
      sid: sms.sid,
      to: to 
    });
  } catch (error) {
    console.error('❌ SMS Error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.listen(3001, () => {
  console.log('SMS server running on http://localhost:3001');
});