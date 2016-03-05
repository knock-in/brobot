class BaseModule {
    constructor(data, node, msg, _args) {
        this.token = data;
        this.node = node;
        this._args = _args || [];
        this.msg = msg;
    }
    
    // TODO: Module options: trigger: '+', minArgs: [ n ] -> n == -1 == all arguments, 
    static getOptions() {
        return {
            trigger: '',
            minArgs: 0
        };
    }
    
    execute(_args, callback) {
        console.log(`Execute module ${this.constructor.name} with token ${this.token}`);

        var minArgs = this.constructor.getOptions().minArgs;

        // Option "minArgs" ensures that the module will only get called if the user passed enough arguments for it, otherwise it will skip this module
        if(_args.length >= minArgs) {
            // Enough arguments so do the module-work
            console.log("Enough arguments");
            console.log(_args);
            this.work(_args || []);
        } else {
            // Not enough arguments for this module so just pass them all to the next module, which meets the requirements hopefully
            console.log(`Not enough arguments, got: ${_args.length} but need ${minArgs}`);
            console.log(_args);
            this._args = _args;
        }
        
        // Pass resulted arguments of this module to the next
        this.pass(callback);
    }
    
    work(_args) {
        this._args.push(this.token);
        for(var i = 0, len = _args.length;i < len;i++) {
            this._args.push(_args[i]);
        }
    }
    
    pass(callback) {
         if(this.node.prev != null) {
            this.node.prev.getData().execute(this._args, callback);
        } else {
            callback(this.msg, this._args);
        }
    }
}

module.exports = BaseModule;