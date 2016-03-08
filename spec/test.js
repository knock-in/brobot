var MessageParser = require("../dist/msgparser.js");
var msgparser = new MessageParser();


describe("Message Parser test suite", function() {
    var msg = {};
    
    msg.text = "bro, are you okay?";
    var lastNode;
    
    msgparser.getLastNode(msg, function(node) {
        lastNode = node;
    });
    
    it("Last Node is not null", function() {
        expect(lastNode).not.toBeNull();
    });
    
    it("Data of Last Node is not null", function() {
        expect(lastNode.getData()).not.toBeNull();
    });
    
    it("Node Token is `Welt`", function() {
        expect(lastNode.getData().token).toMatch('okay?');  
    });
   
});