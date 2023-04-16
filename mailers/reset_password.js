const nodemailer = require('../config/nodemailer');
require('dotenv').config();

module.exports.resetPassword = (resetUser)=>{
    console.log('Inside the reset password ..');
    let htmlString = nodemailer.renderTemplate({resetUser:resetUser},'/reset_password/reset_pass.ejs');
    nodemailer.transporter.sendMail({
        from:process.env.EMAIL_USERNAME,
        to:resetUser.email,
        subject:'Reset Password || Amylan Social Web',
        html:htmlString,
    },function(err,info){
        if(err){console.log('Error in creating the mail for reset Pass word ',err); return;}
        console.log('message Sent', info);
        return;
    });
}