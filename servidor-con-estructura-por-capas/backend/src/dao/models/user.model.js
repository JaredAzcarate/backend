import mongoose from "mongoose";

const userCollection = 'usuarios'

const userSchema = new mongoose.Schema({
    first_name: {type: String, require: true, max: 100},
    last_name: {type: String, require: true, max: 100},
    email: {type: String, require: true, max: 40},
    age: {type: Number},
    password: {type: String, require: true, max: 40},
    cartId: [],
    role: {type: Number, default: 0}
})

const userModel = mongoose.model( userCollection, userSchema )

export default userModel