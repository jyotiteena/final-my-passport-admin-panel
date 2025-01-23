const Category = require("../models/category.model");

exports.store = async (req, res) => {
  try {
    const { cat_name } = req.body;
    const existCat = await Category.findOne({ cat_name }).countDocuments();
    if (existCat > 0) {
      res.json({
        success: true,
        message: "Category Already Exist",
      });
    } else {
      await Category.create({ cat_name });
      // res.json({
      //   success: true,
      //   message: "Category Added",
      // });
      res.redirect("/viewCategory");
    }
  } catch (error) {
    res.json(error);
  }
};

exports.trash = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.redirect("/viewCategory");
  } catch (error) {
    res.json(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndUpdate(
      {
        _id: id,
      },
      { cat_name: req.body.cat_name }
    );
    res.redirect("/viewCategory");
  } catch (error) {
    res.json(error);
  }
};
