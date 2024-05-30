import mongoose from "mongoose";

const userCollection = 'usuarios'

const userSchema = new mongoose.Schema({
    name: {type: String, require: true, max: 100},
    lastname: {type: String, require: true, max: 100},
    email: {type: String, require: true, max: 40},
    password: {type: String, require: true, max: 40},
    role: {type: Number, default: 0}
})

const userModel = mongoose.model( userCollection, userSchema )

export default userModel