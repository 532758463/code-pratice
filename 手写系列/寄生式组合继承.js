function clone(parent, child) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent.call(this);
  this.friends = "child";
}

clone(Parent, Child);

Child.prototype.getFriends = function () {
  return this.friends;
};

const person = new Child();

console.log(person);
