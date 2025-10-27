import { supabase } from '../config/supabaseClient.js';

export const analyzeRisk = async (req, res) => {
  const { lat, lon, time = new Date().getHours() } = req.body;
  
  try {
    // Get recent reports in area (1km radius)
    const { data: reports } = await supabase
      .from('reports')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
    
    // Simple risk calculation
    const nearbyReports = reports?.filter(r => {
      const distance = Math.sqrt(
        Math.pow(r.latitude - lat, 2) + Math.pow(r.longitude - lon, 2)
      ) * 111; // Rough km conversion
      return distance < 1;
    }) || [];
    
    const riskFactors = {
      recentIncidents: nearbyReports.length,
      timeOfDay: time < 6 || time > 22 ? 'high' : time < 18 ? 'low' : 'medium',
      violentCrimes: nearbyReports.filter(r => r.type === 'violence').length
    };
    
    let riskLevel = 'low';
    let riskScore = 0;
    
    // Calculate risk
    riskScore += nearbyReports.length * 10;
    riskScore += riskFactors.timeOfDay === 'high' ? 30 : riskFactors.timeOfDay === 'medium' ? 15 : 0;
    riskScore += riskFactors.violentCrimes * 20;
    
    if (riskScore > 50) riskLevel = 'high';
    else if (riskScore > 25) riskLevel = 'medium';
    
    const recommendations = [];
    if (riskLevel === 'high') {
      recommendations.push('Avoid this area if possible');
      recommendations.push('Travel in groups');
      recommendations.push('Stay in well-lit areas');
    } else if (riskLevel === 'medium') {
      recommendations.push('Stay alert');
      recommendations.push('Keep emergency contacts ready');
    }
    
    res.json({
      riskLevel,
      riskScore,
      riskFactors,
      recommendations,
      nearbyIncidents: nearbyReports.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};