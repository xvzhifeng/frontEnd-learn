
/**
 * 遍历器的基本原理
 * Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对象。
其中， value 属性是当前成员的值， done 属性是一个布尔值，表示遍历是否结束。
 */
let test1 = () => {
    var it = makeIterator(['a', 'b']);
    console.log(it.next()) // { value: "a", done: false }
    console.log(it.next()) // { value: "b", done: false }
    console.log(it.next()) // { value: undefined, done: true }
    function makeIterator(array) {
        var nextIndex = 0;
        return {
            next: function () {
                return nextIndex < array.length ?
                    { value: array[nextIndex++], done: false } :
                    { value: undefined, done: true };
            }
        };
    }
}

test1()