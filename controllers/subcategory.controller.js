const Subcategory = require("../models/subCategory.model")

exports.store = async (req, res) => {
    try {
        await Subcategory.create(req.body)
        res.redirect('/addSubCategory')
    } catch (error) {
        console.log(error)
    }
}

exports.trash = async (req, res) => {
    try {
        const id = req.params.id;
        await Subcategory.findOneAndDelete(id)
        res.redirect('/viewSubcategory')
    } catch (error) {
        console.log(error)
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, sub_category } = req.body
        const update = await Subcategory.findByIdAndUpdate(
            { _id: id },
            { category, sub_category }
        )
        if (update) {
            res.redirect('/viewSubcategory')
        }
    } catch (error) {
        console.log(error)
    }
}
