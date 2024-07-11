import { Router } from "express";
import { addProductToOrderController } from "../controllers/order.controller.js";

const router = Router();

router.post("/add-product-to-order/:pid", addProductToOrderController);


export default router;
