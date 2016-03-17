const telegramBotApi = require('node-telegram-bot-api');
const MessageParser = require('./msgparser.js');

/**
* Brobot class
* @extends telegramBotApi
*/
class Brobot extends telegramBotApi {
  /**
   * Creates a new instance of class Brobot.
   * @param {string} token - AppToken for your telegram bot.
   * @param {string} options - Host which the telegram api listens for new messages.
   * @param {Brobot~messageCallback} callback - The callback that for each message.
   */
  constructor(token, options, callback) {
    super(token, options);
    this.messageParser = new MessageParser();

    this.on('message', (msg) => {
      console.log(msg.text);

      this.messageParser.getLastNode(msg, (node) => {
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
