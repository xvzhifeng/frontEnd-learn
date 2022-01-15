/**
 * 数组的解构赋值，可以从数组中提取值给变量赋值
 */

let test1 = function () {
    let [a, b, c] = [1, 2, 3]
    console.log(a, b, c)
}


let test2 = function () {

    let [, , t] = [1, 2, 3]
    console.log(t)
    // 3

    let [a, , c] = [1, 2, 3, 4, 5]
    console.log(a, c)
    // 1 3

    let [head, ...tail] = [1, 2, 34, 5, 6]
    console.log(head)
    // 1
    console.log(tail[2])
    // 5

    let [x, ...y] = [1]
    console.log(x)
    // 1
    console.log(y)
    // []
}

let test3 = function () {
    let [a] = []
    console.log(a)
    // undefined

    let [foo, arm] = [1]
    console.log(arm)
    // undefined

}

/**
 * 如果解构不成功时，会使用默认值
 */
let test4 = function () {
    // 使用默认值为1
    let [a = '1'] = []
    console.log(a)

    // 不使用默认值，最后b的值为1
    let [b = 2] = [1]
    console.log(b)
}

/**
 * f函数会被调用一次，有且只有解构失败时会执行默认值
 */
let test5 = function () {
    let f = function () {
        console.log("默认值")
        return 2
    }
    let [a = f()] = []

    let [b = f()] = [1]

    // 2 1
    console.log(a, b)

}
test5()