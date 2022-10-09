const cartRepository = require('../Repository/cartRepository')
const productRepository = require('../Repository/ProductRepository');
exports.addItemToCart = async (req, res) => {
    console.log("here");
    productId = req.body.productId;
    console.log("hereEEE");
    const quantity = Number.parseInt(req.body.quantity);
    console.log("productId", productId)
    try {
        let cart = await cartRepository.cart();
        let productDetails = await productRepository.productById(productId);
        console.log("productDetails", productDetails)
        if (!productDetails) {

            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //--If Cart Exists ----
        if (cart) {
            //---- Check if index exists ----
            const indexFound = cart.items.findIndex(item => item.productId.id == productId);
            console.log("**************index**********", indexFound)
            if ((productDetails.producType) === "estamp") {
                // console.log("**************type**********",productDetails)
                console.log("**************Qantité disponible********", productDetails.estamp.QunatityEstampDisponible)
                console.log("***************Qantité demandée *********", quantity)
                if (quantity < productDetails.estamp.QunatityEstampDisponible) {
                    console.log("*****Qantité demandée estamp est accéptée vous pouvez continuer l'achat******")
                }
                //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
                if (indexFound !== -1 && quantity <= 0) {
                    cart.items.splice(indexFound, 1);
                    if (cart.items.length == 0) {
                        cart.subTotal = 0;
                    } else {
                        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
                else if (indexFound !== -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.items[indexFound].price = productDetails.price
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----Check if quantity is greater than 0 then add item to items array ----
                else if (quantity > 0 && quantity < productDetails.estamp.QunatityEstampDisponible) {
                    cart.items.push({
                        productId: productId,
                        quantity: quantity,
                        price: productDetails.price,
                        total: parseInt(productDetails.price * quantity)
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----If quantity of price is 0 throw the error -------
                else if (quantity > productDetails.estamp.QunatityEstampDisponible) {
                    return res.status(400).json({
                        type: "Invalid",
                        msg: "Invalid request"
                    })
                }
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process successful",
                    data: data
                })
            } else if ((productDetails.producType) === "efleur") {
                // console.log("**************type**********",productDetails)
                console.log("**************Qantité disponible********", productDetails.efleur.QunatityEfleurDisponible)
                console.log("***************Qantité demandée *********", quantity)
                if (quantity <= productDetails.efleur.QunatityEfleurDisponible) {
                    console.log("*****Qantité efleur demandée est accéptée vous pouvez continuer l'achat******")
                }
                //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------

                if (indexFound !== -1 && quantity <= 0) {
                    cart.items.splice(indexFound, 1);
                    if (cart.items.length == 0) {
                        cart.subTotal = 0;
                    } else {
                        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
                else if (indexFound !== -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.items[indexFound].price = productDetails.price
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----Check if quantity is greater than 0 then add item to items array ----
                else if (quantity > 0 && quantity < productDetails.efleur.QunatityEfleurDisponible) {
                    cart.items.push({
                        productId: productId,
                        quantity: quantity,
                        price: productDetails.price,
                        total: parseInt(productDetails.price * quantity)
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----If quantity of price is 0 throw the error -------
                else if (quantity > productDetails.efleur.QunatityEfleurDisponible) {
                    return res.status(400).json({
                        type: "Invalid",
                        msg: "Invalid request"
                    })
                }
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process successful",
                    data: data
                })
            }

            //------------ This creates a new cart and then adds the item to the cart that has been created------------
            else {

                const cartData = {
                    items: [{
                        productId: productId,
                        quantity: quantity,
                        total: parseInt(productDetails.price * quantity),
                        price: productDetails.price
                    }],
                    subTotal: parseInt(productDetails.price * quantity)
                }
                cart = await cartRepository.addItem(cartData)
                // let data = await cart.save();
                res.json(cart);
            }
        }//rim

    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
exports.getCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart()
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "Cart not Found",
            })
        }
        res.status(200).json({
            status: true,
            data: cart
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
exports.emptyCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart();
        cart.items = [];
        cart.subTotal = 0
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            mgs: "Cart has been emptied",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
exports.removeSingleProduct = async (req, res) => {


    idProd = req.params.id
    prodtoremove = await productRepository.productById(idProd)
    try {
        let cart = await cartRepository.cart();
        let productDetails = await productRepository.productById(idProd);
        console.log("prod", productDetails);
        const indexFound = cart.items.findIndex(item => item.productId.id == idProd);
        console.log("index", indexFound);
        if (indexFound !== -1) {
            cart.items.splice(indexFound, 1);
            if (cart.items.length == 0) {
                cart.subTotal = 0;
            } else {
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }

        } else {
            cart.items.splice(indexFound, 1);
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);

            cart = await cartRepository.removeItem(prodtoremove)
            // console.log("okk",cart.subTotal);
        }
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            mgs: "Item was removed from cart with success",
            data: data

        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

//function
exports.createCart = async (req, res) => {
    const cartData = req.body;
    cart = await cartRepository.addItem(cartData);
    // let data = await cart.save();
    res.json(cart);
}


//fin function
exports.updateCart = async (req, res) => {
    // const {
    //     productId
    // } = req.body;
    idProd = req.params.id
    console.log("id", idProd)
    const quantity = Number.parseInt(req.body.quantity);
    try {
        // console.log("kkk",quantity)
        let cart = await cartRepository.cart();

        let productDetails = await productRepository.productById(idProd);
        console.log("id", idProd)
        console.log("details", productDetails)
        console.log("quantity", quantity)

        const cartData = {
            items: [{
                productId: idProd,
                quantity: quantity,
                total: parseInt(productDetails.price * quantity),
                price: productDetails.price
            }],
            subTotal: parseInt(productDetails.price * quantity)
        }
        cart = await cartRepository.updateCart(cartData)
        res.json(cart);

    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}


//
exports.getCartById = async (req, res) => {
    try {
        let id = req.params.id;
        let cart = await cartRepository.getcartById(id);
        res.status(200).json({
            status: true,
            data: cart,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
