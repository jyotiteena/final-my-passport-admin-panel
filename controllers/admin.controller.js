const Admin = require("../models/admin.model");
const { planToHash, hashToPlain } = require("../utils/password");

exports.register = async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;

        const existEmail = await Admin.findOne({ email: email }).countDocuments().exec()
        if (existEmail > 0) {
            res.json("email id already exist")
        } else {
            const hash = await planToHash(password)
            await Admin.create({ username, email, password: hash, confirm_password })
            res.redirect('/login')
        }
    } catch (error) {
        res.json(error)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    const existEmail = await Admin.findOne({ email }).countDocuments().exec()
    if (existEmail > 0) {
        const existUser = await Admin.findOne({ email })
        const match_pass = await hashToPlain(password, existUser.password)
        if (match_pass) {
            const payload = {
                username: existUser.username,
                email: existUser.email,
            }
            res.cookie('admin', payload, { httpOnly: true })
            res.redirect('/')
        } else {
            res.json("password not match")
        }
    } else {
        res.json("email id not exist")
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { email, username } = req.body;
        const existEmail = await Admin.findOne({ email }).countDocuments().exec()
        if (existEmail > 0) {
            await Admin.updateOne(
                {
                    email: email
                },
                {
                    username,
                    admin_profile: req?.file?.filename
                }
            )
            res.redirect('/myprofile')
        } else {
            res.json("email id not exist")
        }
    } catch (error) {
        res.json(error)
    }
}