import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const httpPutProduct: RequestHandler = (req, res) => {
    return res.status(200).json({ status: "ok" });
};
