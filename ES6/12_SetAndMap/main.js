
/**
 * ES6 提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
 */
let test1 = () => {
    const s = new Set()

    const arr = [1,2,2,3,4,5,6,7]
    // 使用 forEach 遍历数组进行初始化
    arr.forEach(x => s.add(x))
    console.log(...s)

    // 可以直接接受一个数组进行初始化
    const s1 = new Set(arr)
    console.log(...s1)
    console.log(s1.size)

    // 可以用于字符串去重
    const s2 = new Set("helloWorld")
    console.log(...s2)
    // 添加的是个字符串
    s2.add("test")
    s2.delete('h')
    console.log(s2.has('h'))//false
    console.log(...s2) // e l o W r d test

    // set 是一个值的，所以k和v是一样的
    for(let [k,v] of s2.entries()) {
        console.log(k,v)
    }
    // 可以使用forEach 进行遍历
    s2.forEach((value, key) => console.log(key + ' : ' + value))
}


let test2 = () => {
    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);
    // 并集
    let union = new Set([...a, ...b]);
    console.log(union)
    // Set {1, 2, 3, 4}
    // 交集
    let intersect = new Set([...a].filter(x => b.has(x)));
    console.log(intersect)
    // set {2, 3}
    // （a 相对于 b 的）差集
    let difference = new Set([...a].filter(x => !b.has(x)));
    console.log(difference)
    // Set {1}
}

// JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。
/**
 * 在map中的key可以是对象
 */
let test3 = () => {

    const m = new Map([
        ["test",'test']
    ]);
    console.log(m)

    const m1 = new Map();
    // 这一条数据后面遍历查不到，
    m1[m] = "m"
    
    console.log(m1)
    m1.set(1,2)
    m1.set(2,3)
    console.log(m1.has(1)) // true
    console.log(m1.get(1)) // 2
    console.log(m1.delete(1)) // true
    console.log(m1.has(1)) // false

    m1.forEach((value,key,map) => console.log(key,value))
    console.log(m1)

    // 遍历可以查到
    m1.set(m,'m')
    m1.forEach((value,key,map) => console.log(key,value))

}
test3()