import { Router } from "express";
import { initSessionController } from "../controllers/home.controller.js";
import { anonymousSessionMiddleware } from "../middlewares/anonymous.session.middleware.js";

const router = Router()

router.get('/', anonymousSessionMiddleware, initSessionController)


export default router