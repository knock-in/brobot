class Node {
    constructor(data, mapper, mapFunc, prev, next) {
        mapFunc(data, this, mapper);
        this.mapper = mapper;
        this.next = next;
        this.prev = prev;
        this.determination = mapFunc;
    }
    
    add(data) {
        if(this.next == null) {
            this.next = new Node(data, this.mapper, this.mapFunc, this);
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