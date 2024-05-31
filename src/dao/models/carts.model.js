import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
  products: [
        {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'products'
            }
        }
    ]
});

cartsSchema.pre('find', function() {
  this.populate('products.product');
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
