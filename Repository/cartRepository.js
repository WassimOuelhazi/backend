const Cart = require("../Models/cart");
exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "estamp price total"
    });;
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
};
exports.removeItem = async data =>{
    const newCart= await Cart.deleteOne(data);
       return newCart
}
exports.updateCart = async data =>{
    const newCart = await Cart.updateOne(data);
    return newCart
}

exports.getcartById = async id => {
    const cart = await Cart.findById(id);
    return cart;
}
