import express from 'express';
import { ProductManager } from '../../functions/product_functions.js';

const router = express.Router();

const newInstance = new ProductManager();

router.get('/', async ( req, res ) => {

    res.render('index')
} );

router.get('/home', async( req, res ) => {

    try {
        const products = await newInstance.getProducts();
        res.render('home', { products }); 
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }

} );

router.get('/realTimeProducts', async( req, res ) => {

    try {
        const products = await newInstance.getProducts();
        res.render('realTimeProducts', { products }); 
        
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }

} );


export default router;