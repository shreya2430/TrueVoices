import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user-management';
import { config } from 'dotenv'

config()

const secretKey = process.env.JWT_SECRET as string;

export type JwtPayload = {
    id: string;
    email: string;
    username: string;
    iat: number;
    exp: number;
};

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload;
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access Denied!"});
        return;
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded as JwtPayload;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: "Token expired!"});
        }
        res.status(403).json({ message: "Invalid token!"});
    }
};