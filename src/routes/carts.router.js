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
    let cart = await cartsModel.find({ _id: cartId }).lean();

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
  /* Necesito resolver lo siguiente: almacenar los productos en una array (si el producto existe aumentar la propiedad quantity), luego cuando el usuario pasa al checkout se le solicitará iniciar sesion (en este momento el valor del carrito que se creo en el array se actualizará al carrito del usuario) */
  const { pid } = req.body

  try {

    let product = await productsModel.findOne({ _id: pid })

    if(!product){

      res.status(400).json({menssage: "El producto no existe"})

    }

    else{
 
      let cartId = req.cookies.cartId
      
      if (!cartId) {

        let newCart = await cartsModel.create({ products: [{product: product._id, quantity: 1}] })

        res.cookie('cartId', newCart._id.toString(), { maxAge: 3600000 })

      } else {
        
        let cart = await cartsModel.findOne({ _id: cartId })

        const identifyProduct = cart.products.find(prod => prod.product.equals(product._id))

        if (identifyProduct) {

          identifyProduct.quantity++

        }

        else{

          cart.products.push({product: product._id})
        }

        await cart.save();

      }

      res.redirect('/api/carts/cart');

      
    }

  } catch (error) {

    res.status(500).send(error)
    
  }
});

export default router