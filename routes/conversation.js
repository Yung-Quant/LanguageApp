var express = require('express');
var router = express.Router();
var auth = require('../config/auth.js');

router.get('/', auth.facebook.ensureAuthenticated, function(req, res, next) {
  res.render('conversation');
});

module.exports = router;