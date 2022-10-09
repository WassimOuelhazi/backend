const Product = require("../Models/product");
exports.products = async () => {
    const products = await Product.find().sort({_id:"desc"}).populate({
        path: "estamp",
        model: "estamps"
    }).populate({
        path: "efleur",
        model: "efleur"
    });;
    return products;
};
exports.productById = async id => {
    const product = await Product.findById(id).populate({
        path: "estamp",
        model: "estamps"
    }).populate({
        path: "efleur",
        model: "efleur"
    });;
    return product;
}
exports.createProduct = async payload => {
    const newProduct = await Product.create(payload);
    return newProduct
}
exports.removeProduct = async id => {
    const product = await Product.findByIdAndRemove(id);
    return product
}
exports.updateProduct = async (id,data )=>{
    const product = await Product.findByIdAndUpdate(id,data).exec();
    return product
}