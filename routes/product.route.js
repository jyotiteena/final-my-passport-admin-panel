const router = require('express').Router()
const upload = require('../config/upload')
const Product = require('../controllers/product.controller')
router.post('/', upload.single('p_image'), Product.store)

module.exports = router