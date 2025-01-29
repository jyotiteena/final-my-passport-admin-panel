const router = require('express').Router()
const Product = require('../controllers/product.controller')
router.post('/',Product.store)

module.exports = router