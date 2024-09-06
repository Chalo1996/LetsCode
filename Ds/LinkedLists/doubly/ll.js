class Node {
  constructor(data, nextNode = null, prevNode = null) {
    this.data = data;
    this.nextNode = nextNode;
    this.prevNode = prevNode;
  }
}

node = new Node(10);
console.log(node);
console.log(typeof node);

const name = "Emmanuel";
console.log(typeof name);
console.log(name instanceof (String))
console.log(String("Hello") instanceof(String))
