var BaseModule = require("./basemodule.js");

class RevModule extends BaseModule {
    constructor(data, node, msg, _args) {
        super(data, node, msg, _args);
    }
    
    static getOptions() {
        return {
            trigger: 'rev',
            minArgs: 0
        };
    }
    
    work(_args) {
        return _args.reverse();
    }
}

module.exports = RevModule;