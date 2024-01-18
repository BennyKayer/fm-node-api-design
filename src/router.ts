import { Router } from "express";
import { body } from "express-validator";
import {
    httpDeleteProduct,
    httpGetProduct,
    httpGetProducts,
    httpPostProduct,
    httpPutProduct,
} from "./handlers/product";
import { handleInputErrors } from "./modules/middleware";
import {
    httpDeleteUpdate,
    httpGetUpdate,
    httpGetUpdates,
    httpPostUpdate,
    httpPutUpdate,
} from "./handlers/update";

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
    httpPostProduct
);
router.put(
    "/product/:id",
    body("name").isString(),
    handleInputErrors,
    httpPutProduct
);
router.delete("/product/:id", httpDeleteProduct);

/**
 * Update
 */

router.get("/update", httpGetUpdates);
router.get("/update/:id", httpGetUpdate);

router.post(
    "/update",
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
    body("version").optional(),
    body("status").optional().isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
    httpPostUpdate
);
router.put(
    "/update/:id",
    body("title").optional(),
    body("body").optional(),
    body("version").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
    httpPutUpdate
);
router.delete("/update/:id", httpDeleteUpdate);

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
