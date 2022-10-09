const productRepository = require('../Repository/ProductRepository')
const  Estamp   = require ("../Models/estamp");
const estamp = require('../Models/estamp');
exports.createProduct = async (req, res) => {
    try {
        // let payload = {
        //     name: req.body.name,
        //     price: req.body.price,
        //     image: req.file.path
        // }
        let payload ={
            estamp:req.body.estamp,
            price: req.body.price,
            efleur:req.body.efleur,
            
            producType:req.body.producType

        }
        let product = await productRepository.createProduct({
            ...payload
        });
        console.log("estamps",payload.estamp)
        res.status(200).json({
            status: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getProducts = async (req, res) => {
    try {
        let products = await productRepository.products();
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getProductById = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.productById(id);
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
exports.removeProduct = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.removeProduct(id)
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
},
exports.UpdateProduct= async function (req, res) {
  // try {
    let id= req.params.id
    let productDetails= await productRepository.updateProduct(id, req.body)
    res.json({productDetails})
  }
 