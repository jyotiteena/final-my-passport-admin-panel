const express = require('express')
const app = express()
exports.app = app
require('dotenv').config()
// const cookiParser = require('cookie-parser')
const PORT = process.env.PORT || 5000
const session = require('express-session');
const passport = require('passport')

const bodyParser = require('body-parser');
const authPassport = require('./config/passport')

authPassport(passport)

require('./config/db').dbconnect()
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/profile', express.static('uploads'))

app.use(bodyParser.urlencoded({ extended: false }));

//// cookie set
// app.use(cookiParser())

//// db connect
app.use(
    session({
        secret: 'secret2',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize())
app.use(passport.session())

//////////////// import routing files
const Category = require('./routes/category.route')
const Subcategory = require('./routes/subcategory.route')
const View = require('./routes/view.route')
const Admin = require('./routes/admin.route')
const Product = require('./routes/product.route')


//// routing
app.use('/', View)
app.use('/api/category', Category)
app.use('/api/subcategory', Subcategory)
app.use('/api/admin', Admin)
app.use('/api/product', Product)
app.listen(PORT, () => console.log(`Example app listening on PORT http://localhost:${PORT}`))