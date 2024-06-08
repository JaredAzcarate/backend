import { Router } from 'express';
import cartsModel from '../dao/models/carts.model.js';
import productsModel from '../dao/models/products.model.js';

const router = Router();

// GET method route
router.get('/', async (req, res) => {
  res.redirect('/')
});

// GET by cid
router.get('/cart', async (req, res) => {
  const cartId = req.cookies.cartId;

  try {
    let cart = await cartsModel.find({_id: cartId})

    if (!cart) {
      return res.status(400).json({ message: "El carrito no existe" });
    }

    console.log(cart[0].products);

    res.render('cart', { cart: cart[0].products });
  } catch (error) {
    res.status(500).send(error);
  }
});


/* Funcion para agregar producto a carrito */
router.post('/', async (req, res) => {

  const { pid } = req.body

  try {

    let product = await productsModel.findOne({ _id: pid })

    if(!product){

      res.status(400).json({menssage: "El producto no existe"})

    }

    else{
      /* Evaluo si existe carrito o sitengo que crear uno nuevo */
      let cartId = req.cookies.cartId
      
      if (!cartId) {

        let newCart = await cartsModel.create({ products: [{product: product._id}] })
        res.cookie('cartId', newCart._id.toString(), { maxAge: 3600000 })

      } else {
        /* Busco el carrito en la bd */
        let cart = await cartsModel.findOne({ _id: cartId })
        cart.products.push({product: product._id})
        await cart.save();

      }

      res.redirect('/api/carts/cart');

      
    }

  } catch (error) {

    res.status(500).send(error)
    
  }
});

export default router