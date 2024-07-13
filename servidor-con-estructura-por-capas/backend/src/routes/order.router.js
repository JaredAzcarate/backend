import { Router } from "express";
import { addProductToOrderController, getOrderByIdController } from "../controllers/order.controller.js";

const router = Router();

router.get("/find-order/:oid", getOrderByIdController)
router.post("/add-product-to-order/:pid", addProductToOrderController);


export default router;
