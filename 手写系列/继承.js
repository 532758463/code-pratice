// https://github.com/mqyqingfeng/Blog/issues/2
let obj = {
  num: 0,
  str: "",
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: "我是一个对象", id: 1 },
  arr: [0, 1, 2],
  func: function () {
    console.log("我是一个函数");
  },
  date: new Date(0),
  reg: new RegExp("/我是一个正则/ig"),
  [Symbol("1")]: 1,
};

// 原型链继承
function Parent() {
  this.name = "1";
}

function Child() {}

Child.prototype = new Parent();

const a = new Child();

console.log(a.name);

// 存在问题：1. 引用类型的实例属性被所有实例共享 2.创建Child实例时不能向parent传参

// 构造函数继承
function Parent2() {
  this.names = [1, 2, 3, 4];
}

function Child2() {
  Parent2.call(this, [...arguments]);
}

const b = new Child2();
console.log(b.names);

//1.可以传参 2.避免了实例共享
// 缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法。

// 组合继承
function Parent3(name) {
  this.name = name;
  this.colors = ["red", "blue"];
}

function Child3() {
  Parent3.apply(this, [...arguments]);
}

Child3.prototype = new Parent3();

const test = new Child3("1112");
console.log(test.name);

// 原型式继承
function createObj(o) {
  function F() {
    F.prototype = o;
  }

  return new F();
}

// 寄生式继承：通过Object.create新建对象，clone

function createObj2(o) {
  const clone = Object.create(o);
  clone.sayName = function () {
    console.log("hi");
  };
  return clone;
}


// 缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
const test2 = createObj2(obj)

console.log(test2.num)


// 寄生组合式继承
function Parent4() {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}


