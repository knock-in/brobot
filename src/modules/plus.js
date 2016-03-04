var BaseModule = require("./basemodule.js");

class RevModule extends BaseModule {
    constructor(data, node, msg, _args) {
        super(data, node, msg, _args);
    }
    
    
    static getOptions() {
        return {
            trigger: '+',
            minArgs: 2
        };
    }
    
    work(_args) {
        var retArgs = [];
        if(_args.length >= 2) {
            var value1 = Number(_args[0]);
            var value2 = Number(_args[1]);
            var i = 0;
            
            if(!isNaN(value1) && !isNaN(value2)) {
                retArgs.push(value1 + value2);
                i = 2;
            }
            
            for(var len = _args.length;i < len;i++) {
                retArgs.push(_args[i])
            }
        }
        
        return retArgs;
    }
}

module.exports = RevModule;