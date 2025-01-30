const Subcategory = require("../models/subCategory.model")

exports.store = async (req, res) => {
    await Subcategory.create(req.body)
    res.redirect('/addSubCategory')
}

exports.trash = async (req, res) => {
    const id = req.paras.id;
    await Subcategory.findOneAndDelete(id)
}
