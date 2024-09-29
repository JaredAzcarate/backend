import express from 'express'
import cors from 'cors'
import homeRouter from './routes/home.router.js'
import orderRouter from './routes/order.router.js'
import authRouter from './routes/auth.router.js'
import userRouter from './routes/user.router.js'
import productRouter from './routes/product.router.js'
import mailRouter from './routes/mail.router.js'
import messagesRouter from './routes/messages.router.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import {__dirname} from './utils/path.utils.js'
import { addLogger, logErrors } from './middlewares/logger.middleware.js'
import {layoutMiddleware} from './middlewares/layout.middleware.js'
import handlebars from 'express-handlebars';
import Handlebars from 'handlebars';
import path from 'path'
import { Server } from 'socket.io';
import { getProductsController } from './controllers/product.controller.js'
import { customFetch } from './utils/fetch.utils.js'
import methodOverride from 'method-override';


dotenv.config()

/* Importamos express */
const app = express();

/* Definimos el puerto */
const port = 8080;

/* Escuchamos los cambios del servidor */
const httpServer = app.listen( port, ()=>{ console.log('Corriendo en el servidor ' + port) } );

/* Conectamos Mongoose */
mongoose.connect(process.env.MONGO_URL).then(()=> {console.log('Conectado a la base de datos')}).catch( error => console.error("Error al conectar la base de datos", error) )


app.use(cors())
app.use(cookieParser(process.env.COOKIE_PARSER));
app.use(bodyParser.json()); // Middleware para leer json
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para analizar los datos de solicitud codificados en URL sin importar el tipo
app.use(addLogger);

/* Middleware de Layout */
app.use(layoutMiddleware);
app.use(methodOverride('_method')); /* Middleware para simular PUT y DELETE */

/* Routes */
app.use('/', homeRouter)
app.use('/api/order', orderRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/mail', mailRouter)
app.use('/message', messagesRouter)

/* Estáticos */
app.use(express.static(__dirname + '/../public')); /* Estaticos para acceder a js o css */
app.use('/uploads', express.static(path.join(__dirname, '/../uploads'))); /* Estaticos de multer */

/* Handlebars */
app.engine( 'handlebars', handlebars.engine() );
app.set('views', __dirname + '/../views') 
app.set('view engine', 'handlebars') 

/* Registrar el helper eq */
Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
});

/* Creamos un servidor para socket */
const socketServer = new Server( httpServer );

/* Configuracion de Socket */
socketServer.on("connection", async (socket) => {
    console.log('Nuevo cliente conectado');

    try {
        // Enviar productos actuales a los nuevos clientes conectados
        let products = await getProductsController();
        socket.emit('products', products); // Solo al cliente conectado
        
    } catch (error) {
        console.log(error);
    }
    

    // Escuchar evento de eliminación de producto
    socket.on('deleteProduct', async (productId) => {
        try {
            // Realizar una llamada HTTP al endpoint de eliminación
            await customFetch(`/api/products/delete-product/${productId}`, 'DELETE');
    
            // Obtener la lista actualizada de productos
            let products = await getProductsController();
    
            // Emitir la lista actualizada de productos a todos los clientes conectados
            socketServer.emit('products', products); // A todos los clientes
    
        } catch (error) {
            console.log(error);
        }
    });
});