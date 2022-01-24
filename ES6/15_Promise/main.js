/**
 * Promise ，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
 * 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息
 */
let test1 = () => {
    function test(resolve, reject) {
        // 需要异步处理的逻辑
        console.log("hello promise")
        reject()
    }
    // 初始化一个Promise。参数是一个函数，表示执行成功或失败
    let promise1 = new Promise(test)
    promise1.then(
        // 回调函数
        // 根据异步函数的结果，进行相应的处理
        // then一般表示成功
        function(){
            console.log("promise1 then")
        }
    ).catch(
        // 回调函数
        // 根据异步函数的结果，进行相应的处理
        // catch 一般表示失败
        function() {
            console.log("rejected")
        }
    ).finally(
        // 不管异步函数出现什么情况，都会执行
        () => {
            console.log("一定执行的")
        }
    )
    console.log("normal")
    //  上面代码中，Promise 新建后立即执行，所以首先输出的是 Promise 。
    // 然后， then 方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以 resolved 最后输出。
    
}

test1()