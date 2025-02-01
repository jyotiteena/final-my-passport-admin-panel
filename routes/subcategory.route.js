const router = require('express').Router()
const Subcategory = require('../controllers/subcategory.controller')
router.post('/',Subcategory.store);
router.get('/:id',Subcategory.trash)
router.post('/:id',Subcategory.update)

module.exports = router