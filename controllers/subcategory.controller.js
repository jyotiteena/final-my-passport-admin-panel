const Subcategory = require("../models/subCategory.model")

exports.store = async (req, res) => {
    try {
        const { category, sub_category } = req.body;
        const existSubcat = await Subcategory.findOne({ category, sub_category }).countDocuments().exec()
        if (existSubcat > 0) {
            res.json("already exist")
        } else {
            await Subcategory.create(req.body)
            res.redirect('/addSubCategory')
        }

    } catch (error) {
        console.log(error)
    }
}

exports.trash = async (req, res) => {
    try {
        const id = req.params.id;
        await Subcategory.findByIdAndDelete(id)
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

