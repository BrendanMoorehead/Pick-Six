import express from 'express';
const router = express.Router();
import { registerUser } from '../controllers/authController.js';

router.post('/register', registerUser);
// router.get('/register', registerUser);
export default router;
