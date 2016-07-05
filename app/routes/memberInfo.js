var express = require('express');
var router = express.Router();
var memberInfoService = require('../services/memberInfo.js');

// GET method route for projects
router.get('/', memberInfoService.memberInfoHandler);

module.exports = router;
