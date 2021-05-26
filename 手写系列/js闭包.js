// 闭包其实就是一个可以访问其他函数内部变量的函数。即：一个定义在函数内部的函数
// 闭包场景：
//  1. 返回一个函数
//  2. 在定时器、事件监听、Ajax请求、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包
//  3. 作为函数参数传递的形式
//  4. 立即执行函数

// 如何解决循环输出问题？

// 1.利用 IIFE
for(var i = 1;i <= 5;i++){
    (function(j){
      setTimeout(function timer(){
        console.log(j)
      }, 0)
    })(i)
  }
  
// 2.使用 ES6 中的 let

  for(let i = 1; i <= 5; i++){

    setTimeout(function() {
  
      console.log(i);
  
    },0)
  }
  
//  3.定时器传入第三个参数
for(var i=1;i<=5;i++){
    setTimeout(function(j) {
      console.log(j)
    }, 0, i)
  }
  