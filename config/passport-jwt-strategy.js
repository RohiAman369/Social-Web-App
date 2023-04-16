const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'amylan'
}

passport.use(new JWTStrategy(opts,function(payload,done){
    User.findById(payload._id,function(err,user){
        if(err){console.log('Error in Jwt '); return done(err);}
        if(!user){
            return done(null,false);
        }
        return done(null,user);
    });

}));
passport.serializeUser(function(user,done){
    done(null,user._id);
})
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){console.log('Error in deserializing the user',err); return done(err);}
        return done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;