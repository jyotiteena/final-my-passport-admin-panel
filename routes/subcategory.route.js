const router = require('express').Router()
const Subcategory = require('../controllers/subcategory.controller')
router.post('/',Subcategory.store);
router.get("/:categoryId", Subcategory.singleSubCat);

module.exports = router