import express, { json, urlencoded } from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import __dirName from './utils.js';
import { Server } from 'socket.io';

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

socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('message', data => {
        console.log(data);
    })
} )