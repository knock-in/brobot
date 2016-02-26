var Node = require("./node.js");
var BaseModule = require("./modules/basemodule.js");

class MessageParser {
    constructor() {

    }
    
    getLastNode(msg, callback) {
        
        // remove multiple whitespace
        while(msg.indexOf("  ") != -1) {
            msg = msg.replace("  ", " ");
        }
        
        var tokenArray = msg.split(' ');
        
        // caching
        var len = tokenArray.length;
        
        if(len < 1) {
            callback(null);
        }
        
        var first = new Node(tokenArray[0], function(token, node) {
            // TODO: module determination
            return new BaseModule(token, node);
        });
        
        for(var i = 1;i < len;i++) {
            first.add(tokenArray[i]);
        }
        
        first.getLast(callback);
    }
}

module.exports = MessageParser;