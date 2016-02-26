var Node = require("./node.js");
var ModuleMapper = require("./modules");
var BaseModule = require("./modules/basemodule.js");

class MessageParser {
    constructor() {
        this.moduleMapper = new ModuleMapper();
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
        
        var first = new Node(tokenArray[0], this.moduleMapper, function(token, node, mapper) {
            // TODO: module mapping
            var Module = mapper.map(token);
            node.data =  new Module(token, node);
        });
        
        for(var i = 1;i < len;i++) {
            first.add(tokenArray[i]);
        }
        
        first.getLast(callback);
    }
}

module.exports = MessageParser;