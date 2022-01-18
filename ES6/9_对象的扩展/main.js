
let test1 = function() {
    const foo = 'bar'
    // 属性缩写的形式
    const baz = {foo}
    // 等价于 const  baz = {foo:foo}
    console.log(baz) // {foo:'bar'}

    // 方法的缩写
    const a = {
        method() {
            return "method"
        },
        test() {
            return "test"
        }
    }
    // 等价于
    const b = {
        method:function() {
            return "method"
        },
        test:function() {
            return "test"
        }
    }
    console.log(a.method()) // method
    console.log(a.test()) // test
    console.log(b.method()) // method
    console.log(b.test()) // test


    // 使用缩写的形式写 get set方法
    const cart = {
        _wheels: 4,
        get wheels () {
          return this._wheels;
        },
        set wheels (value) {
          if (value < this._wheels) {
            throw new Error('数值太小了！');
          }
          this._wheels = value;
        }
      }
      cart.wheels = 5
      console.log(cart.wheels) // 5

}

let test2 = function() {
    let obj = {

    }
    obj.foo = true

    obj['a' + 'bc'] = 123
    obj['t' + 'est'] = function () {
        console.log('test')
    }
    obj.test() // test
    console.log(obj['abc']) // 123

    console.log(obj['test'].name) // 没有输出


    const a = {
        method() {
            return 'method'
        }
    }
    console.log(a.method.name) // method

    for(let i in obj) {
        console.log(i)
        // foo
        // abc
        // test
    }
}
/**
 * 变量 x 是单纯的解构赋值，所以可以读取对象 o 继承的属性；变量 y 和 z 是扩展运算符的解构赋值，
 * 只能读取对象 o 自身的属性，所以变量 z 可以赋值成功，变量 y 取不到值
 */
let test3 = function() {
    const o = Object.create({ x: 1, y: 2 });
    o.z = 3;
    console.log(o)
    let { x, ...newObj } = o;
    let { y, z } = newObj;
    console.log(x) // 1
    console.log(y) // undefined
    console.log(z)  // 3

    let n = {...o}
    console.log(n)
    console.log(o)
   
}
test3()