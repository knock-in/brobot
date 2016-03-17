/**
 *  Double linked list implementation.
 */
class Node {
  /**
   * Node constructor
   * @param {Object} data - Data which is stored in this node.
   * @param {Node} prev - Previous node.
   * @param {Node} next - Next node.
   * @param {Node~mappingCallback} callback - Callback which can be used to map stored data.
   */
  constructor(data, prev, next, callback) {
    callback(data, this);
    this.next = next;
    this.prev = prev;
    this.callback = callback;
  }

  /**
   * Add a new node next to the last node.
   * @param {Object} data - Node data to be stored.
   */
  addLast(data) {
    if (this.next === null) {
      this.next = new Node(data, this, null, this.callback);
    } else {
      this.next.addLast(data);
    }
  }

  /**
   * Add a new node previous to first node.
   * @param {Object} data - Node data to be stored.
   */
  addFirst(data) {
    if (this.prev === null) {
      this.prev = new Node(data, null, this, this.callback);
    } else {
      this.prev.addFirst(data);
    }
  }

  /**
   * Return last node.
   * @param {Node~getLastCallback} callback - .
   */
  getLast(callback) {
    if (this.next === null) {
      callback(this);
    } else {
      this.next.getLast(callback);
    }
  }

  /**
   * Return first node.
   * @param {Node~getFirstCallback} callback - .
   */
  getFirst(callback) {
    if (this.prev === null) {
      callback(this);
    } else {
      this.prev.getFirst(callback);
    }
  }

  /**
   * Return node data.
   * @returns {Object} data - Node data.
   */
  getData() {
    return this.data;
  }
}
/**
 * Mapping callback
 * @callback Node~mappingCallback
 * @param {} data - Data of Node.
 * @param {Node} node - Node itself.
 */

/**
 * Last Node callback
 * @callback Node~getLastCallback
 * @param {Node} node - Last node which contains the token and module.
 */

 /**
 * First Node callback
 * @callback Node~getFirstCallback
 * @param {Node} node - First node which contains the token and module.
 */
module.exports = Node;
