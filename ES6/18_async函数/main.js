/**
 * async 函数就是将 Generator 函数的星号（ * ）替换成 async ，将 yield 替换成 await ，仅此而已。
 * 但是async函数的可读行会高很多
 */
function test1() {
    function timeout(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    async function asyncPrint(value, ms) {
        await timeout(ms);
        console.log(value);
    }
    asyncPrint('hello world', 50);

}

/**
 * 由于 async 函数返回的是 Promise 对象，
 * 可以作为 await 命令的参数。所以，上面的例子也可以写成下面的形式
 */
function test2() {
    async function timeout(ms) {
        await new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    async function asyncPrint(value, ms) {
        await timeout(ms);
        console.log(value);
    }
    asyncPrint('hello world', 50);

}

/**
 * async 函数返回一个Promise对象。
 * async 函数内部return 语句返回的值，会成为then 方法回调函数的参数。
 * 
 */
function test3() {
    async function f() {
        return 'hello world';
      }
      f().then(v => console.log(v))
      // "hello world"
}

/**
 * async 函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。
 * 抛出的错误对象会被 catch方法回调函数接收到。
 */
function test4() {
    async function f() {
        throw new Error('出错了');
      }
      f().then(
        v => console.log(v),
        e => console.log(e)
      )
      // Error: 出错了
}

test1()
test2()
test3()
test4()