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
        return await orderModel.findOne({ user: userId, status: "in_process" });
    }

    getPendingOrderByUserIdLean = async (userId) => {
        return await orderModel.findOne({ user: userId, status: "in_process" }).populate('products.product').lean();
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

    removeProductById = async (oid, pid) => {
        try {
            const order = await orderModel.findById(oid);
            if (!order) {
                throw new Error('Order not found');
            }
    
            const productIndex = order.products.findIndex(p => p.product.toString() === pid);
            if (productIndex === -1) {
                throw new Error('Product not found in order');
            }
    
            const product = order.products[productIndex].product; 
            const productQuantity = order.products[productIndex].quantity;
    
            order.totalPrice -= product.price * productQuantity;
            order.products.splice(productIndex, 1);
            order.totalPrice = Math.max(0, order.totalPrice);
    
            await order.save();
            return order;
        } catch (error) {
            throw error;
        }
    };

    getAllTicketsByUserId = async (userId) => {
        try {
            const tickets = await ticketModel.find({ purchaser: userId }).lean();
            return tickets;
        } catch (error) {
            console.log(error);
            return [];
        }
    };
    

}
