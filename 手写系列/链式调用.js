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


function Fn() {
    console.log("初始化");
}

Fn.prototype.fly = function(param) {
    console.log(param);

    return this;
}

//因为 new 在实例化的时候this会指向所创建的对象，所以this.fly会在原型链找到。
const a = new Fn()
a.fly("1").fly("2").fly("3")


const obj = {
    a: function() {
        console.log("a")
        return this;
    },
    b: function() {
        console.log("b")
        return this;
    }
}

obj.a().b().a()

// 核心点在于最后返回实例本身