const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const User = require('./models/User');
const passport = require('passport');
const session = require('express-session');
const jwtStrategy = require('./config/passport-jwt-strategy');
const googleStrategy = require('./config/passport-google-oauth-strategy');
const fbStrategy = require('./config/passport-facebook-strategy');
const githubStrategy = require('./config/passport-github-strategy');
const MongoStore = require('connect-mongo');
 




//  using the middleares

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./Assets'));


app.use(expressEjsLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(passport.initialize());
app.use(session({
    saveUninitialized:false,
    secret:'thisisthesecretkey',
    resave:false,
    cookie:{
        maxAge:(1000*100*60)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/social-application-dev',
        autoRemove:'disabled',
    })
}));
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));


app.listen(port,(err)=>{
    if(err){console.log('Error in loading the server '); return;}
    console.log('Successfully connected with the server on port : ',port);
})
