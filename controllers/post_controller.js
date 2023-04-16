const Post = require('../models/Post');
const Comment = require('../models/Comment');
module.exports.renderCreate = function(req,res){
    return res.render('create_post',{
        title:'Create Post',
        genre:'headFoot'
    })
}


module.exports.createPost = async function(req,res){
    try{
        console.log(req.body);
        let post = await Post.create({
            title:req.body.title,
            content:req.body.content,
            user:req.user._id
        });
        console.log('Post created successfully ');
        return res.status(200).json({
            message:'Created'
        });
    }catch(err){
        console.log(`Error in creating the post ${err}`);
        return res.status(500).json({
            message:'Error',
            err:err
        })
    }
}

module.exports.fetchPost = async function(req,res){
    try{
        let allPost = await Post.find({});
        return res.status(200).json(allPost);
    } catch(err){
        console.log(`Error in fetching the post ${err}`);
        return res.status(500).json({
            message:'Internal Server Error'
        });
    }
}

module.exports.delete = async function(req,res){
    try{
        await Comment.deleteMany({post:req.query.id});
        await Post.findByIdAndDelete(req.query.id);
        return res.status(200).json({
            message:'Deleted'
        })

    }catch(err){
        console.log(`Error in deleting the post ${err}`);
        return res.status(500).json({
            message:'Internal Server Error'
        });
    }
}