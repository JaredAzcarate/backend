import OrderManager from "../dao/orderManager.js";
import { v4 as uuidv4 } from 'uuid';

const orderManager = new OrderManager();

export const addProductToOrderController = async (req, res) => {
    const { pid } = req.params;
    const sessionId = req.cookies.sessionId;
    let orderInCookies = req.cookies.oid;

    try {

        if (!orderInCookies) {
            orderInCookies = uuidv4(); /* Generar un nuevo oid */
            res.cookie('oid', orderInCookies, { httpOnly: true, secure: true });  
            return orderInCookies
        } 
           
        let order = await orderManager.addProductToOrder(sessionId, pid, orderInCookies);

        
        res.status(200).send({ status: 'success', order });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};
