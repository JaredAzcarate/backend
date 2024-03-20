/* 

Desafio 1:

Realizar una clase “ProductManager” que gestione un conjunto de productos.
Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
Cada producto que gestione debe contar con las propiedades:
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)
Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
Validar que no se repita el campo “code” y que todos los campos sean obligatorios
Al agregarlo, debe crearse con un id autoincrementable
Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
En caso de no coincidir ningún id, mostrar en consola un error “Not found” 

*/

/* Clase de producto */
class Product {
	
	constructor ( id, title, description, price, thumbnail, code, stock ){
		this.id = id,
		this.title = title,
		this.description = description,
		this.price = price,
		this.thumbnail = thumbnail,
		this.code = code,
		this.stock = stock
	}

}

/* Clase de Productos Manager */
class ProductManager {
	
	constructor (){

		this.products = []
	}

	addProduct ( title, description, price, thumbnail, code, stock ) {

		const evaluateId = this.products.find(item => item.code === code)

		if ( !evaluateId ) {

			const autoId = this.products.length + 1

			const newProduct = new Product( autoId, title, description, price, thumbnail, code, stock )
	
			this.products.push(newProduct)
		}

		else{

			console.log("this product exists");
		}


		
	}

	getProducts () {

		console.log(this.products);

	}

	getProductById ( id ) {

		const productId = this.products.find( product => product.id === id )
		
		if (productId){

			const productFilter = this.products.filter(product => product.id === id)

			console.log("Product founded = " + id);

			console.log(productFilter);

		}

		else{

			console.log("Not Found: There is no product with id = " + id);

		}

		

	}

}

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