import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import {
    httpGetProduct,
    httpGetProducts,
    httpPutProduct,
} from "./handlers/product";
import { handleInputErrors } from "./modules/middleware";

const router = Router();
/**
 * Product
 */
router.get("/product", httpGetProducts);

router.get("/product/:id", httpGetProduct);

router.post(
    "/product",
    body("name").isString(),
    handleInputErrors,
    (req, res) => {}
);

router.put("/product/:id", body("name").isString(), httpPutProduct);

router.delete("/product/:id", (req, res) => {});

/**
 * Update
 */

router.get("/update", (req, res) => {});

router.get("/update/:id", (req, res) => {});

router.post(
    "/update",
    body("title").isString(),
    body("body").isString(),
    body("version").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
    (req, res) => {}
);

router.put(
    "/update/:id",
    body("title").optional(),
    body("body").optional(),
    body("version").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
    (req, res) => {}
);

router.delete("/update/:id", (req, res) => {});

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post(
    "/updatepoint",
    body("name").isString(),
    body("description").isString(),
    (req, res) => {}
);

router.put(
    "/updatepoint/:id",
    body("name").optional().isString(),
    body("description").optional().isString(),
    (req, res) => {}
);

router.delete("/updatepoint/:id", (req, res) => {});

export default router;
