function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Jembe" };

greet.call(person, "Hello", "!");
