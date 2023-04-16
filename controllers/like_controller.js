const Like = require('../models/Like');
const Post = require('../models/Post');
const Comment = require('../models/Comment');


module.exports.toggle = async function(req,res){
    try{
        let like = await Like.findOne({likable:req.query.id,user:req.user.id});
        let likable;
        let Middle;
        if(req.query.type=='Post') {
            likable = await Post.findById(req.query.id);
            Middle = Post;
        }
        else {
            likable = await Comment.findById(req.query.id);
            Middle = Comment;
        }
        if(like){
            await Like.findByIdAndDelete(like.id);
            await Middle.findByIdAndUpdate(req.query.id,{$pull:{likes:like.id}});
            return res.status(200).json({
                status:false
            });
        } else {
            let newLike = await Like.create({
                user:req.user.id,
                likable:req.query.id,
                onModel:req.query.type
            });
            likable.likes.push(newLike);
            likable.save();
            return res.status(200).json({
                status:true
            });
        }
    }catch(err){
        console.log('Error',err);
        return res.status(500).json({
            status:false,
            message:'Internal Server Error'
        });
    }
}

module.exports.fetch = async function(req,res){
    try{
        let post = await Post.findById(req.query.id).populate('likes');
        // if(!post) {
        //     console.log('Coming');
        //     return res.status(404).json([]);
        // } else {
        console.log(post.likes);
        return res.status(200).json(post.likes);
        // }
    }catch(err){
        console.log('Error',err);
        return res.status(500).json({
            message:'Internal Server Error',
            Error:err
        });
    }
        
        
        
}