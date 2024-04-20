import { Router } from "express";
import { ProductManager } from '../../utils/classes.js'

const router = Router()


/* Utilizamos los metodos de ProductManager */
const newInstance = new ProductManager();

const products = await newInstance.getProducts ();

/* Main router */
router.get('/', (req, res)=>{
    res.json([
        {message: 'hola'}
    ]);
});


/* Request Query  */
router.get('/products', (req, res)=>{

        /* Establecemos el valor del limite */
        const limit = parseInt(req.query.limit);

        if (!isNaN(limit)) {
            try {
                /* Se hace una copia del array de productos */
                let productsFilter = [...products]

                /* Se filtra segun el valor de limit */
                productsFilter.length = limit

                /* Respuesta de servidor */
                res.send(productsFilter)

            } catch (error) {

                console.error(error);
            }
        } else {

            res.send(products)
        }
        
})

/* Reques Params */
router.get('/products/:pid', (req, res) => {
        const productId = parseInt(req.params.pid);

        try {
            let filterProduct = products.find( product => product.id === productId )

            if (filterProduct) {
                res.send(filterProduct)
            } else{
                res.send('El producto no existe')
            }

        } catch (error) {
            console.log(error);
        }
} )

export default router;