function sub_curry(fn) {
    const args = [].slice.call(arguments,1);
   
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    }
}


function curry(fn, length) {
   length = length || fn.length;
   const slice = Array.prototype.slice;

   return function() {  // a函数
       if(arguments.length < length) {
           const combined = [fn].concat(slice.call(arguments));
           return curry(sub_curry.apply(this, combined), length - arguments.length)
       }else {
           return fn.apply(this, arguments)
       }
   }
}


const fn = curry(function(a,b,c){  // 得到返回的 a 函数
    return [a,b,c]
})


const a = fn("a","b", "c")  // 调用a函数
const b = fn("a")("b")("c")
console.log(a)
console.log(b)

// 07 10 14 15 26 28 32 33 34
// 07 08 09


// 09 13 16 27 33 + 05 08

// 07 10 32 33 34 + 07 09

// 10 14 15 26 32 + 08 10

// 02 05 14 26 28 + 05 07

// 13 17 23 29 32 + 06 08

// 11 15 27 33 35 + 08 09