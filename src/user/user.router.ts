import express from "express";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { db } from "../utils/db.server";
import * as _userService from './user.service';
export const userRouter = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


// Get: Lista de usuarios
userRouter.get('/', async (request: Request, response: Response) => {
    try {
        const users = await _userService.listUsers();
        return response.status(200).json(users);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});


// Get user by id
userRouter.get('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const user = await _userService.getUser(id);
        if (user) {
            return response.status(200).json(user);
        }
        return response.status(404).json('User could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});


// POST: Create user
// Params: email, name,password, date_born,
userRouter.post('/', body('email').isString(), body('name').isString(), body('password').isString(), body('date_born').isDate(), async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        const users = request.body
        const newUser = await _userService.createUser(users);
        return response.status(201).json(newUser);
    } catch (error: any) {
        return response.status(400).json(error.message)
    }
})


// PUT: Update User
// Params: email, name,password, date_born,
userRouter.put('/:id', body('email').isString(), body('name').isString(), body('password').isString(), body('date_born').isDate(), async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(request.params.id, 10);
    try {
        const users = request.body
        const updateUser = await _userService.updateUsers(users, id);
        return response.status(200).json(updateUser);
    } catch (error: any) {
        return response.status(400).json(error.message)
    }
})

// Delete users
userRouter.delete('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        await _userService.deleteUsers(id);
        return response.status(204).json("User has been successfully deleted");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

//login
userRouter.post('/login', body('email').isString(), async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const user = await db.users.findUnique(
        {
            where: {
                email: email
            }
        }
    );
    if (!user) return response.status(401);
    let result = bcrypt.compareSync(password, user.password);
    if (result) {
        const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
            expiresIn: "1800s",
        });
        return response.status(201).json({ token: token });
    }
    else {
        return response.sendStatus(401);
    }
});