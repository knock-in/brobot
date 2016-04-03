var Brobot = require("../dist/brobot.js");
var assert = require('assert');

var brobot = new Brobot({});


describe("Module Tests", function() {
  var moduleTests = [];
  moduleTests.push({ module: 'base', msg: '123', expected: [123] });
  moduleTests.push({ module: 'base', msg: '31234.431', expected: [31234.431] });
  moduleTests.push({ module: 'base', msg: 'stringValue', expected: ['stringValue'] });
  moduleTests.push({ module: 'plus', msg: '+ 5 13', expected: [18] });
  moduleTests.push({ module: 'plus', msg: '+ 13 -5', expected: [8] });
  moduleTests.push({ module: 'minus', msg: '- 13 -7', expected: [20] });
  moduleTests.push({ module: 'minus', msg: '- 13 7', expected: [6] });
  moduleTests.push({ module: 'divide', msg: '/ 14 2', expected: [7] });
  moduleTests.push({ module: 'divide', msg: '/ 9 3', expected: [3] });
  moduleTests.push({ module: 'times', msg: '* 13 3', expected: [39] });
  moduleTests.push({ module: 'times', msg: '* 5 3', expected: [15] });
  moduleTests.push({ module: 'times', msg: '* 5 3', expected: [15] });
  moduleTests.push({ module: 'morse', msg: 'morse e MorseModuleTest', expected: ['-- --- .-. ... . -- --- -.. ..- .-.. . - . ... -'] });
  moduleTests.push({ module: 'morse', msg: 'morse d morse e MorseModuleTest', expected: ['morsemoduletest'] });
  moduleTests.push({ module: 'pi', msg: 'pi', expected: [3.141592653589793] });
  moduleTests.push({ module: 'rev', msg: 'rev hello world', expected: ['world', 'hello'] });
  moduleTests.push({ module: 'rrev', msg: 'rrev hello world', expected: ['olleh', 'dlrow'] });

  moduleTests.forEach(function(moduleTest) {
    it('Testing Module \'' + moduleTest.module + '\' with message \'' + moduleTest.msg + '\'', function() {
      var session = { message: { text: 'echo ' + moduleTest.msg } }

      brobot.sessionHandler(session, function(node) {
        // Just like brobot, the last instance is the bromodule
        node.addFirst('bro');
        node.getData().execute([], function(session, _args) {
          assert.deepEqual(_args, moduleTest.expected);
        });
      });
    });
  });  
});

describe('Node Tests', function() {
  var session = { message: { text: 'rrev rev ohai bro' } }
  brobot.sessionHandler(session, function(node) {
    it('Last Node should not be undefined', function() {
      assert.notEqual(node, undefined);
    });

    it('Last Node Data should not be undefined', function() {
      assert.notEqual(node.getData(), undefined);
    });

    it('Last Node token is \'bro\'', function() {
      assert.equal(node.getData().token, 'bro');
    });

    it('addFirst should add a new node to the first place', function() {
      node.addFirst('echo');
      node.getFirst(function(node) {
        assert.equal(node.getData().token, 'echo');
      });
    });
  });
});