import { RequestHandler } from "express";
import { prisma } from "../db";

export const httpGetUpdates: RequestHandler = async (req, res) => {
    const {
        user: { id },
    } = req as any;

    const products = await prisma.product.findMany({
        where: {
            userId: id,
        },
        include: {
            updates: true,
        },
    });

    return res.status(200).json({ data: products.map((el) => el.updates) });
};

export const httpGetUpdate: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const update = await prisma.update.findUnique({
            where: {
                id,
            },
        });

        if (!update) {
            return res.status(404).json({ message: `No update with id ${id}` });
        }

        return res.status(200).json({ data: update });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const httpPostUpdate: RequestHandler = async (req, res) => {
    try {
        const { body } = req;

        const product = await prisma.product.findUnique({
            where: {
                id: body.productId,
            },
        });

        if (!product) {
            return res.status(400).json({ message: "not your product" });
        }

        const newUpdate = await prisma.update.create({
            data: {
                body: body.body,
                title: body.title,
                updatedAt: new Date(),
                status: body.status,
                productId: product.id,
            },
        });

        return res.status(201).json({ data: newUpdate });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const httpPutUpdate: RequestHandler = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                userId: (res as any).user.id,
            },
            include: {
                updates: true,
            },
        });
        const updates = products.reduce(
            (allUpdates, product) => [...allUpdates, ...product.updates] as any,
            []
        );
        const match = updates.find(
            (update) => (update as any).id === req.params.id
        );

        if (!match) {
            throw Error("no match");
        }

        const updated = await prisma.update.update({
            where: {
                id: req.params.id,
            },
            data: req.body,
        });

        return res.status(200).json({ data: updated });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const httpDeleteUpdate: RequestHandler = async (req, res) => {
    const {
        params: { id },
    } = req;

    const deleted = await prisma.update.delete({
        where: { id },
    });

    return res.status(200).json({ data: deleted });
};
