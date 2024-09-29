import { Router } from 'express';
import { logOutController, loginController, viewLoginController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { signUpController, updatePasswordController, viewSignUpController, viewUpdatePasswordController } from '../controllers/user.controller.js';

const router = Router();

router.get('/login', viewLoginController);
router.get('/update-password', viewUpdatePasswordController);
router.get('/signup', viewSignUpController);
router.post('/signup', signUpController);
router.post('/login', loginController);
router.post('/logout', authMiddleware, logOutController);
router.post('/update-password', updatePasswordController);

export default router;
