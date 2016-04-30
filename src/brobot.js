const builder = require('botbuilder');
const ModuleMap = require('./modules');
const Node = require('./node.js');

/**
* Brobot class
* @extends BotConnectorBot
*/
class Brobot extends builder.BotConnectorBot {
  /**
   * Creates a new instance of class Brobot.
   * @param {Object} options - Options for botconnector.
   * @param {Brobot~messageCallback} callback - Callback for each message.
   */
  constructor(options, callback) {
    super(options);
    this.debugLog = false;

    this.moduleMap = new ModuleMap();

    this.add('/', (session) => {
      if(this.debugLog) {
        console.log(session.message.text);
      }

      this.sessionHandler(session, (node) => {
        if (node === null) {
          console.log('No nodes to process');
          return;
        }

        // Last instance before user gets response
        node.addFirst('bro');

        // Possibility to pass other arguments with first parameter
        node.getData().execute([], callback);
      });
    });
  }

  sessionHandler(session, callback) {
    // remove multiple whitespace
    let text = session.message.text;
    while (text.indexOf('  ') !== -1) {
      text = text.replace('  ', ' ');
    }

    // Split at whitespace and store in tokenArray
    const tokenArray = text.split(' ');

    // Store token array length
    const len = tokenArray.length;

    // Check if there are tokens to proceed by checking token array length
    if (len < 1) {
      // No tokens so call callback with null as argument
      callback(null);
      return;
    }

    // First node
    const first = new Node(tokenArray[0], null, null, (token, node) => {
      // Find module according to token
      const Module = this.moduleMap.get(token);

      // Node data is an instance of found module
      node.data = new Module(session, token, node);
    });

    // Iterate through every token, except first one
    for (let i = 1; i < len; i++) {
      // Add to linked list
      first.addLast(tokenArray[i]);
    }

    // Call recursive function getLast with callback as argument
    first.getLast(callback);
  }
}

/**
 * Message Callback.
 * @callback Brobot~messageCallback
 * @param {} msg - The untouched message we recieved from telegram.
 * @param {string} msg.text - The text of the message.
 * @param {string} msg.chat.id - Chat id which can be used for replys and so on.
 * @param {string[]} _args - Array of tokens returned from all modules of this message
 */

module.exports = Brobot;
