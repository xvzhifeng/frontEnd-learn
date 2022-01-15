/**
 * 字符串的新增方法
 */
let test1 = function() {

    // 在ES5 中的输出
    // String.fromCharCode(0x20BB7)
    // "ஷ"

    // 一下为ES6 
    let s1 = String.fromCodePoint(0x20BB7)
    console.log(s1)
    // "𠮷"

    let b1 = String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
    console.log(b1)
    // true
}

/**
 * String.raw()
 */

let test2 = function() {
    let s1 = String.raw`Hi\n${2+3}!`
    console.log(s1)
    // 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"

    let s2 = String.raw`Hi\u000A!`;
    console.log(s2)
    // 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"

    let s3 = String.raw`Hi\\n`
    console.log(s3)
    // 返回 "Hi\\\\n"
    
    let b1 = String.raw`Hi\\n` === "Hi\\\\n" // true
    console.log(b1)

}

/**
 * 
 */
let test3 = function() {
    let s = 'Hello world!';

    console.log(s.startsWith('Hello')) // true
    console.log(s.endsWith('!')) // true
    console.log(s.includes('o')) // true
    console.log(s.includes`wor`) // true

    // 第二个参数表示开始搜索的位置；
    console.log(s.startsWith('w',6)) // true
    console.log(s.endsWith('d',6)) // false
    console.log(s.includes`Hello ${6}`) // false
}

/**
 * repeat()
 * repeat方法返回一个新字符串，表示将原字符串重复n次。
 */

let test4 = function() {

    // 将x重复三次
    let s1 = "x".repeat(3)
    console.log(s1)

    // 如果是小数，将会向下取整 所以会将x重复两次，如果为负数或者Infinity会报错
    let s2 = "x".repeat(2.9)
    console.log(s2)
    let s3 = "x".repeat(2.1)
    console.log(s3)

    // 以下几个是特殊情况，因为向下取整所以-0.9会变成0，所以可以正常执行
    let s4 = "x".repeat(-0.9)
    console.log(s4) // ""
    // 字符串会被先转化为数字 貌似除了数字的字符串都会变成0
    let s5 = "x".repeat("x")
    console.log(s5) // ""
    let s6 = "x".repeat("3")
    console.log(s6) // "xxx"
    
}

let test5 = function() {
    const s1 = "hello"
    // charAt方法不支持负数
    console.log(s1.charAt(-10))

    // 由于字符串是一个对象，所以即使被const修饰也是可以修改其值的，只是它的指针不能够被修改
    let s2 = s1.replaceAll("l","-")
    console.log(s2) // he--o

    // 可以看到字符串s3的前面没有加上空格，是因为他不会修改原本的字符串，会返回新的字符串
    let s3 = s1.padEnd(10)
    s3.padStart(11)
    console.log(s3)
    
}

test5()