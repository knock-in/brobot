var BaseModule = require("./basemodule.js");

class BrobotModule extends BaseModule {
    constructor(msg, data, node, _args) {
        super(msg, data, node, _args);
    }
    
    static getOptions() {
        return {
            trigger: 'bro',
            minArgs: 1,
            active: true
        };
    }
    
    // This is always the last instance before user gets response    
    work(_args) {
        if(_args[0].toLowerCase() == 'echo') {
            // echo arguments
            for(var i = 1;i < _args.length;i++) {
                this._args.push(_args[i]);
            }
        } else {
            // Every other case surpress output
        }
    }
}

module.exports = BrobotModule;