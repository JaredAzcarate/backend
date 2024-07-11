import { Router } from "express";
import { createProductController, deleteProductController, getProductbyIdController, getProductsController, updateProductController } from "../controllers/product.controller.js";

const router = Router()

router.get("/", getProductsController)
router.get("/:pid", getProductbyIdController)
router.post("/create-product", createProductController)
router.put("/update-product/:pid", updateProductController)
router.delete("/delete-product/:pid", deleteProductController)

export default router