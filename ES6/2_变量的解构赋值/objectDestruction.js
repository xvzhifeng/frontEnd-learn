/**
 * 对象的解构赋值
 */

let test1 = function () {
    let { foo, bar } = { foo: "test", bar: "bar" }
    console.log(foo, bar)
    // test bar
}

let test2 = function () {
    let { foo: foo1, bar: bar } = { foo: "test", bar: "bar" }
    // foo 会被显示为 未定义
    // console.log(foo)
    // test
    console.log(foo1)
    // bar
    console.log(bar)
}

let test3 = function () {
    let obj = {
        p: [
            'hello',
            {
                y: 'world'
            }
        ]
    }
    // 其中的p是模式，不会被赋值
    let { p: [x, { y }] } = obj
    console.log(x, y)
    // 这个p是能够被赋值的，同时也能取出x,y的值
    let { p, p: [x, { y }] } = obj
    console.log(p, x, y)
}

test3()