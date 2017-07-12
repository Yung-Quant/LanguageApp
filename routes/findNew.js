var router = require('express').Router();
var Users = require('../models/users');
var auth = require('../config/auth.js');


router.get('/', auth.facebook.ensureAuthenticated, function(req, res){
    user = req.user._doc;
    //check for users who know the langs that the requester s interested in
    Users.find({interestLangs: {"$in": user.knownLangs}}, function(err, docs){
        if(err) throw err;
        else{
            res.render('findNew', {results: docs, user: user});
            
        }
    });
});

module.exports = router;