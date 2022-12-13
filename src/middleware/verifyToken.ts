import { NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];
        if (token == null) return res.status(401).send('Token Required');
        const decoded = jwt.verify(token, process.env.SECRET as Secret);
        decoded ? next() : null;
    } catch (error) {
        res.status(401).send('Invalid Token');
    }
};

export default verifyAuthToken;
