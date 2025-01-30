const { Schema, model } = require("mongoose");

const productSchema = new Schema({
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
const Product = model('Product', productSchema)
module.exports = Product