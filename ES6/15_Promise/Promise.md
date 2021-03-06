# Promise

## 1. Promise 的含义

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象。

所谓 Promise ，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise 对象有以下两个特点。

（1）对象的状态不受外界影响。 Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。 Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected 。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

注意，为了行文方便，本章后面的 resolved 统一只指 fulfilled 状态，不包含 rejected 状态。

有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外， Promise 对象提供统一的接口，使得控制异步操作更加容易。

Promise 也有一些缺点。首先，无法取消 Promise ，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数， Promise 内部抛出的错误，不会反应到外部。第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署 Promise 更好的选择。

## 2. promise 简单使用

```js
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
```
