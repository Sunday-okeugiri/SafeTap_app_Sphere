import express from 'express';
import { createReport, getReports } from '../controllers/reportController.js';

const router = express.Router();

router.post('/report', createReport);
router.get('/reports', getReports);

export default router;