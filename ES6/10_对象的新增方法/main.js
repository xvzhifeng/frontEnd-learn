
/**
 * 在执行比较时， 相等运算符（ == ）将在继续操作之前尝试使数据类型相同 。
 * 另一方面， 身份运算符（ === ）要求这两种数据类型必须相同，作为前提 。
 */
let test1 = function() {
    console.log(Object.is(+0,-0)) // false
    console.log(Object.is({foo:1},{foo:1})) // false
    console.log(Object.is(1,"1")) // false
    console.log(1 == "1") // true
    console.log(1 === "1") // false

    // === 和 is 区别，其余相同
    console.log(+0 === -0) //true
    console.log(NaN === NaN) // false
    console.log(Object.is(+0, -0)) // false
    console.log(Object.is(NaN, NaN)) // true
}


let test2 = function() {
    const map = [["a",1],["b",2]]
    console.log(map)
    // 可以将map转化为对象
    let o1 = Object.fromEntries(map);
    console.log(o1)

    // 对象的遍历， 其中用到数组解构赋值
    for(let [k,v] of Object.entries(o1)){
        console.log(`${k} : ${v}`)
    }

    const map1 = [['c',3]]

    // 用于对象的组成
    const o2 = Object.assign({},o1,Object.fromEntries(map1),5)

    for(let [k,v] of Object.entries(o2)){
        console.log(`${k} : ${v}`)
    }

    console.log(o2)

    // o3 类继承于 o2类
    const o3 = Object.setPrototypeOf({},o2);
    console.log(o3.a) // 1
    console.log(Object.getPrototypeOf(o3) == o2) // true

    const o4 = Object.getOwnPropertyDescriptors(o3); // null
    const o5 = Object.getOwnPropertyDescriptors(o2);
    for(let [k,v] of Object.entries(o4)){
        console.log(`${k} : ${v}`)
        // 没有输出，因为o3没有当前对象自身的属性都是继承来的
    }

    for(let [k,v] of Object.entries(o5)){
        console.log(`${k} : ${v}`)
    }
}
test2()