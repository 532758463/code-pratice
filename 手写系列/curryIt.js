var fn = function (a, b, c) {
  return a + b + c;
};

curryIt(fn)(1)(2)(3);
curryIt(fn)(1, 2)(3);
curryIt(fn)(1)(2, 3);

// console.log(curryIt(fn)(1)(2)(3));
// 柯里化是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。
// 简单理解题目意思，就是指，我们将预定义的函数的参数逐一传入到curryIt中，当参数全部传入之后，就执行预定义函数。
// 于是，我们首先要获得预定义函数的参数个数fn.length，然后声明一个空数组去存放这些参数。
// 返回一个匿名函数接收参数并执行，当参数个数小于fn.length，则再次返回该匿名函数，继续接收参数并执行，直至参数个数等于fn.length。
// 最后，调用apply执行预定义函数。

function curryIt(fn) {
  let length = fn.length,
    args = [];
  const result = function (arg) {
    args.push(arg);
    length--;
    if (length <= 0) {
      return fn.apply(this, args);
    } else {
      return result;
    }
  };

  return result;
}

function curryIt2(fn) {
  let length = fn.length,
    args = [];
  let count = 0;

  const result = function (...arg) {
    count++;

    args.push(...arg);

    length = arg.length > 1 ? length - arg.length : length - 1;

    if (length <= 0) {
      return fn.apply(this, args);
    } else {
      return result;
    }
  };
  return result;
}

// console.log(curryIt2(fn)(1)(2)(3));

function currying(fn) {
  let args = [];
  return function temp(...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs];
      return temp;
    } else {
      let val = fn.apply(this, args);
      args = []; //保证再次调用时清空
      return val;
    }
  };
}
console.log(currying(fn)(1)(2)(3));