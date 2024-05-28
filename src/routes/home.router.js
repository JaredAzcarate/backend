import { Router } from 'express';
import productsModel from '../dao/models/products.model.js';
import cartsModel from '../dao/models/carts.model.js';
const router = Router();

// GET method route
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        let result = await productsModel.paginate({}, {
            page: parseInt(page),
            limit: parseInt(limit)
        });

        let products = result.docs.map(product => ({
            id: product._id,
            title: product.title
        }));

        /* Generar un rango de páginas para mostrar en el paginador */
        const totalPages = result.totalPages;
        const currentPage = result.page;
        const range = 2; /* Número de páginas adicionales a mostrar a cada lado de la página actual */
        const startPage = Math.max(1, currentPage - range);
        const endPage = Math.min(totalPages, currentPage + range);

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        res.render('home', { products, pages, hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage });
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
});

export default router;
