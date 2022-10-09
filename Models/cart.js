const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
   /* productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },*/
    product_name: {
   type : String ,
        required:true
    },

    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})
const CartSchema = new Schema({
    items: [ItemSchema],
   user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('cart', CartSchema);