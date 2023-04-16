const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('./uploads/users/avatars');


const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    google_id:{
        type:String
    },
    fb_id:{
        type:String
    },
    github_id:{
        type:String
    }
},{
    timestamps:true
});

const Storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.filename+'-'+Date.now());
    }

});

UserSchema.statics.avatarUploaded = multer({storage:Storage}).single('avatar');
UserSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',UserSchema);
module.exports = User;