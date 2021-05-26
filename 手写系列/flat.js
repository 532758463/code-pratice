const arr = [1, 2, 3, ["1", "小", [4, 6, 7], 2], 122, [213], 0000];

function flat(arr, num = 1) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  return num > 0
    ? arr.reduce(
        (pre, cur) => pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur),
        []
      )
    : arr.slice();
}

console.log(flat(arr, 1));

// reducer 函数接收4个参数:
// Accumulator (acc) (累计器)
// Current Value (cur) (当前值)
// Current Index (idx) (当前索引)
// Source Array (src) (源数组)

// var flattened = [
//   [0, 1],
//   [2, 3],
//   [4, 5],
// ].reduce(function (a, b) {
//   console.log(a);
//   // console.log(b);
//   return a.concat(b);
// }, []);

// console.log(flattened);
