const { Schema, model } = require("mongoose");

const subCategorySchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    sub_category: {
        type: String,
        unique:true
    }
})
const Subcategory = model('Subcategory', subCategorySchema)
module.exports = Subcategory