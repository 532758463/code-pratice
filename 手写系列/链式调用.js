const stack = [];

function next() {
    const fn = stack.shift();
    fn && typeof fn === "function" && fn();
}


function Man(name) {
    // 将需要调用的函数push进数组
    stack.push(() => {
        console.log(name);
        next()
    })

    // new 一个对象时，自动调用next
    setTimeout(next, 0)
}

Man.prototype.eat = function (food) {
    stack.push(() => {
        console.log(food)
        next()
    })

    return this;
}


Man.prototype.sleep = function (delay) {
    stack.push(() => {
        setTimeout(() => {
            console.log("sleep");
            next();
        }, delay)
    })

    return this;
}

function LazyMan(name) {
    const p = new Man(name);
    return p;
}

LazyMan("Tll").eat("apple").sleep(1000).eat("orange")