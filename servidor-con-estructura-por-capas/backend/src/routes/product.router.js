import { Router } from "express";
import { createProductController, deleteProductController, getProductbyIdController, getProductsController, updateProductController } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.get("/", getProductsController)
router.get("/:pid", getProductbyIdController)
router.post("/create-product", upload.single('image'), createProductController)
router.put("/update-product/:pid", upload.single('image'), updateProductController)
router.delete("/delete-product/:pid", deleteProductController)

export default router