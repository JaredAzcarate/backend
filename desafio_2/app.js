import { ProductManager } from "/desafio_1/desafio_1.js" 

const newInstance = new ProductManager( );

/* Test de nueva instancia / Ejecutar 1 función a la vez */

newInstance.getProducts ( )

newInstance.addProduct ( "producto prueba 5", "Este es un producto prueba 5", 600, "Sin imagen", "abc1234567", 60 );

newInstance.getProducts ( )

newInstance.getProductById ( 1 )

newInstance.updateProduct ( 1, {title: "Nuevo titulo"} ) 

newInstance.deleteProduct ( 1 )