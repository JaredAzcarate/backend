import mongoose from "mongoose";

const userCollection = 'usuarios'

const userSchema = new mongoose.Schema({
    nombre: {type: String, require: true, max: 100},
    apellido: {type: String, require: true, max: 100},
    email: {type: String, require: true, max: 40},
})

const userModel = mongoose.model( userCollection, userSchema )

export default userModel