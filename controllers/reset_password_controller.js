const User = require('../models/User');
const ResetUser = require('../models/ResetUser');
const crypto  = require('crypto');
const resetPassMailer = require('../mailers/reset_password');
const queue = require('../config/kue');
const resetPassWorker = require('../Workers/resetPassword_worker');


module.exports.forgotPassword = function(req,res){
    return res.render('forgot_password',{
        title:'Reset Password',
        genre:'NoheadFoot'
    });
}

module.exports.settleResetUser = async function(req,res){
    try{
        let accessToken = crypto.randomBytes(20).toString('hex');
        let user = await User.findOne({email:req.body.email});
        if(!user) return res.redirect('/users/sign-in');
        let resetUser = await ResetUser.create({
            user:user.id,
            email:req.body.email,
            accessToken:accessToken,
            isValid:true
        });
        // Send mail now ...

        let job = queue.create('resetEmails',resetUser).save(function(err){
            if(err){console.log('Error in enqueing the email ',err); return;}
            console.log('job Enqueued 1',job.id);
        })
        resetPassMailer.resetPassword(resetUser);
        return res.redirect('/users/sign-in');
    }catch(err){
        console.log('Error in settleResetUser ',err);
        return res.redirect('/users/sign-in');
    }
}


module.exports.resetPasswordTemplate = async function(req,res){
    try{
        let resetUser = await ResetUser.findOne({accessToken:req.query.accessToken});
        if(!resetUser) {
            console.log('Reset User not found');
            return res.redirect('/users/forgot-password');
        }
        return res.render('reset_password',{
            title:'Reset Password',
            genre:'NoHeadFoot',
            resetUser:resetUser
        });
    }catch(err){
        console.log('Error in resetpass template ',err);
        return res.redirect('back');
    }
}
module.exports.resetCredentials = async function(req,res){
    if(req.body.password!=req.body.confirmPass) return res.redirect('back');
    try{
        let resetUser = await ResetUser.findOne({accessToken:req.query.accessToken});
        if(!resetUser) return res.redirect('/users/forgot-password');
        ResetUser.findByIdAndUpdate(resetUser.id,{isValid:false},function(err,rstUser){
            if(err) {console.log('Error in finding the resetUwser ',err); return;};
            console.log('**********updated');

        })
        User.findByIdAndUpdate(resetUser.user,{password:req.body.password},function(err,usr){
            if(err){console.log('Error in updating the user password ',err); return;}
            console.log('user updated');
            return res.redirect('/users/sign-in');
        });

    }catch(err){
        console.log('Error in resetpass template ',err);
        return res.redirect('back');
    }
}