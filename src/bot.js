const telegramBotApi = require('node-telegram-bot-api');

class Brobot {
    constructor(token, host, port, start) {
        this.token = token;
        this.messageParser = new MessageParser();
        
        this.options = {
            webhook: {
                host: host,
                port: port
            }
        }
        
        this.bot = new telegramBotApi(this.token, this.options);
        
        if(start) {
            start();
        }
    }
    
    start() {
        
        this.telegramBot.on('message', function(msg) {
           this.messageParser.getNode(msg, function(node) {
              node.execute(function(response) {
                  // TODO: Send response back to user
              })
           });
        });
    }
}