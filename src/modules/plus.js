var BaseModule = require("./basemodule.js");

class RevModule extends BaseModule {
    constructor(data, node, msg, _args) {
        super(data, node, msg, _args);
    }
    
    static getOptions() {
        return {
            trigger: '+',
            minArgs: 2,
            active: false
        };
    }
    
    work(_args) {
        var i = 0;
        
        if(this.isNumber(_args[0]) && this.isNumber(_args[1])) {
            this._args.push(Number(_args[0]) + Number(_args[1]));
            i = 2;
        }
        
        for(var len = _args.length;i < len;i++) {
            this._args.push(_args[i])
        }
    }
}

module.exports = RevModule;