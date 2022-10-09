const routerProduct = require("express").Router();
const productController = require("../Controllers/productController");
const passport=require("passport");
require("../middelwares/passportAuthantication").passport;
const upload = require("../")
//routerProduct.post("/createProduct",passport.authenticate("jwt",{session:false}),productController.createProduct);
routerProduct.post("/createProduct",productController.createProduct);
routerProduct.get("/getProduct", productController.getProducts);
routerProduct.get("/getProductById/:id", productController.getProductById);
 routerProduct.delete("/deleteProduct/:id", productController.removeProduct);
 routerProduct.put("/updateProduct/:id",productController.UpdateProduct)
module.exports = routerProduct;