/**
 * const 
 * const 用于声明一个只读的变量，由于声明了就不能改变了，所以在声明时必须初始化
 * const 本质： const声明后并不是真的指变量不能改变，而是变量的地址不能改变，所以对于基本数据类型就是常量了
 *           对于复合数据类型（数组，对象等）只是数组的地址不能变，const保存的只一个指针，智能保证指针不能变，但是里面的值是可以改变的
 */

let testObject = function() {
    // 声明一个对象
    const foo = {}
    foo.foot = "foot"
    foo.art = "art"
    console.log(foo)
    // 下面的语句会报错，因为const指定的地址（指针）是不能修改的
    // foo = {}
}

let testArray = function() {
    const array = []
    // push 返回值为当前变量位置的索引
    array.push("test")
    console.log(array.length);
    console.log(array.push(123))
    console.log(array)
    // 下面的语句会报错，因为const指定的地址（指针）是不能修改的
    // array = ['test']
}

testArray()