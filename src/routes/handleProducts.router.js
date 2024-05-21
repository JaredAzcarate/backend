import { Router } from "express";
import productsModel from "../dao/models/products.model.js";

const router = Router()

/* GET / */
router.get('/', async ( req, res ) => {
    
    try {        

        let products = await productsModel.find()
        
        res.render()

    } catch (error) {

        res.status(500).json( [ { error } ] );

    }    
});

export default router;