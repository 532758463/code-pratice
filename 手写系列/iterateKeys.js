
// 属性遍历
function iterate(obj) {
  return Object.keys(obj).map(function (key) {
    return key + ": " + obj[key];
  });
}
var C = function () {
  this.foo = "bar";
  this.baz = "bim";
};
C.prototype.bop = "bip";
// iterate(new C());
console.log(iterate(new C()));
