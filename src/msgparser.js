var Node = require("node.js");

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
        
        var first = new Node(tokenArray[0], function(data) {
            // TODO: module determination
            return data;
        });
        
        for(var i = 1;i < len;i++) {
            first.add(tokenArray[i]);
        }
        
        callback(first.getLast());
    }
}