/**
 *  ES6 新标准 可以使用函数的默认值
 * @param {*} x 
 * @param {*} y 
 */
let test1 = function (x = 0, y = 0) {
    this.x = x;
    this.y = y;
    console.log(x, y);
}

/**
 * 测试解构复制和函数默认值同时使用
 * @param {对象 包含了x，y} param0 
 */
let test2 = function({x,y=5} = {}) {
    console.log(x,y);
}

test2({x:1,y:2}) // 1 2
test2({}) // undefined 5
test2({x:1}) // 1 5


let test3 = function(x = 10, y) {
    console.log(x,y);
}

// test3(,10); // 报错
test3(undefined,10) // 10 10


/**
 * rest 格式传入参数，传过去的values是一个数组
 * 
 * @param  {...any} values 
 */
let test4 = function(...values) {
    
    for(let i of values) {
        console.log(i)
    }
}

test4(1,"2","test",false)
console.log(test4.name)

// 箭头函数

let test5 = (x,y) => x+y;

let test6 = x => x**x;

console.log(test5(1,2)) // 3
console.log(test6(2)) // 4



exports.test1 = test1
// extends.test1;