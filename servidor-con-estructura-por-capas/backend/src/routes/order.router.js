import { Router } from "express";
import { addProductToOrderController, confirmPurchaseController, getOrderByIdController, removeProductFromOrderController, sendPurchaseController, viewCheckOutByUserIdController } from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { payTicketController } from "../controllers/ticket.controller.js";

const router = Router();

router.get("/find-order/:oid", getOrderByIdController)
router.get("/checkout/:uid",authMiddleware, viewCheckOutByUserIdController) 
router.post("/add-product-to-order/:pid", addProductToOrderController);
router.post("/remove-product-from-order/:pid", removeProductFromOrderController);
router.post("/confirm-purchase/:oid", authMiddleware, confirmPurchaseController);
router.post("/send-purchase/:oid", authMiddleware, sendPurchaseController);
router.post("/pay-order", authMiddleware, payTicketController);


export default router;
