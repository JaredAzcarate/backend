import { Router } from 'express';
import userModel from '../dao/models/user.model.js';
import { authMiddleware } from '../middlewares/auth/auth.js';
const router = Router();

// Ruta para autenticar si el usuario esta conectado. En caso de TRUE muestra la pagina profile
router.get('/profile', authMiddleware, (req, res) => {

  const dataUser = req.session.user

  res.render('profile', dataUser)

});

export default router;