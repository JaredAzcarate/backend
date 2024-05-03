import express, { json, urlencoded } from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import __dirName from './utils.js';
import { Server } from 'socket.io';
import { ProductManager } from '../functions/product_functions.js';

/* Importamos express */
const app = express();

/* Definimos el puerto */
const port = 8080;

/* Escuchamos los cambios del servidor */
const httpServer = app.listen( port, ()=>{ console.log('Corriendo en el servidor ' + port) } );

/* Creamos un servidor para socket */
const socketServer = new Server( httpServer );

/* Definimos los middlewares */
app.use(json()); // Middleware para leer json
app.use(urlencoded({ extended: true })); // Middleware para analizar los datos de solicitud codificados en URL sin importar el tipo

/* Configuramos el motor de handlebars */
app.engine( 'handlebars', handlebars.engine() ); /* Defino el motor de plantillas */
app.set('views', __dirName + '/views') /* Defino la ruta donde se encuentran las vistas */
app.set('view engine', 'handlebars') /* Defino el motor de renderizacion */
app.use(express.static( __dirName + '/public'))


/* Importar las rutas que serán usadas */
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter)


/* Configurar comunicacion de realTimeProducts */

const newInstance = new ProductManager ()

socketServer.on('connection', socket => {

    console.log('Nuevo cliente conectado en realTimeProducts');

    /* Socket para enviar productos al abrir pagina */
    newInstance.getProducts()
    .then( products => {
        socket.emit('products', products)
    })
    
    /* Socket para recibir el nuevo producto del cliente */
    socket.on('addProduct', async newProductData => {

        try {

            /* Agrega el nuevo producto */
            await newInstance.addProduct(
                newProductData.title,
                newProductData.description,
                newProductData.code,
                newProductData.price,
                true,
                newProductData.stock,
                newProductData.category,
                newProductData.thumbnail
            );

            /* Se envia nuevamente la lista de productos */
            const products = await newInstance.getProducts();
            socket.emit('products', products);

        } catch (error) {

            console.error('Error al agregar un nuevo producto:', error);

        }
    });

    /* Socket para recibir el producto a eliminar */
    socket.on('deleteProduct', async productToDelete => {
        try {

            await newInstance.deleteProduct(productToDelete)

            /* Se envia nuevamente la lista de productos */
            const products = await newInstance.getProducts();
            socket.emit('products', products);

        } catch (error) {

            console.error('Error al eliminar el producto:', error);

        }
    })

} )