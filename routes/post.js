const express = require('express');
const passport = require('passport');
const router = express.Router();
const postController = require('../controllers/post_controller');

router.get('/create-pg',postController.renderCreate);
router.post('/create',passport.checkAuthentication,postController.createPost);
router.get('/fetch-post',postController.fetchPost);
router.delete('/delete',postController.delete);

module.exports = router;