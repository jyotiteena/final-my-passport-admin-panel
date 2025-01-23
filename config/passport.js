const Admin = require('../models/admin.model');
const { hashToPlain } = require('../utils/password');

const LocalStrategy = require('passport-local').Strategy

module.exports = function (passport) {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
          const user = await Admin.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'No user found' });
          }
  
          // const isMatch = await user.matchPassword(password);
          const isMatch = await hashToPlain(password, user.password)
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
          }
  
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      })
    );
  
  
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  
    passport.deserializeUser(async (id, done) => {
      try {
        const user = await Admin.findById(id);
        done(null, user);
      } catch (err) {
        done(err);
      }
    });
  };