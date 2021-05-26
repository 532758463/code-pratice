function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 可能是对象或者普通的值，如果是函数的话就不需要深拷贝

  if (typeof obj !== "object") return obj;

  if (hash.get(obj)) return hash.get(obj);

  let cloneObj = new obj.constructor();

  hash.set(obj, cloneObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }

  return cloneObj;
}



const data = {
  a: "123",
  b: 123,
  c: true,
  d: [43, 2],
  e: test,
  f: {
    name: "张三",
    age: 18,
    likes: {
      ball: ["足球", "篮球"],
    },
  },
};

const a = {
  a: 1,
  b: {
    c: 2,
  },
};

const c = deepClone(a);
console.log(c === a);
