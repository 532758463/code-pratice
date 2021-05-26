const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

const resolvePromise = (promise, x, resolve, reject) => {
  if (x === promise) {
    // If promise and x refer to the same object, reject promise with a TypeError as the reason.
    reject(new TypeError("循环引用"));
  }
  // if x is an object or function,
  if ((x !== null && typeof x === "object") || typeof x === "function") {
    // If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
    let called;
    try {
      // If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
      let then = x.then; // Let then be x.then
      // If then is a function, call it with x as this
      if (typeof then === "function") {
        // If/when resolvePromise is called with a value y, run [[Resolve]](promise, y)
        // If/when rejectPromise is called with a reason r, reject promise with r.
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // If then is not a function, fulfill promise with x.
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // If x is not an object or function, fulfill promise with x
    resolve(x);
  }
};

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 存放成功/失败的队列
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      // 如果value是一个Promise 递归解析
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject); // 立即执行
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    // 判断 onFulfilled, onRejected 是否是函数
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    let newPromise = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    return newPromise;
  }
  /**
   * Promise.catch
   * @description  用于promise方法链示，捕获前面 onFulfilled/onRejected 抛出的异常
   * @param {*} errorCallback
   */
  catch(errorCallback) {
    return this.then(null, errorCallback);
  }
  /**
   * Promise.finally
   * @description finally 传入的函数 无论成功和失败都执行
   * @param {*} callback 回调函数
   * @returns 返回成功/失败
   */
  finally(callback) {
    return this.then(
      (value) => {
        // 返回上一次的值
        return new Promise(callback()).then(() => value);
      },
      (error) => {
        return new Promise(callback()).then(() => {
          throw error;
        });
      }
    );
  }
  /**
   * Promise.all
   * @description 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve 当有一个promise对象变为reject状态时 直接 reject
   * @param {*} values promise对象组成的数组作为参数
   * @returns 返回一个promise实例
   */
  static all(values) {
    return new Promise((resolve, reject) => {
      let resultArr = [];
      let count = 0;
      const resultArrByKey = (index, value) => {
        resultArr[index] = value;
        if (++count === values.length) {
          resolve(resultArr);
        }
      };
      values.forEach((promise, index) => {
        promise.then((value) => {
          resultArrByKey(index, value);
        }, reject);
      });
    });
  }
  /**
   * Promise.race
   * @description 只要有一个promise对象进入FULFILLED 或者  REJECTED 状态的话，就会继续执行后面的处理
   * @param {*} values  接受promise对象组成的数组作为参数
   * @returns 返回一个Promise实例
   */
  static race(values) {
    return new Promise((resolve, reject) => {
      values.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }
  // 默认产生一个成功的promise
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }
  // 默认产生一个失败的promise
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
}

Promise.deferred = () => {
  let defer = {};
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

module.exports = Promise;
