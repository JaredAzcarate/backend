import express from 'express'
import { ProductManager } from './desafios/desafio_2.js';

/* Levantar sevidor */
    const app = express()
    const port = 8080

/* Escuchamos los cambios del servidor */
    app.listen(8080,()=>{
        console.log('Observa los cambios en el navegador, gracias.');
    })


/* Utilizamos los metodos de ProductManager */

    const newInstance = new ProductManager( );

    const products = newInstance.getProducts ( )


    app.get('/products', (req, res)=>{

        /* Establecemos el valor del limite */
        const limit = req.query.limit;

        /* Obtenemos  */

        if (limit) {
            res.send() /* `<p style="color:red;">El limite puesto fue ${products}</p>` */
        }else{
            res.send(`<p style="color:green;">No hay limite</p>`)
        }
    })