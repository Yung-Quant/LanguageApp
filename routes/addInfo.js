var express = require('express');
var router = express.Router();
var auth = require('../config/auth.js');
var Users = require('../models/users');

router.get('/', function(req, res){
    res.render('info', {user: req.user});
});

router.post('/submit', auth.facebook.ensureAuthenticated, function(req, res){
    console.log(req.body);
    Users.findOneAndUpdate({'facebook.id': req.user._doc.facebook.id},
    {$set: {location: req.body.location, age: req.body.age, bio: req.body.bio, knownLangs: req.body.knownlang, interestLangs: req.body.learnlang, newUser: false}},
    function(err,doc){
        if(err) throw err;
        else res.redirect('/profile');
     });
});

module.exports = router;