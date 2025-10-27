import { supabase } from '../config/supabaseClient.js';
import { sendSOS } from '../utils/sendSMS.js';

export const triggerSOS = async (req, res) => {
  const { user_id, lat, lon, message = 'Emergency alert!' } = req.body;
  
  try {
    // Get user's trusted contact
    const { data: user } = await supabase
      .from('users')
      .select('trusted_contact, full_name')
      .eq('id', user_id)
      .single();
    
    if (user?.trusted_contact) {
      // Get city name from coordinates
      let cityName = 'Unknown Location';
      try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const data = await response.json();
        cityName = data.city || data.locality || data.principalSubdivision || 'Unknown Location';
      } catch (e) {
        console.log('Geocoding failed, using default');
      }
      
      const smsMessage = `🚨 SafeTap Emergency Alert 🚨\nUser: ${user.full_name || 'Unknown'}\nCity: ${cityName}\nGoogle Maps: https://maps.google.com/?q=${lat},${lon}\nTime: ${new Date().toLocaleString()}\nMessage: ${message}`;
      await sendSOS(user.trusted_contact, smsMessage);
    }
    
    // Log alert
    const { data, error } = await supabase
      .from('alerts')
      .insert([{ user_id, lat, lon, message, status: 'sent' }])
      .select();
      
    if (error) throw error;
    res.json({ success: true, alert: data[0] });
  } catch (error) {
    console.error('SOS Error:', error);
    res.status(500).json({ error: error.message });
  }
};