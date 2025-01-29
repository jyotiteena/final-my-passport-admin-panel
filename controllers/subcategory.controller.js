const Subcategory = require("../models/subCategory.model")

exports.store = async(req,res)=>{
    await Subcategory.create(req.body)
    res.redirect('/addSubCategory')
}