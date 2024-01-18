import { User } from "@prisma/client";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "falback";

// The data should be useful for identifying the user later
// putting in a role here would've been useful
export const createJWT = (user: User) => {
    const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET
    );
    return token;
};

export const protect: RequestHandler = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res
            .status(401)
            .json({ code: 401, message: "Authorization header missing" });
    }

    const [, token] = bearer.split(" ");
    if (!token) {
        return res.status(401).json({ code: 401, message: "Not authorized" });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        (req as any).user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({ code: 401, message: "Invalid token" });
    }
};

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 5);
};
