let add = function([a,b]) {
    return a+b
}

let res = add([1,2])
console.log(res) // 3

// 函数参数的解构也是可以使用默认值的

let move = function([x=2,y=5]) {
    return [x,y]
}

console.log(move([1,2])) // [1,2]
console.log(move([1])) // [1,5]
console.log(move([])) // [2,5]
// console.log(move()) // 报错

let move1 = function({x=2,y=5}) {
    return [x,y]
}

console.log(move1({x:1,y:2})) // [1,2]
console.log(move1({x:1})) // [1,5]
console.log(move1({})) // [2,5]
//  console.log(move1()) // 报错

