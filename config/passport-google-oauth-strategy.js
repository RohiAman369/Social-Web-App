const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');
require('dotenv').config();

passport.use(new googleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CB,
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value},function(err,user){
            if(err){console.log('Error in finding the User ',err); return done(err);}
            if(user) {
                if(!user.google_id){
                    User.findByIdAndUpdate(user.id,{google_id:profile.id},function(err,inUser){
                        if(err){console.log('Error in updating the user google ',err); return;}
                    })
                }
                return done(null,user);
            }
            else {
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                    google_id:profile.id,
                },function(err,newUser){
                    if(err){console.log('Error in Creating the user',err); return;}
                    return done(null,newUser);
                });
            }
        });
    }
));


module.exports = passport;