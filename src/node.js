class Node {
    constructor(data, determination, prev, next) {
        this.data = determination(data, this);
        this.next = next;
        this.prev = prev;
        this.determination = determination;
    }
    
    add(data) {
        if(this.next == null) {
            this.next = new Node(data, this.determination, this);
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