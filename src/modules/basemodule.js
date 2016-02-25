class BaseModule {
    constructor(data, node, _args) {
        this.token = data;
        this.node = node;
        this._args = _args || [];
    }
    
    execute(callback, _args) {
       this.work(_args || []);
       this.pass(callback);
    }
    
    work(_args) {
        for(var i = 0, len = _args.length;i < len;i++) {
            this._args.push(_args[i]);
        }
        this._args.push(this.token);
        
    }
    
    pass(callback) {
         if(this.node.prev != null) {
            this.node.prev.getData().execute(callback, this._args);
        } else {
            callback(this._args);
        }
    }
}

module.exports = BaseModule;