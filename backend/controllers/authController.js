import { supabase } from '../config/supabaseClient.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    res.json({ 
      success: true, 
      user: data.user,
      session: data.session 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  const { email, password, fullName, trustedContact } = req.body;
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          trusted_contact: trustedContact
        }
      }
    });
    
    if (error) throw error;
    
    // Try to create user profile, but don't fail if table doesn't exist
    if (data.user) {
      try {
        await supabase.from('users').insert([{
          id: data.user.id,
          full_name: fullName,
          trusted_contact: trustedContact
        }]);
      } catch (dbError) {
        console.log('User profile creation failed, but auth succeeded:', dbError.message);
      }
    }
    
    res.json({ success: true, user: data.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};