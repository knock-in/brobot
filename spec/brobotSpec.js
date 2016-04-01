var Brobot = require("../dist/brobot.js");
var assert = require('assert');

var brobot = new Brobot({});


describe("Message parser test suite", function() {
    var session = {message: {text: 'bro, are you okay?'}};
    
    var lastNode;
    
    brobot.sessionHandler(session, function(node) {
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