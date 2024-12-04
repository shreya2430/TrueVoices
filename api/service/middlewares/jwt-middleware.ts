import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET as string;

interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload;
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access Denied!"});
        return;
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(403).json({ message: "Invalid token!"});
    }
};