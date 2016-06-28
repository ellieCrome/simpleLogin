var express = require('express');
var router = express.Router();
var authenticateService = require('../services/authenticate.js');

// GET method route for projects
router.get('/', authenticateService.authenticateHandler);

module.exports = router;
