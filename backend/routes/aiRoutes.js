import express from 'express';
import { analyzeRisk } from '../controllers/aiController.js';

const router = express.Router();

router.post('/analyze-risk', analyzeRisk);

export default router;