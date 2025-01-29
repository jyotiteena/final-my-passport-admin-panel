const router = require('express').Router()
const Subcategory = require('../controllers/subcategory.controller')
router.post('/',Subcategory.store)

module.exports = router