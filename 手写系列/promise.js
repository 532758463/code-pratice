// 1）Promise基本特性

// 1、Promise有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)
// 2、Promise对象接受一个回调函数作为参数, 该回调函数接受两个参数，分别是成功时的回调resolve和失败时的回调reject；
//    另外resolve的参数除了正常值以外， 还可能是一个Promise对象的实例；reject的参数通常是一个Error对象的实例。
// 3、then方法返回一个新的Promise实例，并接收两个参数onResolved(fulfilled状态的回调)；onRejected(rejected状态的回调，该参数可选)
// 4、catch方法返回一个新的Promise实例
// 5、finally方法不管Promise状态如何都会执行，该方法的回调函数不接受任何参数
// 6、Promise.all()方法将多个多个Promise实例，包装成一个新的Promise实例，该方法接受一个由Promise对象组成的数组作为参数(Promise.all()方法的参数可以不是数组，
//    但必须具有Iterator接口，且返回的每个成员都是Promise实例)，注意参数中只要有一个实例触发catch方法，都会触发Promise.all()方法返回的新的实例的catch方法，
//    如果参数中的某个实例本身调用了catch方法，将不会触发Promise.all()方法返回的新实例的catch方法
// 7、Promise.race()方法的参数与Promise.all方法一样，参数中的实例只要有一个率先改变状态就会将该实例的状态传给Promise.race()方法，
//    并将返回值作为Promise.race()方法产生的Promise实例的返回值
// 8、Promise.resolve()将现有对象转为Promise对象，如果该方法的参数为一个Promise对象，Promise.resolve()将不做任何处理；
//    如果参数thenable对象(即具有then方法)，Promise.resolve()将该对象转为Promise对象并立即执行then方法；
//    如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为fulfilled，其参数将会作为then方法中onResolved回调函数的参数，
//    如果Promise.resolve方法不带参数，会直接返回一个fulfilled状态的 Promise 对象。
//    需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
// 9、Promise.reject()同样返回一个新的Promise对象，状态为rejected，无论传入任何参数都将作为reject()的参数


