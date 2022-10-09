
const routerCart = require("express").Router();
const cartController = require("../Controllers/cartController");
routerCart.post("/addItem", cartController.addItemToCart);
routerCart.post("/createCart", cartController.createCart);

routerCart.get("/getCart", cartController.getCart);
routerCart.delete("/empty-cart", cartController.emptyCart);
routerCart.delete("/removeSingleProduct/:id",cartController.removeSingleProduct)
routerCart.put("/updateCart/:id",cartController.updateCart)
routerCart.get("/getcartbyid/:id",cartController.getCartById)
module.exports = routerCart;