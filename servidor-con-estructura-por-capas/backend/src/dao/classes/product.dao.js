import productsModel from "../models/product.model.js"

export default class ProductManager {

    getProducts = async () => {
        try {
            const result = await productsModel.find()
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getProductById = async (pid) => {
        try {
            const result = await productsModel.findById(pid)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    createProduct = async (product) => {
        try {
            const result = await productsModel.create(product)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    updateProduct = async ( pid, product) => {
        try {
            const result = await productsModel.updateOne({ _id: pid }, { $set: product })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    deleteProduct = async ( pid ) => {
        try {
            const result = await productsModel.deleteOne({_id: pid})
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
 }