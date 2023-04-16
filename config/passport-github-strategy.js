const passport = require('passport');
const githubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
const crypto = require('crypto');
require('dotenv').config();

passport.use(new githubStrategy({
        clientID:process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_SECRET,
        callbackURL:process.env.GITHUB_CB
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value},function(err,user){
            if(err){console.log('Error in finding the github user',err); return;}
            if(user) {
                if(!user.github_id){
                    User.findByIdAndUpdate(user.id,{github_id:profile.id},function(err,inUser){
                        if(err){console.log('Error in updating the user github ',err); return;}
                    })
                }
                return done(null,user);
            }
            User.create({
                name:profile.displayName,
                email:emails[0].value,
                password:crypto.randomBytes(20).toString('hex'),
                github_id:profile.id,
            },function(err,newUser){
                if(err){console.log('Error in creating the new user ',err); return;}
                return done(null,newUser);
            });
        });
}));
module.exports = passport;