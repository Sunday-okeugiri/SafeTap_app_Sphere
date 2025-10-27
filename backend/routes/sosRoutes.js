import express from 'express';
import { triggerSOS } from '../controllers/sosController.js';

const router = express.Router();

router.post('/sos', triggerSOS);

export default router;