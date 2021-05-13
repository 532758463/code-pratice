var fib = function (n) {
    if (n < 2) {
        return n;
    }

    let p = 0,
        q = 0,
        r = 1;

    for (let i = 0; i < n; i++) {
        p = q;
        q = r;
        r = p + q;
    }
    // 第一次循环： p = 0, q = 1, r = 1,
    // 第二次循环：p = 1, q = 1, r = 2
    // 第三次循环：  p = 1, q = 2, r = 3

    return r

}


var fib2 = function (n) {
    if (n < 2) {
        return n
    };
    return fib2(n - 1) + fib2(n - 2)
}