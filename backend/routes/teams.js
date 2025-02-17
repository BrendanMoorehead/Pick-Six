// For handling game related API calls
import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/auth.js';
import { getTeams } from '../controllers/teamController.js';
router.get('/get_teams', authenticateUser, getTeams);

export default router;
