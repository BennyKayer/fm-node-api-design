import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

// The data should be useful for identifying the user later
// putting in a role here would've been useful
export const createJWT = (user: User) => {
    const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET
    );
    return token;
};
