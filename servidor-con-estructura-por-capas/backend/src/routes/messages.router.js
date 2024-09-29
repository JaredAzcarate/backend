import { Router } from "express";
import { messageErrorController } from "../controllers/messages.controller.js";

const router = Router()

router.get("/404", messageErrorController)

export default router