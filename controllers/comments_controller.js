const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports.createComment = async function(req,res){
    try{
        let commentable;
        if(req.query.type=="Post"){
            commentable = await Post.findById(req.query.id);
        } else commentable = Comment.findById(req.query.id);
        if(!commentable) return res.redirect('back');
        let comment = await Comment.create({
            content:req.body.content,
            user:req.user._id,
            commentable:req.query.id,
            onModel:req.query.type
        });
        commentable.comments.push(comment);
        commentable.save();
        console.log('Comment Created Successfully');
        return res.status(200).json({
            message:'Comment created'
        })
    }catch(err){
        console.log(`Eror in creating the comments ${err}`);
        return res.status(500).json({
            message:'Internal server Error',
            Error:err
        })
    }
}


module.exports.fetchComments = async function(req,res){
    try{
        let post = await Post.findById(req.query.id)
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        return res.status(200).json(post.comments);

    }catch(err){
        console.log(`Error in fetching the comments for the particular post ${err}`);
        return res.status(500).json({
            message:'Interval Server Error'
        });
    }
}

module.exports.delete = async function(req,res){
    try{
        let comment = await Comment.findById(req.query.id);
        let post = await  Post.findById(comment.commentable);
        if(comment.user == req.user.id || post.user == req.user.id){
            let postId = post.id;
            await Post.findByIdAndUpdate(postId,{$pull:{comments : req.query.id}});
            comment.remove();
            return res.status(200).json({
                message:'Deleted this Comment'
            });
        }else {
            return res.status(401).json({
                message:'User not verified'
            })
        }


    }catch(err){
        console.log('Error in delteing the post',err);
        return res.status(500).json({
            message:'Error in delteing the post',
            Error:err
        });
    }
}