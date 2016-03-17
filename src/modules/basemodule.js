class BaseModule {
    constructor(msg, token, node, _args) {
        this.msg = msg;
        this.token = token;
        this.node = node;
        this._args = _args || [];
    }

    static getOptions() {
        return {
            trigger: '',
            minArgs: 0,
            active: true
        };
    }
    
    isNumber(value) {
        return !isNaN(Number(value));
    }
    
    isString(value) {
        return !this.isNumber(value);
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
            
            this._args.push(this.token);
            
            for(var i = 0;i < _args.length;i++) {
                this._args.push(_args[i]);
            }
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