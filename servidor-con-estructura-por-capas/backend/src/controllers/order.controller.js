import ProductManager from "../dao/classes/product.dao.js";
import orderModel from "../dao/models/order.model.js";
import OrderManager from "../dao/classes/order.dao.js"
import TicketDTO from "../dto/ticket.dto.js";
import { v4 as uuidv4 } from 'uuid';
import UserManager from "../dao/classes/user.dao.js";

const orderManager = new OrderManager;
const productManager = new ProductManager;
const userManager = new UserManager;

export const addProductToOrderController = async (req, res) => {
    const { pid } = req.params;
    const sessionId = req.cookies.sessionId;
    const getOrderIdCookies = req.cookies.oid;

    try {

        const product = await productManager.getProductById(pid);
        
        if (!product) {
            return res.status(404).send({ status: 'error', message: 'Product not found' });
        }

        let order = await orderManager.getOrder(getOrderIdCookies)

        /* Valido que no exista una orden de compra pendiente */
        if (sessionId) {
            order = await orderManager.getPendingOrderByUserId(sessionId);
        }

        if (!order) {

            order = await orderModel.create({
                number: Date.now(),
                user: sessionId,
                products: [{ product: pid, quantity: 1 }],
                totalPrice: product.price,
                status: "pending"
            });

            res.cookie('oid', order._id, { httpOnly: true, secure: true });  

            
        } else {
                
            const existingProductIndex = order.products.findIndex(p => p.product.toString() === pid);
                
            if (existingProductIndex > -1) {
                order.products[existingProductIndex].quantity += 1;
            } else {
                order.products.push({ product: pid, quantity: 1 });
            }
            order.totalPrice += product.price;
        }

        /* Se asigna la orden al usuario */
        const user = await userManager.getUserById(sessionId);
        if (user) {
            user.lastOrderId = order._id;
            await user.save();
        }
        
        await order.save()
        

        res.status(200).send({ status: 'success', order });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

export const getOrderByIdController = async (req, res) => {
    const { oid } = req.params

    try {
        const order = await orderManager.getOrder(oid)
        res.status(200).send({ status: 'success', order });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}

export const endPurchase = async (req, res) => {
    const { oid } = req.params;

    try {
        if (!oid) {
            return res.status(404).send({ status: 'error', message: 'No order found' });
        }

        const order = await orderManager.getOrder(oid);
        if (!order) {
            return res.status(404).send({ status: 'error', message: 'Order not found' });
        }

        const newTicket = new TicketDTO({
            code: uuidv4(),
            purchase_datetime: Date.now(),
            orderId: oid,
            amount: order.totalPrice,
            purchaser: order.user
        });

        const ticket = await orderManager.endOrder(newTicket);

        /* Se guarda el ticket en el usuario */
        const user = await userManager.getUserById(order.user);
        if (user) {
            user.tickets.push(ticket._id);
            order.status = 'Ticket pending payment'
            await user.save();
            await order.save();
        }

        res.status(200).send({ status: 'success', ticket });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};