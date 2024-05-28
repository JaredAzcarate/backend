import { Router } from 'express';
import cartsModel from '../dao/models/carts.model.js';
import productsModel from '../dao/models/products.model.js';

const router = Router();

// GET method route
router.get('/', async (req, res) => {

  try {

    let carts = await cartsModel.find()

    res.status(200).send(carts)

  } catch (error) {

    res.status(500).send(error)

  }
});

// GET by cid
router.get('/:cid', async (req, res) => {

  const { cid } = req.params

  try {

    let cart = await cartsModel.findOne( { _id: cid } )

    res.status(200).send(cart)

  } catch (error) {

    res.status(500).send(error)

  }
});

// POST method route
router.post('/:pid', async (req, res) => {

  const { pid } = req.params

  try {

    let product = await productsModel.findOne({ _id: pid })

    if(!product){

      res.status(400).json({menssage: "El producto no existe"})

    }

    else{

      let newCart = await cartsModel.create({ products: product })
  
      res.status(200).json({newCart})
    }

  } catch (error) {

    res.status(500).send(error)
    
  }
});

// POST agregar producto a carrito existente
router.post('/:cid/:pid', async (req, res) => {

  const { cid, pid } = req.params

  try {

    let cart = await cartsModel.findOne({ _id: cid })

    let product = await productsModel.findOne({ _id: pid })

    if(!cart || !product){

      res.status(400).json({menssage: "El producto o carrito no existe"})

    }

    else{
      /* Desarrollar */
      /* let updateCart = await cartsModel.findByIdAndUpdate({ products: product }) */
  
      res.status(200).send(newCart)
    }

  } catch (error) {

    res.status(500).send(error)
    
  }
});

// DELETE method route
router.delete('/:cid', async (req, res) => {
  
  const { cid } = req.params

  try {

    let cart = await cartsModel.deleteOne( { _id: cid } )

    res.status(200).json([{ menssage: "Carrito eliminado correctamente" }])

  } catch (error) {

    res.status(500).send(error)

  }
});

export default router