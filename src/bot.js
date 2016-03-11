var telegramBotApi = require('node-telegram-bot-api');
var MessageParser = require("./msgparser.js");

/** Brobot class */
class Brobot {
    /**
     * Creates a new instance of class Brobot.
     * @param {string} token - AppToken for your telegram bot. If you dont have one, talk to botfather.
     * @param {string} host - Host which the telegram api listens for new messages.
     * @param {number} port - Port which the telegram api listens for new messages.
     */
    constructor(token, host, port) {
        this.token = token;
        this.messageParser = new MessageParser();
        
        this.options = {
            webHook: {
                host: host,
                port: port
            }
        }
        
        this.bot = new telegramBotApi(this.token, this.options);
        this.bot.messageParser = this.messageParser;
    }
    
    /**
     * Adds a callback which is called everytime the telegram api recieves a message
     * @param {messageCallback} callback - The callback that for each message
     */
    start(callback) {
        this.bot.on('message', (msg) => {
            console.log(msg.text);
            this.messageParser.getLastNode(msg, function(node) {
                if(node == null) {
                    console.log('No nodes to process');
                    return;
                }
                
                // Possibility to pass other arguments with first parameter
                node.getData().execute([], callback);
            });
        });
    }
}

/**
 * Message Callback.
 * @callback messageCallback
 * @param {Object} msg - The untouched message we recieved from telegram.
 * @param {string} msg.text - The text of the message.
 * @param {string} msg.chat.id - Chat id which can be used for replys and so on.
 * @param {string[]} _args - Array of tokens returned from all modules of this message
 */

module.exports = Brobot;