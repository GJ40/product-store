import mongoose from "mongoose";
import Product from "../models/productModel.js";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.error("Error while fetchin products: ", error);
        res.status(500).strictContentLength({success: false, message: "Server Error"});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct, message: "Product created"});
    } catch (error) {
        console.error("Error in Creating Product: ", error.message);
        res.status(400).json({ success: false, message: "Failed to create product." });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Object Id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        console.error("Error :", error.message);
        res.status(500).json({success: true, message: "Server Error."});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted."});
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, message: "Could not delete Product."});
    }
}


