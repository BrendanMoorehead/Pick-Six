// For handling game related API calls
import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/auth.js';
import { getTimeframes } from '../controllers/timeframesController.js';
router.get('/get_timeframes', authenticateUser, getTimeframes);

export default router;
