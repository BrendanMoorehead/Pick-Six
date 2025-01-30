import express from 'express';
const router = express.Router();
import { registerUser, signInUser } from '../controllers/authController.js';

router.post('/register', registerUser);
router.post('/signin', signInUser);
// router.get('/register', registerUser);
export default router;
