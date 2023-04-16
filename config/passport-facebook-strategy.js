const passport = require('passport');
const fbStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const crypto = require('crypto');
require('dotenv').config();


passport.use( new fbStrategy({
        clientID:process.env.FB_CLIENT_ID,
        clientSecret:process.env.FB_CLIENT_SECRET,
        callbackURL:process.env.FB_CB,
        profileFields:['id','displayName','name','email','gender'],
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value},function(err,user){
            if(err){console.log('Error in finding the User ',err); return done(err);}
            if(user) {
                if(!user.fb_id){
                    User.findByIdAndUpdate(user.id,{fb_id:profile.id},function(err,inUser){
                        if(err){console.log('Error in updating the user fb ',err); return;}
                    })
                }
                return done(null,user);
            }
            else {
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                    fb_id:profile.id,
                },function(err,newUser){
                    if(err){console.log('Error in Creating the user',err); return;}
                    return done(null,newUser);
                });
            }
        })
    }
));

module.exports = passport;
