import orderModel from "../models/order.model.js";
import ticketModel from "../models/ticket.model.js";

export default class OrderManager {

    getOrder = async (oid) => {
        try {
            let result = await orderModel.findById(oid)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getPendingOrderByUserId = async (userId) => {
        return await orderModel.findOne({ user: userId, status: "pending" });
    }

    getOrderAndProducts = async (oid) => {
        try {
            /* Se obtienen los productos a traves del populate */
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

    endOrder = async (ticketData) => {
        try {
            const result = await ticketModel.create(ticketData);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

}
