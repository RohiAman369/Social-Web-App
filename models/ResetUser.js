const mongoose = require('mongoose');
const ResetUserSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    email:{
        type:String,
        required:true,
    },
    accessToken:{
        type:String,
        required:true,
    },
    isValid:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true
})


const ResetUser = mongoose.model('ResetUser',ResetUserSchema);

module.exports = ResetUser;