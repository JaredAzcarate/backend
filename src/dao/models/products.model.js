import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title: { type: String, require: true, max:50 }, 
    description : { type: String, require: true }, 
    details : { type: String, require: true }, 
    price : { type: Number, require: true }, 
    status : { type: Boolean, require: true, default:true }, 
    category : { type: String, require: true, max:20 }, 
    image : { type: String, require: true }
});

productsSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;