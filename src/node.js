class Node {
    constructor(data, next, prev) {
        this.data = data;
        this.next = next;
        this.prev = null;
    }
    
    add(data) {
        if(this.next == null) {
            this.next = new Node(data);
        } else {
            this.next.add(data);
        }
    }
    
    getLast() {
        if(this.next == null) {
            return this;
        } else {
            this.next.getLast();
        }
    }
    
    getFirst() {
        if(this.prev == null) {
            return this;
        } else {
            this.prev.getFirst();
        }
    }
}