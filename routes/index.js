const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./user'));
router.use('/api',require('./api'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./like'));
module.exports = router;