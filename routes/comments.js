const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,commentController.createComment);
router.get('/fetch-comments',commentController.fetchComments);
router.delete('/delete',commentController.delete);

module.exports = router;