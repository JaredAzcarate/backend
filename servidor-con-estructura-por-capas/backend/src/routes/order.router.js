import { Router } from "express";
import { addProductToOrderController, endPurchase, getOrderByIdController } from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/find-order/:oid", getOrderByIdController)
router.post("/add-product-to-order/:pid", addProductToOrderController);
router.post("/:oid/purchase", authMiddleware, endPurchase);


export default router;
