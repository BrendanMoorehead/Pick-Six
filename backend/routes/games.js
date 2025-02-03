// For handling game related API calls
import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/auth.js';
import { getGames } from '../controllers/gameController.js';

router.get('/get', authenticateUser, getGames);

export default router;
