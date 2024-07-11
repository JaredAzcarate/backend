import mongoose from 'mongoose';

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 50 }, 
    description: { type: String, required: true }, 
    details: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    status: { type: Boolean, required: true, default: true }, 
    category: { type: String, required: true, maxlength: 20 }, 
    image: { type: String, required: true }
});

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;