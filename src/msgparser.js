const Node = require('./node.js');
const ModuleMapper = require('./modules');

/**
 * The Messageparser proceeds every incoming message
 */
class MessageParser {
  /**
   * Messageparser constructor
   */
  constructor() {
    this.moduleMapper = new ModuleMapper();
  }

  /**
   * Parse incoming message and calls callback with last node
   * @param {Object} msg
   * @param {lastNodeCallback} callback - Callback for last node
   */
  getLastNode(msg, callback) {
    // remove multiple whitespace
    let text = msg.text;
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
      const Module = this.moduleMapper.map(token);

      // Node data is an instance of found module
      node.data = new Module(msg, token, node);
    });

    for (let i = 1; i < len; i++) {
      first.addLast(tokenArray[i]);
    }

    first.getLast(callback);
  }
}

/**
 * Last Node callback
 * @callback lastNodeCallback
 * @param {Node} node - Last node which contains the token and module.
 */
module.exports = MessageParser;
