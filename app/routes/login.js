var express = require('express');
var router = express.Router();
var loginService = require('../services/login.js');

// GET method route for projects
router.get('/', loginService.login);

module.exports = router;
