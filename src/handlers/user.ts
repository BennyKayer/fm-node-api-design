import { prisma } from "../db";
import { RequestHandler } from "express";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser: RequestHandler = async (req, res) => {
    const password = await hashPassword(req.body.password);
    const username = req.body.username;

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password,
            },
        });

        const token = createJWT(user);
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Bad request" });
    }
};

export const signIn: RequestHandler = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    });

    if (!user) {
        return res
            .status(404)
            .json({ code: 404, message: "User doesn't exist" });
    }

    const isValid = await comparePasswords(req.body.password, user.password);
    if (!isValid) {
        return res.status(400).json({ code: 400, message: "Wrong password" });
    }

    const token = createJWT(user);
    res.status(200).json({ token });
};
