import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import groupRoutes from './routes/groups.js';
import testRoutes from './routes/test.js';
import gameRoutes from './routes/games.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/test', testRoutes);
app.use('/auth', authRoutes);
app.use('/groups', groupRoutes);
app.use('/games', gameRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
