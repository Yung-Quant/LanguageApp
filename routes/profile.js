var router = require('express').Router();
var auth = require('../config/auth.js');
var Users = require('../models/users');

router.get('/', auth.facebook.ensureAuthenticated, function(req, res) {
    Users.findOne({'facebook.id': req.user._doc.facebook.id}, function(err, doc){
        if(err) throw err;
        if(doc._doc.newUser == true){
            res.render('info', {user: req.user});
        }
        else{
            res.render('profile', { user: req.user });
        }
    })    
});

router.post('/addInfo', auth.facebook.ensureAuthenticated, function(req, res){
    Users.findOneAndUpdate({'facebook.id': req.user._doc.facebook.id},
    {$set: {location: req.body.location, age: req.body.age, bio: req.body.bio, knownLangs: req.body.knownlang, interestLangs: req.body.learnlang, newUser: false}},
    function(err,doc){
        if(err) throw err;
        else res.redirect('/profile');
     });
});

module.exports = router;