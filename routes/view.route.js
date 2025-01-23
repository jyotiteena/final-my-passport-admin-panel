const router = require('express').Router()
const Admin = require('../models/admin.model')
const categoryModel = require('../models/category.model')
const isAuthenticated = require('../utils/loginMiddleware')



router.get('/', isAuthenticated, (req, res) => {
    res.render('pages/index')
})

router.get('/addCategory', isAuthenticated, (req, res) => {
    res.render('pages/addCategory')
})

router.get('/viewCategory',isAuthenticated,  async (req, res) => {
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
    const singleAdmin = await Admin.findOne({ email:req.user.email })
    res.render('pages/myProfile',{admin:singleAdmin})
})

module.exports = router