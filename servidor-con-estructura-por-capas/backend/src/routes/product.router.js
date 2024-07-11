import { Router } from "express";
import { createProduct, deleteProduct, getProductbyId, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router()

router.get("/", getProducts)
router.get("/:pid", getProductbyId)
router.post("/create-product", createProduct)
router.put("/update-product/:pid", updateProduct)
router.delete("/delete-product/:pid", deleteProduct)

export default router