let a =  "9007199254740991";
let b = "1234567899999999999";

function add(a,b) {
    let maxLength = Math.max(a.length, b.length);

    // 用0去补齐长度
    a = a.padStart(maxLength, 0);
    b = b.padStart(maxLength,0);

    // 定义加法过程中需要用到的变量
    let t = 0;
    let f = 0; // 进位
    let sum = "";

    for(let i = maxLength - 1; i>=0; i--) {
        // f是进位，加到下依次循环的高位
        t = parseInt(a[i]) + parseInt(b[i]) + f;
        //是否进位
        f= Math.floor(t/10);
        
        sum = t%10 + sum;
    }

    if(f === 1) {
        sum = "1" + sum;
    }

    return sum;
}

console.log(add(a,b))