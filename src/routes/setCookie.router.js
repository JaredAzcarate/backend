import { Router } from 'express';
const router = Router();

// GET method route
router.get('/setCookie', (req, res) => {
  res.cookie('terminos y condiciones', 'El usuario acepta los t&c de la web al navegar', {maxAge: 10000}).send('cookie page')
});
// GET method route
router.get('/getCookie', (req, res) => {
  res.send(req.cookies)
});

router.delete('/deleteCookie', (req, res) => {
  res.clearCookie('terminos y condiciones')
});

export default router;