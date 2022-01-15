
/**
 * let 是es6 新的定义变量的方式，是一种局部变量，只能在当前代码块中执行；
 * let的作用域：包含了当前块以及当前块的所有块，如果字块中重新定义了则优先字块的；
 * 使用let定义的变量，必须先定义在使用，否则会报错；
 */
let test1 = function () {
    // 在同一个块级作用域，不能创建两个相同的变量
    // var i = 1;
    let i = 1;
    {

        // 如果未定义下面这条语句，则会输出上一个块级区域的i的值
        let i = 2;
        // 输出 2
        console.log(i);
    }
    // 输出 1
    console.log(i);
}

/**
 * for 循环中的小括号范围算一个单独的代码块
 * 所以在下面代码中有三个块的范围
 * 值得注意的是，字块修改的变量不会作用到块的外面，所有外面的变量不会有影响
 */
let test2 = function () {
    let i = 10;
    console.log(i)
    for (let i = 0; i <= 10; i++) {
        let i = 1
        console.log(i)
    }
    console.log(i)
}

/**
 * 在es6中，允许在块级作用域中声明函数
 * 但是函数的作用于let声明的变量类似，只在当前的作用域内生效
 */

let test3 = function () {
    function f() {
        console.log("I'm in outside!")
    }

    (
        function () {
            function f() {
                if (true) {
                    console.log("I'm in inside!")
                }
            }
            f()
        }()
    )
    f();
}
/**
 * 本质上块级作用域只是将一些操作绑定在一起，并没有返回值
 * 所以我们可以使用do表达式去获取块作用域的数据，但是我没有实验成功，可能当前node版本不支持
 */
let test4 = function () {

    // 本质上块级作用域只是将一些操作绑定在一起，并没有返回值，所以我们无法获取到t的值
    {
        let t = 10;
        t = t * 100;
    }

    // let x = do {
    //     let t = 10;
    //     t*100;
    // }
}

/***
 * let 定义的变量，在它的作用域中的子块中也是可以进行修改的，只要不重新定义，
 * 就是使用的最外层定义的对象，由此也可以使用这个方法去获得块级作用域的值
 */
let test5 = function () {
    let x = 1;

    for (x = 1; x < 10; x++) {
        x = 10;
        console.log(x)
    }
    console.log(x)
}

test5()