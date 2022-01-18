/**
 * 有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
 * 如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
 */
let test1 = () => {
    const s1 = Symbol()
    console.log(s1)
    // 不会加到全局
    const s2 = Symbol('foo')
    console.log(s2)

    // for 搜索的是全局里面是否有foo的Symbol
    const s3 = Symbol.for('foo')
    console.log(s3)
    console.log(s3 === s2) // false

    const s4 = Symbol.for('foo')
    console.log(s3 === s4) // true
}

/**
 * Symbol作为属性名，遍历对象的时候，该属性不会出现在 for...in 、 
 * for...of 循环中，也不会被 Object.keys() 、 Object.getOwnPropertyNames() 、 JSON.stringify() 返回。
 */
let test2 = () => {
    const s1 = {
        [Symbol.for('foo')]:"foo",
        'foo':'a'
    }

    for(let i of Object.keys(s1)) {
        console.log(i) // foo
    }

    s1[Symbol('test')] = "test"

    // 可以获得Symbol定义的属性
    for(let i of Object.getOwnPropertySymbols(s1)) {
        console.log(i) // Symbol(foo) Symbol(test)
    }
    // 因为每一个Symbol都是独一无二的，所以使用时最好存一下
    console.log(s1[Symbol('test')]) // undefined

}
test2()