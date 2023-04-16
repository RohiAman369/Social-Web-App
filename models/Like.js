const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    likable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel',
        required:true
    },
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }

},{
    timestamps:true
})

const Like = mongoose.model('Like',LikeSchema);

module.exports = Like;