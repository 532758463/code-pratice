for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

// 使用let关键字声明变量i：使用let（和const）关键字声明的变量是具有块作用域的（块是{}之间的任何东西）。 在每次迭代期间，i将被创建为一个新值，并且每个值都会存在于循环内的块级作用域。



for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
// 由于JavaScript中的事件执行机制，setTimeout函数真正被执行时，循环已经走完。 由于第一个循环中的变量i是使用var关键字声明的，因此该值是全局的。 
//在循环期间，我们每次使用一元运算符++都会将i的值增加1。 因此在第一个例子中，当调用setTimeout函数时，i已经被赋值为3。