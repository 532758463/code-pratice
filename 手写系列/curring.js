const add = (...agrs) => agrs.reduce((pre, cur) => pre + cur, 0);

const curring = function(fn) {
  
    let args = [];

    return function result(...newArgs) {
        if(newArgs.length) {
            args.push(...newArgs);
            return result;
        }else {
            const val = fn.apply(this, agrs);
            args = [];
            return val;
        }
    }
}