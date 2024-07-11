
import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js'
import productRouter from './routes/product.router.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import sessionMiddleware from './middlewares/session.middleware.js'


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
app.use(cookieParser());
app.use(sessionMiddleware)
app.use(bodyParser.json()); // Middleware para leer json
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para analizar los datos de solicitud codificados en URL sin importar el tipo

/* Routes */
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)