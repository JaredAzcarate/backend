import ProductManager from "../dao/classes/product.dao.js";

const productController = new ProductManager

export const getProductsController = async (req, res) => {
    let result = await productController.getProducts()
    res.send({status:'sucess', result})
}

export const getProductbyIdController = async (req, res) => {
    const { pid } = req.params

    let result = await productController.getProductById(pid)
    res.send({status:'sucess', result})
}

export const createProductController = async (req, res) => {
    const { title, description, details, price, status, category } = req.body
    
    /* Extraemos el file que detecta multer y se pasa el PATH */
    const image = req.file ? req.file.path : null;

    let product = {
        title,
        description,
        details,
        price,
        status,
        category,
        image
    }

    let result = await productController.createProduct(product)
    res.send({status:'sucess', result})
}

export const updateProductController = async (req, res) => {
    const { pid } = req.params
    const { title, description, details, price, status, category } = req.body

    /* Extraemos el file que detecta multer y se pasa el PATH */
    const image = req.file ? req.file.path : null;

    let product = {
        title,
        description,
        details,
        price,
        status,
        category,
        image
    }

    let result = await productController.updateProduct( pid, product)
    res.send({status:'sucess', result})
}

export const deleteProductController = async (req, res) => {
    const { pid } = req.params

    let result = await productController.getProductById(pid)
    res.send({status:'sucess', result})
}