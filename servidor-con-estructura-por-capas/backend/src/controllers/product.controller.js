import ProductManager from "../dao/classes/product.dao.js";
import ProductDTO from "../dto/product.dto.js";

const productController = new ProductManager();

export const getProductsController = async (req, res) => {
    try {
        let result = await productController.getProducts();
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}

export const getProductbyIdController = async (req, res) => {
    const { pid } = req.params;

    try {
        let result = await productController.getProductById(pid);
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}

export const createProductController = async (req, res) => {
    const productData = ProductDTO.getImageFromMulter(req.body, req.file);

    try {
        let result = await productController.createProduct(productData);
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}

export const updateProductController = async (req, res) => {
    const { pid } = req.params;
    const productData = ProductDTO.getImageFromMulter(req.body, req.file);

    try {
        let result = await productController.updateProduct(pid, productData);
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}

export const deleteProductController = async (req, res) => {
    const { pid } = req.params;

    try {
        let result = await productController.deleteProduct(pid);
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}