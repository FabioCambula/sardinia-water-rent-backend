const {Schema, model}= require('mongoose');
const orderSchema= new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    }],
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    booking:{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }
}, {
    timestamps: true,
})
module.exports= model('Order', orderSchema);
  