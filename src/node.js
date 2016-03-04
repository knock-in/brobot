class Node {
    constructor(msg, data, prev, next, callback) {
        callback(msg, data, this);
        this.next = next;
        this.prev = prev;
        this.callback = callback;
        this.msg = msg;
    }
    
    add(data) {
        if(this.next == null) {
            this.next = new Node(this.msg, data, this, null, this.callback);
        } else {
            this.next.add(data);
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