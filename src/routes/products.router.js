import { Router } from "express";
import productsModel from "../dao/models/products.model.js";

const router = Router()

/* GET / */
router.get('/', async ( req, res ) => {
    
    try {        
        let products = await productsModel.find()
        res.render('handledProducts', {products})

    } catch (error) {

        res.status(500).json( [ { error } ] );

    }    
});

/* GET /:pid */
router.get('/:pid', async ( req, res ) => {

    const { pid } = req.params;

    const product = await productsModel.findOne( { _id: pid } )

    try {
        /* Evaluamos si el producto existe */
        if (product) {
            
            res.status(200).render('singleProduct', product)

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
            const existProduct = await productsModel.findOne({code: code})

            if (!existProduct){

                const createProduct = await productsModel.create( {title, description, code, price, status, stock, category, thumbnail} );
        
                res.status(200).json( [ { message: createProduct } ] )       
            }
            else{
                res.status(400).json( [ { message: "Ya existe un prodcuto con este código" } ] )    
            }


        } catch (error) {

            res.status(500).json( [ { message: 'Error al cargar el producto.' }, { error } ] );

        }
    }
});

/* PUT /:pid */
router.put('/:pid', async ( req, res ) => {

    /* Identifico el id por params */
    const { pid } = req.params;

    /* Solicito los datos que necestio actualizar */
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;

    try {
        
        const updateProduct = await productsModel.updateOne( { _id: pid }, req.body );

        res.status(200).json( [ { message: 'Producto actualizado correctamente.' }, { updateProduct } ] );

    } catch ( error ) {

        res.status(500).json( [ { message: 'Hubo un problema al actualizar el producto:' }, { error } ] );

    }

})

/* DELETE /:pid */
router.delete('/:pid', async ( req, res ) => {

    const { pid } = req.params;

    try {
        
        const deleteProduct = await productsModel.deleteOne ( { _id: pid } )
        
        res.status(200).json( [ { message: deleteProduct } ] )

    } catch (error) {
        
        res.status(500).json( [ {message: deleteProduct }, {error} ] )

    }

})

export default router;