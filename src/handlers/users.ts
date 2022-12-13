import express, { Request, Response } from 'express';
import { User, UserLogStore } from '../Models/user';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../middleware/verifyToken';

dotenv.config();

const store = new UserLogStore();

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (error) {
        res.json(error).status(400);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.body.id);
        res.json(user);
    } catch (error) {
        res.json(error).status(400);
    }
};

const create = async (req: Request, res: Response) => {
    const user: User = {
        id: 0,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        userName: req.body.userName,
    };
    try {
        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser }, process.env.SECRET as Secret);
        res.json({ token: token, user: newUser });
    } catch (error) {
        res.json(error).status(400);
    }
};

const authenticate = async (req: Request, res: Response) => {
    const userName = req.body.userName;
    const password = req.body.password;
    try {
        const logedUser = await store.authenticate(userName, password);
        if (logedUser) {
            const token = jwt.sign(
                { user: logedUser },
                process.env.SECRET as Secret
            );
            res.json(token);
        } else {
            res.send(`Incorrect username or password`);
        }
    } catch (error) {
        res.json(error).status(401);
    }
};

const usersRoute = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users', verifyAuthToken, index);
    app.get('/users/id', verifyAuthToken, show);
    app.post('/users/authenticate', authenticate);
};

export default usersRoute;
