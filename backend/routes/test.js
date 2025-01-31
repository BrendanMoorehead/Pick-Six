import express from 'express';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/protected', authenticateUser, (req, res) => {
  res.json({
    message: 'Middleware works! User is authenticated.',
    user: req.user,
  });
});
export default router;
