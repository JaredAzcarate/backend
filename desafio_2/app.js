import { ProductManager } from "./desafio_2.js" 

const newInstance = new ProductManager( );

/* Test de nueva instancia / Ejecutar 1 función a la vez */

/* newInstance.getProducts ( ) */

/* newInstance.addProduct ( "producto prueba 5", "Este es un producto prueba 5", 600, "Sin imagen", "abc1234567", 60 ); */

/* newInstance.getProducts ( ) */

/* newInstance.getProductById ( 1 ) */

newInstance.updateProduct ( 10, {title: "Jared", price: 500} ) 

/* newInstance.deleteProduct ( 1 ) */

newInstance.getProducts ( )