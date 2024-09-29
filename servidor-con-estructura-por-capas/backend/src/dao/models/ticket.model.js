import mongoose from "mongoose";

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true },
    purchase_datetime: { type: Date, required: true },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        required: true
    },
    amount: { type: Number, required: true },
    purchaser: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: { type: String, default: "pending_payment"}
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;
