import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";

import { userRouter } from './user/user.router';
import { songRouter } from './song/song.router';
import { playlistRouter } from './playlist/playlist.router';


// Settings
dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10);
const app: Express = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

// Home Page
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server 👌');
});

// Users Module
app.use('/api/v1/users', userRouter);

// Song Module
app.use('/api/v1/songs', songRouter);

// Playlist Module
app.use('/api/v1/playlist', playlistRouter);