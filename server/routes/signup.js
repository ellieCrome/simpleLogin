var express = require('express');
var router = express.Router();
var signupService = require('../services/signup.js');

// GET method route for projects
router.get('/', signupService.signupHandler);

module.exports = router;
