const { Schema, model } = require("mongoose");

const subCategorySchema = new Schema({
    category: {
        type: Schema.ObjectId,
        ref: "Category"
    },
    sub_category: {
        type: Schema.ObjectId,
        ref: "Subcategory"
    },
    p_name: String,
    p_price: Number
})
const Product = model('Subcategory', subCategorySchema)
module.exports = Product