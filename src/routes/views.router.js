import express from 'express';

const router = express.Router();

router.get('/', ( req, res ) => {
    let user = {
        nombre: 'Sori',
        edad: 26
    }

    res.render('index', user)
} );

export default router;