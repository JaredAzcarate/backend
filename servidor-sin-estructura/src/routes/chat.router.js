import { Router } from 'express';

const router = Router();

router.get('/active', (req, res) => {
    res.render('chat');
  });



export default router;