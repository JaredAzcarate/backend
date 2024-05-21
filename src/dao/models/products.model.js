import mongoose from 'mongoose';

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title: { type: String, require: true, max:50 }, 
    description : { type: String, require: true }, 
    code : { type: Number, require: true }, 
    price : { type: Number, require: true }, 
    status : { type: Boolean, require: true }, 
    stock : { type: Number, require: true }, 
    category : { type: String, require: true, max:20 }, 
    thumbnail : { type: String, require: true }
});

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;