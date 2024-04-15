import express from 'express'
import { ProductManager } from './desafio_2' 

    /* Levantar sevidor */
    const app = express()
    const PORT = 8080

    /* Escuchamos los cambios del servidor */
    app.listen(PORT,()=>{
        console.log('Observa los cambios en el navegador, gracias.');
    })
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))


    /* Utilizamos los metodos de ProductManager */

    const newInstance = new ProductManager( );

    /* newInstance.addProduct ( "producto prueba 10", "Este es un producto prueba 10", 1000, "Sin imagen", "abc10", 100 ); */

    const products = await newInstance.getProducts ( );

    /* Request Query  */
    app.get('/products', (req, res)=>{

        /* Establecemos el valor del limite */
        const limit = parseInt(req.query.limit);

        if (!isNaN(limit)) {
            try {
                /* Se hace una copia del array de productos */
                let productsFilter = [...products]

                /* Se filtra segun el valor de limit */
                productsFilter.length = limit

                /* Respuesta de servidor */
                res.send(productsFilter)

            } catch (error) {

                console.error(error);
            }
        } else {

            res.send(products)
        }
        
    })

    /* Reques Params */
    app.get('/products/:pid', (req, res) => {
        const productId = parseInt(req.params.pid);

        try {
            let filterProduct = products.find( product => product.id === productId )

            if (filterProduct) {
                res.send(filterProduct)
            } else{
                res.send('El producto no existe')
            }

        } catch (error) {
            console.log(error);
        }
    } )