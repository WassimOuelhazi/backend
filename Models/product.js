const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please include the product name"],
//   },
  price: {
    type: String,
    required: [true, "Please include the product price"],
  },
//  image: {
//     type: String,
//     required: true,
//   },
estamp:{
  type: mongoose.Types.ObjectId,
  ref:"estamp",
},
efleur:{
  type: mongoose.Types.ObjectId,
  ref:"efleur",
},
producType:{
  type:String,
}
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;