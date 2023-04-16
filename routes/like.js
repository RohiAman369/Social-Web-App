const express = require('express');
const passport = require('passport');
const likeController = require('../controllers/like_controller');
const router = express.Router();

router.get('/toggle',passport.checkAuthentication,likeController.toggle);
router.get('/fetch-likes',likeController.fetch);

module.exports = router;