import path from "path";
import ProductManager from "../dao/classes/product.dao.js";
import ProductDTO from "../dto/product.dto.js";

const productController = new ProductManager();

export const viewAdminProductsController = async (req, res) => {
    try {
        // Obtener todos los productos
        const products = await productController.getProducts();
        
        // Renderizar la vista admin-products y pasar los productos
        res.render('admin-products', { products });
        
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

export const getProductsController = async (req, res) => {
    try {
        let result = await productController.getProducts();
        
        return result;
        /* res.send({ status: 'success', result }); */
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}

export const getProductbyIdController = async (req, res) => {
    const { pid } = req.params;

    try {
        let result = await productController.getProductById(pid);
        res.render('singleProduct', result)

        /* res.send({ status: 'success', result }); */
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}

export const createProductController = async (req, res) => {

    if (!req.file) {
        return res.status(400).send({ status: 'error', message: 'No se ha subido ninguna imagen.' });
    }

    const productData = ProductDTO.getImageFromMulter(req.body, req.file);

    try {
        let result = await productController.createProduct(productData);
        res.render('admin-products',{ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}

export const updateProductController = async (req, res) => {
    const { pid } = req.params;
    const { title, description, price, details, category } = req.body;
    let updateData = { title, description, price, details, category };

    // Si se carga una nueva imagen, incluirla en los datos de actualización
    if (req.file) {
        updateData.image = path.join('/uploads', req.file.filename);
    }

    try {
        const updatedProduct = await productController.updateProduct(pid, updateData);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.redirect('/api/products/admin/products');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteProductController = async (req, res) => {
    const { pid } = req.params;

    try {
        const deletedProduct = await productController.deleteProduct(pid);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.redirect('/api/products/admin/products');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
