import { Router } from "express";
import { createUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";

const router = Router()

router.get("/", getUsers)
router.get("/:uid", getUserById)
router.post("/create-user", createUser)
router.put("/update-user/:uid", updateUser)

export default router