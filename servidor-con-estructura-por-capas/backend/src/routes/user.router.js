import { Router } from "express";
import { createUserController, getUserByIdController, getUsersController, updateUserController } from "../controllers/user.controller.js";

const router = Router()

router.get("/", getUsersController)
router.get("/:uid", getUserByIdController)
router.post("/create-user", createUserController)
router.put("/update-user/:uid", updateUserController)

export default router