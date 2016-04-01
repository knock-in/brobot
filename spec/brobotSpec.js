var MessageParser = require("../dist/msgparser.js");
var assert = require('assert');

var msgparser = new MessageParser();


describe("Message parser test suite", function() {
    var msg = {};
    
    msg.text = "bro, are you okay?";
    var lastNode;
    
    msgparser.getLastNode(msg, function(node) {
        lastNode = node;
    });
    
    it("Last node should not be undefined", function() {
        assert.notEqual(lastNode, undefined);
    });
    
    it("Last node data should not be undefined", function() {
        assert.notEqual(lastNode.getData(), undefined);
    });
    
    it("Last node token is `okay?`", function() {
        assert.equal(lastNode.getData().token, 'okay?');  
    });
});