import { supabase } from '../config/supabaseClient.js';

export const createReport = async (req, res) => {
  try {
    const { type, description, anonymous, lat, lon } = req.body;
    
    const { data, error } = await supabase
      .from('reports')
      .insert([{ 
        type, 
        description, 
        anonymous, 
        latitude: lat, 
        longitude: lon 
      }])
      .select();
      
    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ error: error.message });
    }
    
    res.json(data[0]);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('timestamp', { ascending: false });
      
    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ error: error.message });
    }
    
    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message });
  }
};