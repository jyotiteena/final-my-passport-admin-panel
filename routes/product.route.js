const router = require('express').Router()
const upload = require('../config/upload')
const Product = require('../controllers/product.controller')
router.post('/', upload.single('p_image'), Product.store)
router.get('/:id', Product.trash)
router.post('/:id', upload.single('p_image'), Product.update)
module.exports = router