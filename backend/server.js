import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reportRoutes from './routes/reportRoutes.js';
import sosRoutes from './routes/sosRoutes.js';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { sendDirectSMS } from './controllers/smsController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:3000', 'https://safetapsphere.netlify.app', 'https://*.netlify.app', 'https://*.up.railway.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', reportRoutes);
app.use('/api', sosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.post('/api/send-sms', sendDirectSMS);

app.get('/', (req, res) => {
  res.json({ message: 'SafeTap Sphere Backend API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});