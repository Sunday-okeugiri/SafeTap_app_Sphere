import { sendSMS } from '../utils/sendSMS.js';

export const sendDirectSMS = async (req, res) => {
  const { to, message } = req.body;
  
  try {
    if (!to || !message) {
      return res.status(400).json({ error: 'Phone number and message are required' });
    }
    
    console.log('Sending SMS to:', to);
    const result = await sendSMS(to, message);
    
    res.json({ 
      success: true, 
      message: 'SMS sent successfully',
      sid: result.sid 
    });
  } catch (error) {
    console.error('SMS Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to send SMS' 
    });
  }
};