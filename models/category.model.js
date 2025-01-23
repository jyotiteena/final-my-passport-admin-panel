const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  cat_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
},
{
    timestamps:true
});

const Category = model('Category',categorySchema);
module.exports = Category
