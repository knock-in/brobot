var Node = require("./node.js");
var BaseModule = require("./modules/basemodule.js");

class MessageParser {
    constructor() {
        
    }
    
    getLastNode(msg, callback) {
        var tokenArray = msg.split(' ');
        
        // caching
        var len = tokenArray.length;
        
        if(len < 1) {
            return null;
        }
        
        var first = new Node(tokenArray[0], function(data, node) {
            // TODO: module determination
            return new BaseModule(data, node);
        });
        
        for(var i = 1;i < len;i++) {
            first.add(tokenArray[i]);
        }
        
        first.getLast(callback);
    }
}

module.exports = MessageParser;