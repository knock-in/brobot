class Node {
    constructor(data, determination, prev, next) {
        this.data = determination(data);
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
    
    getData() {
        return this.data;
    }
}