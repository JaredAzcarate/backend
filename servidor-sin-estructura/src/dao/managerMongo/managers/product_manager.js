import productsModel from "../../models/products.model.js"

/* Clase de Productos Manager */
export class ProductManager {

	/* Consultar */
	async getProducts () {
     
		let products = await productsModel.find()
			
		return products
	}

	/* Consultar por ID */
	async getProductById ( pid ) {
	
		try {

			const product = await productsModel.find( { _id: pid } )
		
			/* Evaluamos si el producto existe */
			if (product) {
				
				return product
	
			} else{
				
				console.error("El producto no existe");
	
			}
			
		} catch (error) {
			console.error(error);
		}

	}

	/* Consultar por ID */
	async addProduct ( title, description, code, price, status, stock, category, thumbnail ) {
	
		try {

			const existProduct = await productsModel.findOne({code: code})
		
			if (!existProduct){

				const createProduct = await productsModel.create( {title, description, code, price, status, stock, category, thumbnail} );
		
				return createProduct    
			}
			else{

				console.error("Ya existe un producto con este código")
			}
			
		} catch (error) {
			console.error(error);
		}

	}

	/* Actualizar */
	async updateProduct( pid, inputToUpdate) {	

		try {

			let updateProduct = await productsModel.updateOne( { _id: pid }, inputToUpdate );

			return updateProduct
		  
		} catch (error) {

		  console.error("Hubo un error al actualizar el producto");
		  
		}
	}
		
	/* Borrar */
	async deleteProduct ( id ) {

		let message = 'El producto se elimino correctamente.';

		try {
			/* Busco el array de productos */
			const products = await this.readProducts ();

			/* Detecto el index del producto filtrado */
			const indexProduct = products.findIndex ( product => product.id === id );

			if (indexProduct !== -1 ) {

				products.splice ( indexProduct, 1 );

				await fs.promises.writeFile ( this.path, JSON.stringify ( products ) );

			} else {

				message = 'El producto no existe.';
			}

			return message;
			
		} catch (error) {

			message = "Hubo un error al eliminar el producto";

		}
		
	}
}