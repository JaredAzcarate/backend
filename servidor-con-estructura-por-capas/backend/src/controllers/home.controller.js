import { getProductsController } from "./product.controller.js";

export const initSessionController = async (req, res) => {
    const cookie = req.cookies.sessionId
    try {

        const productsResponse = await getProductsController();

        const products = JSON.parse(JSON.stringify(productsResponse));
        
        res.status(200).render('home', { status: 'success', data: products, sessionId: cookie });

        /* res.status(200).send({ status: 'success', message: 'Estas en home', sessionId: cookie }); */
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}