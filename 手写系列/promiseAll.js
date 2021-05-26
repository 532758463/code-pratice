function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      throw new Error("arguments must be a arr");
    }

    let resolveCounter = 0;
    let promiseNum = promises.length;
    let resolveResult = [];

    for (let i = 0; i < promises[i]; i++) {
      Promise.resolve(promises[i]).then((val) => {
        resolveCounter++;
        resolveResult[i] = val;
        if (resolveCounter == promiseNum) {
          return resolve(resolveResult);
        }
      }, reject);
    }
  });
}

// 实现步骤：
// 1.参数要求：promise对象数组
// 2. 判断传入参数是否是数组
// 3. 定义记录resolveCounter次数  定义数组记录每次遍历执行的结果 resolveResult
// 4. 遍历执行，记录次数，如果次数等于传入数组参数，返回 reslveResult结果

let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3);
  }, 3000);
});
promiseAll([p3, p1, p2]).then((res) => {
  console.log(res); // [3, 1, 2]
});
