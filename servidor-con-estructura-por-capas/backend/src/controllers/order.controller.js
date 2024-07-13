import ProductManager from "../dao/classes/product.dao.js";
import orderModel from "../dao/models/order.model.js";
import OrderManager from "../dao/classes/order.dao.js"

const orderManager = new OrderManager;
const productManager = new ProductManager

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
