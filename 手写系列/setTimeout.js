var fullName = '圆圆鼠';
var obj = {
    fullName: '方块猴',
    prop: {
        fullName: '三角兔',
        getFullName: function () {
          // setTimeout(() => console.log(this.fullName), 1000);
            setTimeout(function showName() {
                console.log(this.fullName);
            }, 1000);
            return this.fullName;
        },
    },
};

// Question 1: 请问以下代码的输出是？
console.log(obj.prop.getFullName());
// 三角兔 undefined

// Question 2: 请问以下代码的输出是？
var getFullName = obj.prop.getFullName;
console.log(getFullName());
// undefined undefined