import express, { Express } from "express";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as _playlistService from './playlist.service';
export const playlistRouter = express.Router();

playlistRouter.get('/', async (request: Request, response: Response) => {
    try {
        const playlist = await _playlistService.listPlaylist();
        return response.status(200).json(playlist);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});