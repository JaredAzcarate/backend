import { Router } from "express";
import { addProductToOrderController } from "../controllers/order.controller.js";

const router = Router();

router.post("/add-product-to-order/:pid", addProductToOrderController);
router.put("/update-order-user", authMiddleware, updateOrderUser);


export default router;
