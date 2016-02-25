class Module {
    constructor(token, node, _args) {
        this.token = token;
        this.node = node;
        this._args = _args;
    }
    
    execute(callback) {
       this.work();
       this.pass(callback);
    }
    
    work() {
        
    }
    
    pass(callback) {
         if(this.node.prev != null) {
            this.node.prev.getData().execute(this._args);
        } else {
            callback(this.token);
        }
    }
}