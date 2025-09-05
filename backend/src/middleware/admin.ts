import { Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

const admin = async (req: Request, res: Response, next: Function) => {
    try {
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please login." });
        }

        const tokenString = Array.isArray(token) ? token[0] : token;
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET as string) as unknown as DecodedToken;

        if (!decoded || decoded.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default admin;