const Product = require("../models/product.model");
const path = require('path')
const fs = require('fs')
exports.store = async (req, res) => {
    try {
        const { category, sub_category, p_name, p_price } = req.body;
        console.log(req.body)
        const existProduct = await Product.findOne({ p_name }).countDocuments();
        if (existProduct > 0) {
            res.json({
                success: true,
                message: "product Already Exist",
            });
        } else {
            await Product.create({ category, sub_category, p_name, p_price, p_image: req?.file?.filename });
            res.redirect("/viewProduct");
        }
    } catch (error) {
        res.json(error);
    }
}

exports.trash = async (req, res) => {
    try {
        const id = req.params.id;

        ///// get single product for unlink image
        const singleProduct = await Product.findById(id);
        if (singleProduct) {
            const singleImage = path.join(__dirname, "../uploads/product", singleProduct.p_image)
            fs.unlink(singleImage, async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    const product = await Product.findByIdAndDelete(id)
                    if (product) {
                        res.redirect('/viewProduct')
                    }
                }
            })
        }


    } catch (error) {
        console.log(error)
    }
}