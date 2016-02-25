var Node = require("node.js");

class MessageParser {
    constructor() {
        
    }
    
    getNode(msg) {
        var tokenArray = msg.split(' ');
        
        // caching
        var len = tokenArray.length;
        
        if(len < 1) {
            return null;
        }
        
        var first = new Node(tokenArray[0]);
        
        for(var i = 1;i < len;i++) {
            first.add(tokenArray[i]);
        }
        
        return first;
    }
}