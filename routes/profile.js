var router = require('express').Router();
var auth = require('../config/auth.js');

router.get('/', auth.facebook.ensureAuthenticated, function(req, res) {
    res.render('profile', { user: req.user });
});

module.exports = router;