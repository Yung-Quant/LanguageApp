var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  knownLangs: Array,
  interestLangs: Array,
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