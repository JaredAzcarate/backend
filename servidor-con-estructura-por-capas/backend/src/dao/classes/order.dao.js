import orderModel from "../models/order.model.js";
import productsModel from "../models/product.model.js";

export default class OrderManager {

    addProductToOrder = async (sessionId, pid, oid) => {
        try {
            const product = await productsModel.findById(pid);
            if (!product) {
                throw new Error("Product not found");
            }

            let order;
            if (!oid) {

                order = new orderModel({
                    number: Date.now(),
                    user: sessionId,
                    products: [{ product: pid, quantity: 1 }],
                    totalPrice: product.price,
                    status: "pending"
                });
            } else {

                order = await orderModel.findById(oid);
                if (!order) {
                    throw new Error("Order not found");
                }

                const existingProductIndex = order.products.findIndex(p => p.product.toString() === pid);
                if (existingProductIndex > -1) {
                    order.products[existingProductIndex].quantity += 1;
                } else {
                    order.products.push({ product: pid, quantity: 1 });
                }
                order.totalPrice += product.price;
            }

            await order.save();
            return order;
        } catch (error) {
            console.error("Error adding product to order:", error.message);
            throw error;
        }
    }
}
