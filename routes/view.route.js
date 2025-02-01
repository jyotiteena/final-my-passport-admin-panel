const router = require('express').Router()
const Admin = require('../models/admin.model')
const Category = require('../models/category.model')
const categoryModel = require('../models/category.model')
const Product = require('../models/product.model')
const Subcategory = require('../models/subCategory.model')
const isAuthenticated = require('../utils/loginMiddleware')



router.get('/', isAuthenticated, (req, res) => {
    res.render('pages/index')
})

router.get('/addCategory', isAuthenticated, (req, res) => {
    res.render('pages/addCategory')
})

router.get('/viewCategory', isAuthenticated, async (req, res) => {
    const category = await categoryModel.find()
    res.render('pages/viewCategory', { category })
})

router.get('/updateCategory', isAuthenticated, async (req, res) => {
    const { id } = req.query
    const category = await categoryModel.findById(id)
    res.render('pages/updateCategory', { category })
})

router.get('/register', (req, res) => {
    res.render('pages/register')
})

router.get('/login', (req, res) => {
    res.render('pages/login')
})

router.get('/logout', isAuthenticated, (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})

router.get('/myprofile', isAuthenticated, async (req, res) => {
    const singleAdmin = await Admin.findOne({ email: req.user.email })
    res.render('pages/myProfile', { admin: singleAdmin })
})


//// subcategory
router.get('/addSubcategory', isAuthenticated, async (req, res) => {
    const categories = await Category.find()
    res.render('pages/addSubcategory', { categories })
})


router.get('/viewSubCategory', isAuthenticated, async (req, res) => {
    try {
        const records = await Subcategory.find().populate('category');
        res.render('pages/viewSubCategory', { records })

    } catch (error) {
        console.log(error)
    }
})


router.get('/addProduct', isAuthenticated, async (req, res) => {
    try {
        const categories = await Category.find();
        let subcategories = [];

        // If a category is selected, fetch its subcategories
        if (req.query.categoryId) {
            subcategories = await Subcategory.find({ category: req.query.categoryId });
        }

        res.render("pages/addProduct", { categories, subcategories, selectedCategory: req.query.categoryId || "" });
    } catch (error) {
        res.status(500).send("Error loading categories and subcategories");
    }
});

router.get('/viewProduct', isAuthenticated, async (req, res) => {
    try {
        const records = await Product.find().populate('category').populate('sub_category');

        res.render('pages/viewProduct', { records })

    } catch (error) {
        console.log(error)
    }
})


module.exports = router