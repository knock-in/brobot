var BaseModule = require("./basemodule.js");

class RRevModule extends BaseModule {
    constructor(data, node, msg, _args) {
        super(data, node, msg, _args);
    }
    
    static getOptions() {
        return {
            trigger: 'rrev',
            minArgs: 0
        };
    }
    
    work(_args) {
        for(var i = 0;i < _args.length;i++) {
            this._args.push(_args[i].split('').reverse().join(''));
        }
    }
}

module.exports = RRevModule;