var telegramBotApi = require('node-telegram-bot-api');
var MessageParser = require("./msgparser.js");

class Brobot {
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
    
    start(callback) {
        this.bot.on('message', function(msg) {
            console.log(msg.text);
            this.messageParser.getLastNode(msg.text, function(node) {
                if(node == null) {
                    return;
                }
               
                node.getData().execute(callback);
            });
        });
    }
}

var brobot = new Brobot('148601593:AAG4fs-T3bDtTny4qk7No-A9nkwZqXjJGPw', process.env.IP, process.env.PORT);
brobot.start(function(_args) {
    console.log(_args);
});