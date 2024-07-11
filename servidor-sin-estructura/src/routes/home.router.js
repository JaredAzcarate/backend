import { Router } from 'express';
import productsModel from '../dao/models/products.model.js';

const router = Router();

// GET method route
router.get('/', async (req, res) => {

    const userData = req.session.user

    const { page, limit, category, sort } = req.query

    try {
        /* Objeto para definir los criterios de busqueda del paginate */
        const filter = {}

        /* objeto que define las opciones de paginación */
        const options = {
            page: page || 1,
            limit: limit || 10,
            lean: true
        }

        /* Evaluo si hay una categoria por la url y si hay agrego la propiedad category + el valor de la query */
        if (category) {
            filter.category = category
        }

        if (sort === "asc"){
            options.sort = { price: 1 }
        }
        if (sort === "desc"){
            options.sort = { price: -1 }
        }

        // Realizar la consulta paginada
        const result = await productsModel.paginate(filter, options);

        // Extraer los datos necesarios del resultado de la paginación
        const { docs: products, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = result;

        // Renderizar la vista con los datos de productos y paginación
        res.render('home', { userData, products, hasPrevPage, hasNextPage, prevPage, nextPage, page, totalPages });

    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
});

/* Funcionando */
/* router.get('/', async (req, res) => {

    const userData = req.session.user

    try {
        const { page = 1, limit = 10, category} = req.query;

        let query = {}

        if (category) {
            query.category = category
        }

        
        let result = await productsModel.paginate(query, {
            page: parseInt(page),
            limit: parseInt(limit),
        });

        let products = result.docs.map(product => ({
            id: product._id,
            title: product.title
        }));

        
        const totalPages = result.totalPages;
        const currentPage = result.page;
        const range = 2; 
        const startPage = Math.max(1, currentPage - range);
        const endPage = Math.min(totalPages, currentPage + range);

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        res.render('home', { userData, products, pages, hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage });
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
}); */

export default router;
