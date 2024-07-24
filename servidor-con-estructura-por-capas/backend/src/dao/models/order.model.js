import mongoose from "mongoose"

const orderCollection = 'orders'

const orderSchema = new mongoose.Schema({
    number: Number,
    user: String,
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products"
        },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, default: 0},
    status: { type: String, default: "pending"}

})

const orderModel = mongoose.model(orderCollection, orderSchema);

export default orderModel;