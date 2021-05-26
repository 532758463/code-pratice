var company = {
    address: 'beijing'
}
var yideng = Object.create(company);
// delete 操作符用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放
delete yideng.address
console.log(yideng.address)