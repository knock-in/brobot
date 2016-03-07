var Node = require("./node.js");
var ModuleMapper = require("./modules");
var BaseModule = require("./modules/basemodule.js");

class MessageParser {
    constructor() {
        this.moduleMapper = new ModuleMapper();
    }
    
    getLastNode(msg, callback) {
        
        // remove multiple whitespace
        var text = msg.text;
        while(text.indexOf("  ") != -1) {
            text = text.replace("  ", " ");
        }
        
        var tokenArray = text.split(' ');
        
        var len = tokenArray.length;
        
        if(len < 1) {
            // No tokens to process
            callback(null);
            return;
        }
        
        var first = new Node(msg, tokenArray[0], null, null, (msg, token, node) => {
            var Module = this.moduleMapper.map(token);
            node.data = new Module(token, node, msg);
        });
        
        for(var i = 1;i < len;i++) {
            first.add(tokenArray[i]);
        }
        
        first.getLast(callback);
    }
}

module.exports = MessageParser;