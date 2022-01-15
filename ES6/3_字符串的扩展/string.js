/**
 * ES6 对于字符串的扩展
 */

let test1 = function() {
    // 单字节的形式
    console.log("\u0061") // a

    // 中文需要双字节
    console.log("\uD842\uDFB7") // 吉

    // 如果在\u 后面跟上一个超过0xFFFF的数值会被理解为 20BB + 7 所以会单独打印出7
    // 如果想要直接打印出原本的值可以加上{}
    console.log("\u20BB7") // ₻7

    console.log("\u{20BB7}") // 吉
}

let test2 = function() {

    let s = "\u{20BB7}"

    // 在ES6 中新增的遍历方法，可以支持大于0xFFFF的码点
    for(let s1 of s) {
        console.log(s1) // 吉
    }
    // 传统的 for 循环不支持
    for(let i =0; i< s.length;i++) {
        console.log(s[i]) // � �
    }
}

let test3 = function() {
    var str = {"name":"教程", "site":"test"}
    let s1 = JSON.stringify('\u{D834}') // ""\\uD834""
    let s2 = JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""

    let s3 = JSON.stringify(str)
    console.log(s1, s2)
    console.log(str, s3)
}

/**
 * 模板字符串
 * 模板字符串，用反引号（`）标识，可以支持换行，变量等
 * 同时所有的空格和换行都会被记录下来；
 */
let test4 = function() {
    // 普通字符串
    let s1 = `In JavaScript '\n' is a line-feed.`
    console.log(s1)

    // 多行字符串
    let s2 = `In JavaScript this is
    not legal.`
    console.log(s2)


    console.log(`string text line 1
    string text line 2`);

    // 字符串中嵌入变量
    let name = "Bob", time = "today";
    let s4 = `Hello ${name}, how are you ${time}?`
    console.log(s4)


    function f() {
        return `hello
        world
                !!!`
    }

    // 在模板字符串的${}中可以加入几乎所有的 javaScript 代码
    let s5 = `你好 javaScript ， ${f()}`
    console.log(s5)
}

/**
 * 模板标签
 * 就是函数调用，只不过后面的参数放在模板字符串中，前面的字符就是方法名
 */
let test5 = function() {
    let v1 = 10;
    let v2 = 20;
    let tag = function(strings, ...value) {
        for(let s of strings) {
            console.log(s)
        }
        for(let v of value) {
            console.log(v)
        }
    }

    // 以下两种方法是等价的
    tag`你好 ${v1}, hi ${v2}`
    tag(["你好", ", hi"],v1,v2)
}

test5()