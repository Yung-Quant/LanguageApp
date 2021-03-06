var express = require('express');
var router = express.Router();
var auth = require('../config/auth.js');
var request = require('request')

router.get('/', auth.facebook.ensureAuthenticated, function(req, res, next) {
  res.render('conversation');
});

router.get('/define', function(req, res){
    var app_id = "8fc4d735";
    var app_key = "8c0bccdfc760398e314d8dda169a9312";
    var options = {
        url: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/' + 'en' + '/' + req.query.word,
        headers: {
            'app_id': app_id,
            'app_key': app_key
            }
        }
    request(options,function(EODreq, EODres){
        res.send(EODres);
    });    
});

module.exports = router;