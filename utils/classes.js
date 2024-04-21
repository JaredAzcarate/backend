import fs, { readFileSync, writeFileSync } from 'fs';


/* Clase de producto */
export class Product {
	
	constructor ( id, title, description, code, price, status, stock, category, thumbnail ){
		this.id = id,
		this.title = title,
		this.description = description,
		this.code = code,
		this.price = price,
		this.status = status,
		this.stock = stock,
		this.category = category,
		this.thumbnail = thumbnail
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
	async addProduct ( title, description, code, price, status, stock, category, thumbnail ) {

		try {
			/* Busco el array de productos */
			const listProduct = await this.readProducts ()

			/* Identifico si existe el producto */
			const findProduct = listProduct.find ( product => product.code === code )

			if (!findProduct) {
				/* Crear ID automatico */
				const autoId = listProduct.length + 1
				
				/* Crear nuevo prodcuto */
				const newProduct = new Product ( autoId, title, description, code, price, status, stock, category, thumbnail )

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
	async getProducts ( limit ) {
		/* Busco el array de productos */
		const products = await this.readProducts ()

		/* Se hace una copia del array de productos */
		const arrayGroup = [...products]

		if (limit) {
			/* Se filtra segun el valor de limit */
			arrayGroup.length = limit;
		}

		return arrayGroup
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
	async updateProduct(id, updateInput) {
		
		try {
		  /* Busco el array de productos */
		  const products = await this.readProducts();
	
	
		  /* Detecto el id del producto filtrado */
		  const productToUpdate = products.find((product) => product.id === id);
	
	
		  if (productToUpdate) {

			productToUpdate = { ...productToUpdate, ...updateInput };
	
			console.log("Producto actualizado correctamente");
		  } else {
			console.log("El producto no existe");
		  }

		  fs.promises.writeFile(this.path, JSON.stringify(products));
		  
		} catch (error) {
		  console.error("Hubo un error al actualizar el producto");
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