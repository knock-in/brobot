var BaseModule = require("./basemodule.js");
var morse = require("morse");

class MorseModule extends BaseModule {
    constructor(data, node, msg, _args) {
        super(data, node, msg, _args);
    }
    
    static getOptions() {
        return {
            trigger: 'morse',
            minArgs: 1,
            active: true
        };
    }
    
    work(_args) {
        if(_args[0].toLowerCase() == 'e') {
            // Encode
            for(var i = 1;i < _args.length;i++) {
                this._args.push(morse.encode(_args[i]));
                
            }
        } else if(_args[0].toLowerCase() == 'd') {
            // Decode
             for(var i = 1;i < _args.length;i++) {
                this._args.push(morse.decode(_args[i]));
            }
        } else {
            // Neither encrypt or decrypt so return all arguments
            this._args.push(this.token);
            for(var i = 0;i < _args.length;i++) {
                this._args.push(_args[i]);
            }
        }
    }
}

module.exports = MorseModule;