var BaseModule = require("./basemodule.js");

class RevModule extends BaseModule {
    constructor(msg, data, node, _args) {
        super(msg, data, node, _args);
    }
    
    static getOptions() {
        return {
            trigger: 'rev',
            minArgs: 0,
            active: true
        };
    }
    
    work(_args) {
        this._args = _args.reverse();
    }
}

module.exports = RevModule;