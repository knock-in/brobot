class Node {
    constructor(msg, data, prev, next, callback) {
        callback(msg, data, this);
        this.next = next;
        this.prev = prev;
        this.callback = callback;
        this.msg = msg;
    }
    
    addLast(data) {
        if(this.next == null) {
            this.next = new Node(this.msg, data, this, null, this.callback);
        } else {
            this.next.addLast(data);
        }
    }
    
    addFirst(data) {
        if(this.prev == null) {
            this.prev = new Node(this.msg, data, null, this, this.callback);
        } else {
            this.prev.addFirst(data);
        }
    }
    
    getLast(callback) {
        if(this.next == null) {
            callback(this);
        } else {
            this.next.getLast(callback);
        }
    }
    
    getFirst(callback) {
        if(this.prev == null) {
            callback(this);
        } else {
            this.prev.getFirst(callback);
        }
    }
    
    getData() {
        return this.data;
    }
}

module.exports = Node;