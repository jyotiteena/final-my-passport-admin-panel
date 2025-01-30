const Subcategory = require("../models/subCategory.model")

exports.store = async (req, res) => {
    await Subcategory.create(req.body)
    res.redirect('/addSubCategory')
}

exports.trash = async (req, res) => {
    const id = req.paras.id;
    await Subcategory.findOneAndDelete(id)
}

exports.singleSubCat = async (req, res) => {
    try {
        
        const subcategories = await Subcategory.find({ category: req.params.categoryId });
        console.log(subcategories)
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ error: "Error fetching subcategories" });
    }
}