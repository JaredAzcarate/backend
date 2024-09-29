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
                status: 'in_process'
            });

            res.cookie('oid', order._id, { httpOnly: true });  

            
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
        
        res.redirect('/api/order/find-order/' + order._id);
        
        /* res.status(200).send({ status: 'success', order }); */
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

export const getOrderByIdController = async (req, res) => {
    const { oid } = req.params

    try {
        const order = await orderManager.getOrderAndProducts(oid)
        
        res.render('cart', { oid: order._id, products: order.products, totalPrice: order.totalPrice });

        /* res.status(200).send({ status: 'success', order }); */
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}

export const viewOrdersByUserController = async (req, res) => {
    const userId = req.user._id; // Asumimos que el id del usuario está en req.user.

    try {
        const orders = await orderManager.getOrdersByUserId(userId); // Método para obtener las órdenes del usuario.

        const pendingOrders = orders.filter(order => order.status === "Order pending payment");
        const completedOrders = orders.filter(order => order.status === "paid");

        res.render('orders', { pendingOrders, completedOrders }); // Renderizar la vista con las órdenes filtradas.
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

export const getAllTicketsByUserIdController = async (req, res) => {
    const {uid} = req.params;

    try {
        // Traigo todos los tickets del usuario
        const tickets = await orderManager.getAllTicketsByUserId(uid);

        // Filtrar los tickets entre pendientes de pago y pagos (según el estado en el ticket)
        const pendingTickets = tickets.filter(ticket => ticket.status === "pending_payment");
        const completedTickets = tickets.filter(ticket => ticket.status === "paid");

        // Renderizar la vista de tickets con los tickets filtrados
        res.render('tickets', { pendingTickets, completedTickets });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', message: 'Error al obtener los tickets del usuario' });
    }
};

export const viewCheckOutByUserIdController = async (req, res) => {
    const userId = req.user.id; 

    try {
        const user = await userManager.getUserById(userId);
        
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        const userPlain = user.toObject();

        const pendingOrders = await orderManager.getPendingOrderByUserIdLean(userId);
        const orders = pendingOrders ? [pendingOrders] : [];

        res.render('checkout', { orders, user: userPlain });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', message: error.message });
    }
}

export const goToCheckoutController = async (req, res) => {
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
            order.status = 'Order pending payment'
            await user.save();
            await order.save();
        }

        res.redirect('/api/order/checkout/' + user._id);
        /* res.status(200).send({ status: 'success', ticket }); */
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

export const removeProductFromOrderController = async (req, res) => {
    const { pid } = req.params;
    const oid = res.locals.oid;

    try {
        if (!oid) {
            return res.status(404).send({ status: 'error', message: 'No order found' });
        }

        const updatedOrder = await orderManager.removeProductById(oid, pid);
        res.redirect('/api/order/find-order/' + updatedOrder._id);
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

export const confirmPurchaseController = async (req, res) => {
    const { oid } = req.params; // ID de la orden que se está confirmando
    const sessionId = req.cookies.sessionId; // ID de sesión del usuario

    try {
        if (!oid) {
            return res.status(404).send({ status: 'error', message: 'No order found' });
        }

        const order = await orderManager.getOrder(oid);
        if (!order) {
            return res.status(404).send({ status: 'error', message: 'Order not found' });
        }

        // Actualizar el estado de la orden a "in process"
        order.status = "in_process";
        await order.save();

        // Asociar la última orden al usuario
        const user = await userManager.getUserById(sessionId);
        if (user) {
            user.lastOrderId = order._id; // Guardar la última orden
            await user.save();
        }

        res.redirect('/api/order/checkout/' + user._id); // Redirigir al checkout o a la vista de órdenes
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

export const sendPurchaseController = async (req, res) => {
    const { oid } = req.params;

    try {
        if (!oid) {
            return res.status(404).send({ status: 'error', message: 'No order found' });
        }

        const order = await orderManager.getOrder(oid);
        if (!order) {
            return res.status(404).send({ status: 'error', message: 'Order not found' });
        }

        // Generar ticket solo aquí
        const newTicket = new TicketDTO({
            code: uuidv4(),
            purchase_datetime: Date.now(),
            orderId: oid,
            amount: order.totalPrice,
            purchaser: order.user,
            status: "pending_payment"
        });

        const ticket = await orderManager.endOrder(newTicket);

        // Se guarda el ticket en el usuario
        const user = await userManager.getUserById(order.user);
        if (user) {
            user.tickets.push(ticket._id);
            await user.save();
        }

        order.status = "processed";

        await order.save();

        // Redirigir a la página de órdenes
        res.redirect('/api/users/profile/tickets/' + user._id);
        
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

