var BaseModule = require("./basemodule.js");

class RevModule extends BaseModule {
    constructor(data, node, _args) {
        super(data, node, _args);
    }
    
    static getTrigger() {
        return "rev";
    }
    
    work(_args) {
        for(var i = _args.length-1;i >= 0;i--) {
            this._args.push(_args[i]);
        }
    }
}

module.exports = RevModule;