import ProductManager from "../dao/classes/product.dao.js";

const productController = new ProductManager

export const getProducts = async (req, res) => {
    let result = await productController.getProducts()
    res.send({status:'sucess', result})
}

export const getProductbyId = async (req, res) => {
    const { pid } = req.params

    let result = await productController.getProductById(pid)
    res.send({status:'sucess', result})
}

export const createProduct = async (req, res) => {
    const { title, description, details, price, status, category, image } = req.body

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

export const updateProduct = async (req, res) => {
    const { pid } = req.params
    const { title, description, details, price, status, category, image } = req.body

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

export const deleteProduct = async (req, res) => {
    const { pid } = req.params

    let result = await productController.getProductById(pid)
    res.send({status:'sucess', result})
}