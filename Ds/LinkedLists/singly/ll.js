#!/usr/bin/env node

class Node {
  constructor(data, nextNode = null) {
    this.data = data;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    this.node = null;
  }

  insertFirst(data) {
    this.node = new Node(data);
    this.node.nextNode = this.head;
    this.head = this.node;
    this.size += 1;
  }

  insertAtPos(data, pos) {
    this.node = new Node(data);

    if (this.head === null || pos === 0) {
      this.node.nextNode = this.head;
      this.head = this.node;

      return;
    }

    let i = 1;
    let current = this.head;

    while (i < pos && this.head !== null) {
      current = current.nextNode;
      i++;
    }

    if (current.nextNode !== null) {
      this.node.nextNode = current.nextNode;
      current.nextNode = this.node;
    } else {
      current.nextNode = this.node;
    }
  }

  reverseLL() {
    let prev = null;
    let current = this.head;

    while (current !== null) {
      let next = current.nextNode;
      current.nextNode = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }

  printLL(headPtr) {
    while (headPtr !== null) {
      console.log(headPtr.data);
      if (headPtr.nextNode !== null) {
        console.log(" -> ");
      }
      headPtr = headPtr.nextNode;
    }
  }
}

const ll = new LinkedList();
// ll.insertFirst(100);
// ll.insertFirst(200);
ll.insertAtPos(1, 0);
ll.insertAtPos(2, 1);
ll.insertAtPos(3, 2);
ll.insertAtPos(4, 3);
ll.insertAtPos(300, 2);
ll.insertAtPos("Head", 0);
ll.insertAtPos("Tail", 6);

console.log("Before reverse");
ll.printLL(ll.head);
ll.reverseLL();
console.log("After reverse");
ll.printLL(ll.head);
// console.log(ll);
