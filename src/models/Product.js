const { Schema, model } = require('mongoose');
const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
        min: 0,
        set: v => Math.round(v * 100) / 100,
    },
    stock:{
        type: Number,
        required: true,
        min: 0, 
    }},
    {
        timestamps: true,
    });
    module.exports = model('Product', productSchema);
