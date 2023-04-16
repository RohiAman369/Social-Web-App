const express = require('express');

const router = express.Router();
const apiController = require('../../../controllers/api/v1/user_api');
router.post('/log-in',apiController.createSession);

module.exports = router;