import express, { json, urlencoded } from "express";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

/* Definimos el puerto */
const PORT = 8080;

/* Nombramos la variable app con la función de express */
const app = express();

/* Definimos los middlewares */
app.use(json()); // Middleware para leer json
app.use(urlencoded({ extended: true })); // Middleware para analizar los datos de solicitud codificados en URL sin importar el tipo

/* Importar las rutas que serán usadas */
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

/* Escuchar los cambios del servidor */
app.listen(PORT, () => {
    console.log('Escuchando los cambios del servidor');
});