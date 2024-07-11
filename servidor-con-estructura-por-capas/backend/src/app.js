import express from 'express'
import cors from 'cors'
import homeRouter from './routes/home.router.js'
import authRouter from './routes/auth.router.js'
import userRouter from './routes/user.router.js'
import productRouter from './routes/product.router.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


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


/* Routes */
app.use('/', homeRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)