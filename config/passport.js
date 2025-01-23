const Admin = require('../models/admin.model');
const { hashToPlain } = require('../utils/password');

const LocalStrategy = require('passport-local').Strategy

module.exports = (passport) => {

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
     try {
       const admin = await Admin.findOne({ email });
       if (!admin) {
         return done(null, false, console.log("user not found"))
       }
 
       const match = await hashToPlain(password, admin.password);
       if (!match) {
         return done(null, false, console.log("password not match"))
       }
 
       done(null,admin)
     } catch (error) {
      console.log(error)
     }
    })
  )

  passport.serializeUser((admin, done) => {
    done(null, admin.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const admin = await Admin.findById(id);
      done(null, admin);
    } catch (err) {
      done(err);
    }
  });
};