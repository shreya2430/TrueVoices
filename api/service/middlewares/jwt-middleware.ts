import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user-management';

const secretKey = process.env.JWT_SECRET as string;

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
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
        req.user = decoded as IUser;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(403).json({ message: "Invalid token!"});
    }
};