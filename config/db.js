const { default: mongoose } = require('mongoose')

exports.dbconnect = () => {
    mongoose.connect('mongodb://localhost:27017/admin-panel-3-30')
        .then(() => console.log("db connected 👍"))
        .catch((err) => console.log(err))
}