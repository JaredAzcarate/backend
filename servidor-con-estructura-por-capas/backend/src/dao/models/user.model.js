import mongoose from "mongoose";

const userCollection = 'usuarios'

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 100 },
    last_name: { type: String, required: true, max: 100 },
    address: { type: String, required: true, max: 100 },
    email: { type: String, required: true, unique: true, max: 40 },
    age: { type: Number },
    password: { type: String, required: true, max: 40 },
    lastOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        required: false
    },
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tickets",
        required: false
    }],
    role: { 
        type: String, 
        enum: ['user', 'admin'],
        default: 'user'
    }
});


const userModel = mongoose.model( userCollection, userSchema )

export default userModel