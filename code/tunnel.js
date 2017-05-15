var config = require("../config.js");
var localtunnel = require('localtunnel');

module.exports = {
    start: function() {
        var tunnel = localtunnel(config.port, function(err, tunnel) {
            if (err) {
                console.error("Tunnel error: " + err);
            }
            else {
                console.log("Tunnel URL: " + tunnel.url);
            }
        });

        tunnel.on('close', function() {
            console.log("Tunnel " + tunnel.url + " closed");
        });
    }
}
