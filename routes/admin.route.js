const router = require("express").Router();
const Admin = require('../controllers/admin.controller');
const upload = require("../middleware/upload");
const passport = require('passport')

router.post('/register', Admin.register)
// router.post('/login',Admin.login)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))
router.post('/updateprofile', upload.single('admin_profile'), Admin.updateProfile)
module.exports = router