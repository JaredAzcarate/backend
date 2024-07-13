import { Router } from 'express';
import { logOutController, loginController, resetPasswordController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', loginController);
router.post('/logout', authMiddleware, logOutController)
router.put('/forgot-password', resetPasswordController);

export default router;
