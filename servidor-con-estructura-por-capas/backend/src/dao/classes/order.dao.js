import orderModel from "../models/order.model.js";

export default class OrderManager {

    getOrder = async (oid) => {
        try {
            let result = await orderModel.findById(oid).populate('products.product').lean()
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    createOrder = async (order) => {
        try {
            let result = await orderModel.create(order)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

}
