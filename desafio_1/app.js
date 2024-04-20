/* Prueba en nueva instancia */
let newInstance = new ProductManager()

/* Ver array vacio */
newInstance.getProducts()

/* Agregar producto de prueba */
newInstance.addProduct( "producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25 )

/* Visualizar array con producto de prueba */
newInstance.getProducts()

/* Intentar cargar producto con mismo "code" */
newInstance.addProduct( "producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25 )

/* Intentar cargar producto con diferente "code" */
newInstance.addProduct( "producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc1234", 25 )

/* Visualizar array con productos */
newInstance.getProducts()

/* Buscar producto por ID que no exista */
newInstance.getProductById(3)