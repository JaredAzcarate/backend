import { Router } from "express";
import { getUserByIdController, getUsersController, updateUserController, viewEditProfileController, viewProfileController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllTicketsByUserIdController } from "../controllers/order.controller.js";

const router = Router()

router.get("/", getUsersController)
router.get("/find-user/:uid", getUserByIdController)
router.get("/profile/tickets/:uid", authMiddleware, getAllTicketsByUserIdController)
router.get("/profile/my-account", authMiddleware, viewProfileController);
router.get("/profile/edit-account", authMiddleware, viewEditProfileController);
router.post("/profile/edit-account", authMiddleware,updateUserController);


export default router