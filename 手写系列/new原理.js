// new 关键词的主要作用就是执行一个构造函数，返回一个实例对象，在new的过程中
//  1.创建一个新对象；
//  2.将构造函数的作用域赋给新对象（this 指向新对象）；
//  3.执行构造函数中的代码（为这个新对象添加属性）；
//  4. 返回新对象。

// new 关键词执行之后总是会返回一个对象,要么是实例对象，要么是return 语句指定的对象。

function _new(ctor, ...args) {
    if(typeof ctor !== "function") {
        throw "ctor must be a function"
    }

    let obj = new Object();
    obj.__proto__ = Object.create(ctor.prototype);
    let res = ctor.apply(obj, [...args]);
    // 如果返回值是对象并且不为空
    let isObject = typeof res === 'object' && res !== null;
    // 如果返回值是函数
    let isFunction = typeof res === 'function';

    // 如果返回值是对象或者函数则直接返回对应的res,否则返回当前内部的对象
    return isObject || isFunction ? res : obj;
} 