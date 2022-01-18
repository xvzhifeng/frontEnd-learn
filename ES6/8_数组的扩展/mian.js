
/**
 * 使用数组扩展运算，可以进行数组的copy
 */
let test1 = function() {
    let a = [1,2,3]
    let b = [...a]
    let c = [...a,...b]
    console.log(...a) // 1 2 3
    console.log(...b) // 1 2 3
    console.log(...c) // 1 2 3 1 2 3
    a[0] = 5
    b[1] = 5
    console.log(...a) // 5 2 3
    console.log(...b) // 1 2 3
    console.log(...c) // 1 2 3 1 2 3 

    // 可以将字符串变成字符数组
    let d = [..."hello"]
    console.log(...d) // h e l l o

}

let test2 = function() {
    let a = Array.of(1,2,3,4,5,6,'l')

    // find and findIndex 可以找到符合传入函数条件的值或者位置
    let index4 = a.findIndex(x => x==4)
    console.log(index4)
    console.log(a.find(x=> x>5))

    a.copyWithin(1) // 省略开始和结束位置时，会从0一直到函数结束，大于数组长度之后就没了
    console.log(...a) // 1  1 2 3 4 5 6

    a.fill(100) // 用100填充当前数组
    console.log(...a) // 100 100 ... 100
}

let test3 = function() {
    let a = Array.of([1,2,3],[[1]],1) // [[1,2,3],[[1]]]
    // flat 可以把数组中的数组给抽出来,变成一维数组，如果层数很多可以直接使用Infinity，
    console.log(...a.flat(2)) // 1 2 3 1 1
    console.log(...a.flat(Infinity)) // 1 2 3 1 1 

    // flatMap 可以对数组进行遍历并且根据回调函数进行运算
    let b = [1,2,3]
    console.log(...b.flatMap(x=>[x+2,x])) // 3 1 4 2 5 3 
}

test3()