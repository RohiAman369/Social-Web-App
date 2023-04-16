const User = require('../../../models/User');
const jsonwebtoken = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password) {
            return res.redirect('back');
        }
        return res.status(200).json({
            message:'user found token generated keep it safe with you',
            token: jsonwebtoken.sign(user.toJSON(),'amylan',{expiresIn:'10000000'})
        });
    }catch(err){
        console.log('Error in finding the user jwt',err);
        return res.status(500).json({
            message:'unauthorized person !!! '
        })
    }
}