class BaseModule {
    constructor(data, node, msg, _args) {
        this.token = data;
        this.node = node;
        this._args = _args || [];
        this.msg = msg;
    }
    
    // TODO: Module options: trigger: '+', argumentCount: [ n ] -> n == -1 == all arguments, 
    static getOptions() {
        return {
            trigger: '',
            minArgs: -1
        };
    }
    
    execute(callback, _args) {
        // TODO: verify argumentcount
        console.log(`Execute module ${this.constructor.name} with token ${this.token}`);
        this._args = this.work(_args || []);
        this.pass(callback);
    }
    
    work(_args) {
        var retArgs = [];
        retArgs.push(this.token);
        for(var i = 0, len = _args.length;i < len;i++) {
            retArgs.push(_args[i]);
        }
        return retArgs;
    }
    
    pass(callback) {
         if(this.node.prev != null) {
            this.node.prev.getData().execute(callback, this._args);
        } else {
            callback(this.msg, this._args);
        }
    }
}

module.exports = BaseModule;