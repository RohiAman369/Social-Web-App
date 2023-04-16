const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social-application-dev');
const db = mongoose.connection;

db.on('err',console.error.bind('console','Error on connecting with the database' ));

db.once('open',()=>{
    console.log('Successfully connected with the database mongoDB ;)');
})

module.exports  = db;