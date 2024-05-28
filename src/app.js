import express, { json, urlencoded } from 'express';
import homeRouter from './routes/home.router.js';
import chatRouter from './routes/chat.router.js';
import productsRouter from './routes/products.router.js';
import setCookieRouter from './routes/setCookie.router.js';
import cartsRouter from './routes/carts.router.js'
import handlebars from 'express-handlebars';
import messagesModel from './dao/models/messages.model.js'
import __dirName from './utils.js';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productsModel from './dao/models/products.model.js';
import cookieParser from 'cookie-parser';

dotenv.config()
console.log(process.env.MONGO_URL);

/* Importamos express */
const app = express();

/* Definimos el puerto */
const port = 8080;

/* Escuchamos los cambios del servidor */
const httpServer = app.listen( port, ()=>{ console.log('Corriendo en el servidor ' + port) } );

/* Conectamos Mongoose */
mongoose.connect(process.env.MONGO_URL).then(()=> {console.log('Conectado a la base de datos')}).catch( error => console.error("Error al conectar la base de datos", error) )

/* Definimos los middlewares */
app.use(json()); // Middleware para leer json
app.use(urlencoded({ extended: true })); // Middleware para analizar los datos de solicitud codificados en URL sin importar el tipo
app.use(cookieParser());

/* Configuramos el motor de handlebars */
app.engine( 'handlebars', handlebars.engine() ); /* Defino el motor de plantillas */
app.set('views', __dirName + '/views') /* Defino la ruta donde se encuentran las vistas */
app.set('view engine', 'handlebars') /* Defino el motor de renderizacion */
app.use(express.static( __dirName + '/public'))


/* Importar las rutas que serán usadas */
app.use('/', homeRouter);
app.use('/chat', chatRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/cookies', setCookieRouter);


/* Configuracion de Socket Chat */
const socketServer = new Server( httpServer );/* Creamos un servidor para socket */

/* Configuracion de Socket Productos */
socketServer.on("connection", async (socket) => {

    console.log('Nuevo cliente conectado');  

    try {
        let messages = await messagesModel.find()
        let products = await productsModel.find()
        socket.emit('chatMessage', messages)
        socket.emit('products', products)
        
    } catch (error) {

        console.log(error);
    }

    socket.on('chatMessage', async(data) => {

        try {

            await messagesModel.create({user:data.user, message: data.message})

            let messages = await messagesModel.find()

            socketServer.emit('chatMessage', messages)
            
        } catch (error) {

            console.log(error);
        }

    })

    socket.on('addProduct', async(newProduct) => {

        try {

            await productsModel.create(newProduct)

            let products = await productsModel.find()

            socket.emit('products', products)
            
        } catch (error) {

            console.log(error);
        }

    })
    
    socket.on('deleteProduct', async(data) => {

        try {

            await productsModel.deleteOne({_id: data})

            let products = await productsModel.find()

            socket.emit('products', products)
            
        } catch (error) {

            console.log(error);
        }

    })
})