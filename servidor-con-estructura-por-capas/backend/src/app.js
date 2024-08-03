import express from 'express'
import cors from 'cors'
import homeRouter from './routes/home.router.js'
import orderRouter from './routes/order.router.js'
import authRouter from './routes/auth.router.js'
import userRouter from './routes/user.router.js'
import productRouter from './routes/product.router.js'
import mailRouter from './routes/mail.router.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import {__dirname} from './utils/path.utils.js'
import { addLogger, logErrors } from './middlewares/logger.middleware.js'
import logger from './utils/logger.utils.js'


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


/* Routes */
app.use('/', homeRouter)
app.use('/api/order', orderRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/mail', mailRouter)

/* Endpoint para probar todos los niveles de logger */
app.get('/loggerTest', (req, res) => {
    req.logger.debug('Debug log');
    req.logger.http('HTTP log');
    req.logger.info('Info log');
    req.logger.warning('Warning log');
    req.logger.error('Error log');
    req.logger.fatal('Fatal log');
    res.send('Logger test complete');
});

app.get('/error', (req, res) => {
    res.send('Este es un error de ejemplo');
    req.logger.error('Este es un error de ejemplo')
});

app.get('/info', (req, res) => {
    res.send('Este es un ejemplo de log tipo "info"');
    logger.info('La ruta de "info" ha sido llamada');
});

/* Estáticos */
/*app.use(express.static(path.join(__dirname, '../frontend/build')));  Estaticos de React */
app.use('/uploads', express.static('uploads')); /* Estaticos de multer */
app.use(logErrors);

console.log('Environment:', process.env.NODE_ENV);