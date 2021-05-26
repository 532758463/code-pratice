let obj = {
  num: 0,
  str: "",
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: "我是一个对象", id: 1 },
  arr: [0, 1, 2],
  func: function () {
    console.log("我是一个函数");
  },
  date: new Date(0),
  reg: new RegExp("/我是一个正则/ig"),
  [Symbol("1")]: 1,
};
// Object create会创建一个新对象。
const cloneObj = Object.create(
  Object.getPrototypeOf(obj),
// 赋予新对象属性
  Object.getOwnPropertyDescriptors(obj)
);
console.log(cloneObj);

function deepClone(data, hash = new WeakMap()) {
  if (data === null || typeof data !=="object") return data;
  if (data instanceof Date) return new Date(data);
  if (data instanceof RegExp) return new RegExp(data);
  if (Array.isArray(data)) return [...data];

  // 判断传入的待拷贝对象的引用是否存在于hash中,结局循环引用问题
  if (hash.has(data)) {
    return hash.get(data);
  }

  const cloneObj = Object.create(Object.getPrototypeOf(data), Object.getOwnPropertyDescriptors(data));

  hash.set(data, cloneObj);
  for(let key of Reflect.ownKeys(data)) {
      cloneObj[key] = typeof data[key] === "object" ? deepClone(data[key], hash) : data[key]
  }

  return cloneObj

}


const newObj = deepClone(obj)
const obj2 = obj

console.log(newObj === obj)
console.log(obj2 === obj)