import { Router } from 'express';
import cartsModel from '../dao/models/carts.model.js';
import productsModel from '../dao/models/products.model.js';

const router = Router();

// GET method route
router.get('/', async (req, res) => {
  res.redirect('/')
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
router.post('/', async (req, res) => {

  const { pid } = req.body

  try {

    let product = await productsModel.findOne({ _id: pid })

    if(!product){

      res.status(400).json({menssage: "El producto no existe"})

    }

    else{

      await cartsModel.create({ products: product._id })

      res.redirect('/')
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