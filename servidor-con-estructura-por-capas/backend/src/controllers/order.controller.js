import OrderManager from "../dao/orderManager.js";

const orderManager = new OrderManager();

export const addProductToOrderController = async (req, res) => {
    const { pid } = req.params;
    const { oid } = req.query;
    const sessionId = req.cookies.sessionId;

    try {
        let order;
        if (!oid) {
            
            oid = newOrder._id.toString();
            res.cookie('oid', oid, { httpOnly: true, secure: true });
            order = await orderManager.addProductToOrder(sessionId, pid, oid);
        } else {

            order = await orderManager.addProductToOrder(sessionId, pid, oid);
        }
        
        res.status(200).send({ status: 'success', order });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};
