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


// Get songs by id
songRouter.get('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const song = await _songService.getUser(id);
        if (song) {
            return response.status(200).json(song);
        }
        return response.status(404).json('Song could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});



// POST: Create user
// Params: email, name,password, date_born,
songRouter.post('/', body('name').isString(), body('artist').isString(),
    body('album').isString(), body('year').isNumeric(), body('genre').isString(),
    body('duration').isNumeric(), body('isPublic').isBoolean(), async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        try {
            const song = request.body
            const newSong = await _songService.createSong(song);
            return response.status(201).json(newSong);
        } catch (error: any) {
            return response.status(400).json(error.message)
        }
    })


// PUT: Update User
songRouter.put('/:id', body('name').isString(), body('artist').isString(),
    body('album').isString(), body('year').isNumeric(), body('genre').isString(),
    body('duration').isNumeric(), body('isPublic').isBoolean(), async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        const id: number = parseInt(request.params.id, 10);
        try {
            const song = request.body
            const updateSong = await _songService.updateSong(song, id);
            return response.status(200).json(updateSong);
        } catch (error: any) {
            return response.status(400).json(error.message)
        }
    })

// Delete song
songRouter.delete('/:id',async (request:Request, response:Response) => {
    const id:number = parseInt(request.params.id, 10);
    try {
        await _songService.deleteSong(id);
        return response.status(204).json("Song has been successfully deleted");
    } catch (error:any) {
        return response.status(500).json(error.message);
    } 
});