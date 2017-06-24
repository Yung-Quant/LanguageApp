var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  knownLangs: Array,
  interestLangs: Array,
  newUser: Boolean, //check if first time visiting site, if true redirects them to a page to fill out info
  location: String,
  bio: String,
  age: String,
  matches: 
  [
      {
        matchId: String, //id of user who they've matched with
        convoKey: String
      }
  ],
  facebook: {
    id: String,
    token: String
  }
});

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;