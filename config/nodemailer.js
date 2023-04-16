const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service:process.env.EMAIL_SERVICE,
    host:process.env.EMAIL_HOST,
    secure:false,
    port:process.env.EMAIL_PORT,
    auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASS
    }
});

let renderTemplate = function(data,relativePath){
    let mainHtml = '';
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('Error in rendering the email page ',err); return;}
            mainHtml = template;
        }
    )
    return mainHtml;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}