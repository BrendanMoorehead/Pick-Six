import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/auth.js';
import { makePick } from '../controllers/pickController.js';
//User completes a pick
//Data needed: user_id, team_id, week/week_id, game_id, completed
router.post('/make', authenticateUser, makePick);
//User removes a pick

//Get user picks

//Get group picks
export default router;
