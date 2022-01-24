# module

## 1. commonJS 和 ES6 import export 的区别

讨论 Node.js 加载 ES6 模块之前，必须了解 ES6 模块与 CommonJS 模块完全不同。

它们有两个重大差异。

CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
第二个差异是因为 CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

下面重点解释第一个差异。

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件 lib.js的例子。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

上面代码输出内部变量 counter 和改写这个变量的内部方法 incCounter。然后，在main.js 里面加载这个模块。

```js
// main.js
var mod = require('./lib');
console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

上面代码说明，lib.js模块加载以后，它的内部变化就影响不到输出的mod.counter了。这是因为 mod.counter 是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```

上面代码中，输出的 counter 属性实际上是一个取值器函数。现在再执行 main.js ，就可以正确读取内部变量counter的变动了。

```js
$ node main.js
3
4
```

ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import ，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import 加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

还是举上面的例子。

```js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}
// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

上面代码说明，ES6 模块输入的变量counter 是活的，完全反应其所在模块lib.js内部的变化。

再举一个出现在export一节中的例子。

```js
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
// m2.js
import {foo} from './m1.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);
```

上面代码中， m1.js 的变量foo，在刚加载时等于 bar，过了 500 毫秒，又变为等于 baz 。`

让我们看看， m2.js 能否正确读取这个变化。

```js
$ babel-node m2.js
bar
baz
```

上面代码表明，ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。

由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。

```js
// lib.js
export let obj = {};
// main.js
import { obj } from './lib';
obj.prop = 123; // OK
obj = {}; // TypeError
```

上面代码中， main.js 从 lib.js 输入变量 obj ，可以对 obj 添加属性，但是重新赋值就会报错。因为变量 obj 指向的地址是只读的，不能重新赋值，这就好比 main.js 创造了一个名为 obj 的 const 变量。

最后， export 通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。

```js
// mod.js
function C() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}
export let c = new C();
```

上面的脚本 mod.js ，输出的是一个 C 的实例。不同的脚本加载这个模块，得到的都是同一个实例。

```js
// x.js
import {c} from './mod';
c.add();
// y.js
import {c} from './mod';
c.show();
// main.js
import './x';
import './y';

```

现在执行 main.js ，输出的是 1 。

```js
$ babel-node main.js
1
```

这就证明了 x.js 和 y.js 加载的都是 C 的同一个实例。

## 2. Node.js 加载

**概述**
Node.js 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。从 v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

Node.js 要求 ES6 模块采用 .mjs 后缀文件名。也就是说，只要脚本文件里面使用 import或者 export 命令，那么就必须采用 .mjs后缀名。Node.js 遇到 .mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定 "use strict"。

如果不希望将后缀名改成 .mjs ，可以在项目的 package.json 文件中，指定 type 字段为 module 。

```js
{
   "type": "module"
}
```

一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。

**解释成 ES6 模块**
`$ node my-app.js`
如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成 .cjs 。如果没有 type 字段，或者 type 字段为 commonjs ，则 .js 脚本会被解释成 CommonJS 模块。

总结为一句话： .mjs 文件总是以 ES6 模块加载， .cjs 文件总是以 CommonJS 模块加载， .js 文件的加载取决于 package.json 里面 type 字段的设置。

注意，ES6 模块与 CommonJS 模块尽量不要混用。 require 命令不能加载 .mjs 文件，会报错，只有 import 命令才可以加载 .mjs 文件。反过来， .mjs 文件里面也不能使用 require 命令，必须使用 import 。
