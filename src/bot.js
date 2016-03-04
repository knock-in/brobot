var telegramBotApi = require('node-telegram-bot-api');
var MessageParser = require("./msgparser.js");
var StopWatch = require("timer-stopwatch");

class Brobot {
    constructor(token, host, port) {
        this.token = token;
        this.messageParser = new MessageParser();
        this.timer = new StopWatch();
        
        this.options = {
            webHook: {
                host: host,
                port: port
            }
        }
        
        this.bot = new telegramBotApi(this.token, this.options);
        this.bot.messageParser = this.messageParser;
    }
    
    start(callback) {
        this.bot.on('message', (msg) => {
            console.log(msg.text);
            this.messageParser.getLastNode(msg, function(node) {
                if(node == null) {
                    console.log('No nodes to process');
                    return;
                }
                
                node.getData().execute(callback);
            });
        });
    }
}

module.exports = Brobot;