import express, { Express } from "express";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as _songService from './song.service';
export const songRouter = express.Router();

songRouter.get('/', async (request: Request, response: Response) => {
    try {
        const songs = await _songService.listSongs();
        return response.status(200).json(songs);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});