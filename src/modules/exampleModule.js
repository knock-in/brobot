var BaseModule = require("./basemodule.js");

class ExampleModule extends BaseModule {
    constructor(data, node, msg, _args) {
        super(data, node, msg, _args);
    }
    
    static getOptions() {
        return {
            trigger: 'example',
            minArgs: 0,
            active: true
        };
    }
    
    work(_args) {
        this._args.push('Example Module executed');
    }
}

module.exports = ExampleModule;