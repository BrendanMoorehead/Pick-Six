import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import groupRoutes from './routes/groups.js';
import testRoutes from './routes/test.js';
import gameRoutes from './routes/games.js';
import pickRoutes from './routes/picks.js';
import teamRoutes from './routes/teams.js';
import timeframeRoutes from './routes/timeframes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/test', testRoutes);
app.use('/auth', authRoutes);
app.use('/groups', groupRoutes);
app.use('/games', gameRoutes);
app.use('/picks', pickRoutes);
app.use('/teams', teamRoutes);
app.use('/timeframes', timeframeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
