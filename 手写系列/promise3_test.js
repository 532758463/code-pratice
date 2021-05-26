function myPromise(constructor) {
  const self = this;
  self.status = "PENDING";
  self.value = undefined;
  self.reason = undefined;

  function resolve(value) {
    if ((self.status = "PENDING")) {
      self.value = value;
      self.status = "RESOLVED";
    }
  }

  function reject(reason) {
    if ((self.status = "PENDING")) {
      self.status = "REJECT";
      self.reason = reason;
    }
  }

  try {
    constructor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  const self = this;
  switch (self.status) {
    case "RESOLVED":
      onFulfilled(self.value);
      break;
    case "REJECT":
      onRejected(self.reason);
      break;
    default:
      break;
  }
};

var p = new myPromise(function (resolve, reject) {
  resolve(1222);
});
p.then(function (x) {
  console.log(x);
});
