import { Router } from "express";
import { ProductManager } from '../../utils/classes.js'

const router = Router()


/* Utilizamos los metodos de ProductManager */
const newInstance = new ProductManager();

/* GET / */
router.get('/', async ( req, res ) => {

    let limit = parseInt(req.query.limit);

    const products = await newInstance.getProducts (limit);
    
    try {        

        res.status(200).send(products)

    } catch (error) {

        res.status(500).json( [ { error } ] );

    }    
});

/* GET /:pid */
router.get('/:pid', async ( req, res ) => {

    const productId = parseInt(req.params.pid);

    const products = await newInstance.getProducts ();

    try {

        let filterProduct = products.find( product => product.id === productId )

        if (filterProduct) {
            
            res.status(200).send(filterProduct)

        } else{
            
            res.status(404).json( [ { message: 'El producto no existe' } ] );

        }

    } catch (error) {
        res.status(500).json( [ { error } ] );
    }
} )

/* POST /  */
router.post('/', async (req, res) => {

    const { title, description, code, price, status, stock, category, thumbnail } = req.body;

    if ( !title || !description || !code || !price || !status || !stock || !category || !thumbnail ) {

        res.status(500).json( [ { message: 'Todos los campos son obligatorios.' } ] )

    } else {
    
        try {

            await newInstance.addProduct( title, description, code, price, status, stock, category, thumbnail );
    
            res.status(200).json( [ { message: 'Producto cargado correctamente.' } ] )       

        } catch (error) {

            res.status(500).json( [ { message: 'Error al cargar el producto.' }, { error } ] );

        }
    }
});

/* PUT /:pid */
router.put('/:pid', async ( req, res ) => {

    /* Identifico el id por params */
    const productPid = parseInt( req.params.pid );

    /* Solicito los datos que necestio actualizar */
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;

    try {
        
        await newInstance.updateProduct( productPid, { title, description, code, price, status, stock, category, thumbnail } );

        res.status(200).json( [ { menssage: 'Producto actualizado correctamente.' } ] );

    } catch ( error ) {

        res.status(500).json( [ { menssage: 'Hubo un problema al actualizar el producto:' }, { error } ] );

    }

})

export default router;