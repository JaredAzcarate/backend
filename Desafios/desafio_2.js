import { log } from 'console';
import fs, { readFileSync, writeFileSync } from 'fs';


/* Clase de producto */
export class Product {
	
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
export class ProductManager {
	
	constructor () {

		this.path = 'productos.json'
	}

	/* Obtener productos de "file" */
	async readProducts () {
		try {
			/* Obtengo el contenido de "file" */
			const data = await fs.promises.readFile(this.path, "utf8")

			/* Convierto el contenido a formato de array de objetos*/
			return JSON.parse(data)
		} catch (error) {
			console.error('Hubo un error al intentar leer la lista de producto:', error)
		}
	}

	/* Agregar */
	async addProduct ( title, description, price, thumbnail, code, stock ) {

		try {
			/* Busco el array de productos */
			const listProduct = await this.readProducts ()

			/* Identifico si existe el producto */
			const findProduct = listProduct.find ( product => product.code === code )

			if (!findProduct) {
				/* Crear ID automatico */
				const autoId = listProduct.length + 1

				/* Crear nuevo prodcuto */
				const newProduct = new Product ( autoId, title, description, price, thumbnail, code, stock )

				/* Agregar producto a array */
				listProduct.push ( newProduct )

				/* Actualizar valores almacenados en file */
				await fs.promises.writeFile ( this.path, JSON.stringify (listProduct) )

			} else {
				console.log(`El producto ${findProduct.code} ya existe en la lista`);
			}

		} catch (error) {
			console.log(error);
		}

	}

	/* Consultar */
	async getProducts () {
		/* Busco el array de productos */
		const products = await this.readProducts ()

		console.log( products );
	}

	/* Consultar por ID */
	async getProductById ( id ) {
		try {
			/* Busco el array de productos */
			const products = await this.readProducts ()

			/* Filtro por el id pasado por parametro */
			const productId = products.find ( product => product.id === id )

			console.log( productId );

			return productId

		} catch (error) {

			console.log ("No se encontro el producto", error)
		}

	}

	/* Actualizar */
	async updateProduct ( id, updateInput ) {
		try {
			/* Busco el array de productos */
			const products = await this.readProducts ()

			/* Detecto el index del producto filtrado */
			const indexProduct = products.findIndex ( product => product.id === id )

			if (indexProduct !== -1 ) {
				/* Actualizar el valor deseado, esto tuve que ver alternativas en chatGPT ya que tuve dificultad para conseguirlo y entenderlo */
				for (const key in updateInput) {
					if (updateInput.hasOwnProperty(key)) {
						if (updateInput[key] !== undefined) {
							products[indexProduct][key] = updateInput[key];
						}
					}
				}

				fs.promises.writeFile ( this.path, JSON.stringify ( products ) )

				console.log('Producto actualizado correctamente');
				

			} else {
				console.log('El producto no existe');
			}
			
		} catch (error) {
			console.error("Hubo un error al actualizar el producto")
		}
		
	}
		

	/* Borrar */
	async deleteProduct ( id ) {
		try {
			/* Busco el array de productos */
			const products = await this.readProducts ()

			/* Detecto el index del producto filtrado */
			const indexProduct = products.findIndex ( product => product.id === id )

			if (indexProduct !== -1 ) {
				products.splice ( indexProduct, 1 )

				fs.promises.writeFile ( this.path, JSON.stringify ( products ) )

			} else {
				console.log('El producto no existe');
			}
			
		} catch (error) {
			console.error("Hubo un error al eliminar el producto")
		}
		
	}
}