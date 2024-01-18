import { RequestHandler } from "express";
import { prisma } from "../db";

export const httpGetProducts: RequestHandler = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: (req as any).user.id,
            },
            include: {
                product: true,
            },
        });

        return res.status(200).json({ data: user?.product });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const httpGetProduct: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findFirst({
            where: { id, userId: (req as any).user.id },
        });

        if (!product) {
            return res.status(404).json({
                code: 404,
                message: `Product with id ${id} wasn't found`,
            });
        }

        return res.status(200).json({ data: product });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const httpPostProduct: RequestHandler = async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            userId: (req as any).user.id,
        },
    });

    return res.json({ data: product });
};

export const httpPutProduct: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const updated = await prisma.product.update({
        where: { id, userId: (req as any).user.id },
        data: {
            name: req.body.name,
        },
    });

    return res.json({ data: updated });
};

export const httpDeleteProduct: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const deleted = await prisma.product.delete({
        where: { id, userId: (req as any).user.id },
    });

    return res.json({ data: deleted });
};
