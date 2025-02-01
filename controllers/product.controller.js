const Product = require("../models/product.model");

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
    const id = req.params.id;

}