import { Router } from 'express';
import productsModel from '../dao/models/products.model.js';
const router = Router();

// GET method route
router.get('/', async (req, res) => {
    try {
        let products = await productsModel.find();
        products = products.map(product => ({
          id: product.id,
          title: product.title
      }));
        res.render('home', { products });
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
});

export default router;
