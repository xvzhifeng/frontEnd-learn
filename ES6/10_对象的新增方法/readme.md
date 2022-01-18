# 对象的新增方法

## 1. Object.is()

ES5 比较两个值是否相等，只有两个运算符：相等运算符（ == ）和严格相等运算符（ === ）。它们都有缺点，前者会自动转换数据类型，后者的 NaN 不等于自身，以及 +0 等于 -0 。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

```js
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
```

不同之处只有两个：一是 +0 不等于 -0 ，二是 NaN 等于自身。

```js
+0 === -0 //true
NaN === NaN // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

 在执行比较时， 相等运算符（ == ）将在继续操作之前尝试使数据类型相同 。另一方面， 身份运算符（ === ）要求这两种数据类型必须相同，作为前提 。

 ## 2. Object.assign()

**基本用法**
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

```js
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
Object.assign 方法的第一个参数是目标对象，后面的参数都是源对象。
```

注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

```js
const target = { a: 1, b: 1 };
const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

如果只有一个参数，Object.assign 会直接返回该参数。

```js
const obj = {a: 1};
Object.assign(obj) === obj // true
```

如果该参数不是对象，则会先转成对象，然后返回。

```js
typeof Object.assign(2) // "object"
```

由于 undefined 和 null 无法转成对象，所以如果它们作为参数，就会报错。

```js
Object.assign(undefined) // 报错
Object.assign(null) // 报错
```

如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果 undefined 和 null 不在首参数，就不会报错。

```js
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
```

**注意点**
（1）浅拷贝

Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

```js
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
obj2.a.b // 2
```

上面代码中，源对象 obj1 的 a 属性的值是一个对象， Object.assign 拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。

（2）同名属性的替换

对于这种嵌套的对象，一旦遇到同名属性， Object.assign 的处理方法是替换，而不是添加。

```js
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
```

上面代码中， target 对象的 a 属性被 source 对象的 a 属性整个替换掉了，而不会得到 { a: { b: 'hello', d: 'e' } } 的结果。这通常不是开发者想要的，需要特别小心。

一些函数库提供 Object.assign 的定制版本（比如 Lodash 的 _.defaultsDeep 方法），可以得到深拷贝的合并。

（3）数组的处理

Object.assign 可以用来处理数组，但是会把数组视为对象。

```js
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```

上面代码中， Object.assign 把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性 4 覆盖了目标数组的 0 号属性 1 。

（4）取值函数的处理

```js
Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

const source = {
  get foo() { return 1 }
};
const target = {};
Object.assign(target, source)
// { foo: 1 }
```

上面代码中， source 对象的 foo 属性是一个取值函数， Object.assign 不会复制这个取值函数，只会拿到值以后，将这个值复制过去。

**常见用途**
Object.assign 方法有很多用处。

（1）为对象添加属性

```js
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```

上面方法通过 Object.assign 方法，将 x 属性和 y 属性添加到 Point 类的对象实例。

（2）为对象添加方法

```js
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});
// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```

上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用 assign 方法添加到 SomeClass.prototype 之中。

（3）克隆对象

```js
function clone(origin) {
  return Object.assign({}, origin);
}
```

上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。

不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。

```js
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```

（4）合并多个对象

将多个对象合并到某个对象。

```js
const merge =
  (target, ...sources) => Object.assign(target, ...sources);
```

如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。

```js
const merge =
  (...sources) => Object.assign({}, ...sources);
```

（5）为属性指定默认值

```js
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};
function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}
```

上面代码中， DEFAULTS 对象是默认值， options 对象是用户提供的参数。 Object.assign 方法将 DEFAULTS 和 options 合并成一个新对象，如果两者有同名属性，则 options 的属性值会覆盖 DEFAULTS 的属性值。

注意，由于存在浅拷贝的问题， DEFAULTS 对象和 options 对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则， DEFAULTS 对象的该属性很可能不起作用。

```js
const DEFAULTS = {
  url: {
    host: 'example.com',
    port: 7070
  },
};
processContent({ url: {port: 8000} })
// {
//   url: {port: 8000}
// }
```

上面代码的原意是将 url.port 改成 8000， url.host 不变。实际结果却是 options.url 覆盖掉 DEFAULTS.url ，所以 url.host 就不存在了。

## 3. Object.getOwnPropertyDescriptors()

ES5 的 Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。

```js
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};
Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

上面代码中，Object.getOwnPropertyDescriptors()方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。

该方法的实现非常容易。

```js
function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}
```

该方法的引入目的，主要是为了解决 Object.assign() 无法正确拷贝 get 属性和 set 属性的问题。

```js
const source = {
  set foo(value) {
    console.log(value);
  }
};
const target1 = {};
Object.assign(target1, source);
Object.getOwnPropertyDescriptor(target1, 'foo')
// { value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true }

```

上面代码中， source对象的 foo属性的值是一个赋值函数， Object.assign 方法将这个属性拷贝给 target1 对象，结果该属性的值变成了 undefined 。这是因为 Object.assign 方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。

这时， Object.getOwnPropertyDescriptors() 方法配合 Object.defineProperties() 方法，就可以实现正确拷贝。

```js
const source = {
  set foo(value) {
    console.log(value);
  }
};
const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }
```

上面代码中，两个对象合并的逻辑可以写成一个函数。

```js
const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
);
```

## 4. proto 属性，Object.setPrototypeOf()，Object.getPrototypeOf()

JavaScript语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。

**proto属性**
`__proto__` 属性（前后各两个下划线），用来读取或设置当前对象的原型对象（prototype）。目前，所有浏览器（包括 IE11）都部署了这个属性。

```js
// es5 的写法
const obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;
// es6 的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
```

**Object.setPrototypeOf()**
Object.setPrototypeOf方法的作用与 __proto__相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。

```js
// 格式
Object.setPrototypeOf(object, prototype)
// 用法
const o = Object.setPrototypeOf({}, null);
该方法等同于下面的函数。

function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

**Object.getPrototypeOf()**
该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。

`Object.getPrototypeOf(obj);`
下面是一个例子。

```js
function Rectangle() {
  // ...
}
const rec = new Rectangle();
Object.getPrototypeOf(rec) === Rectangle.prototype
// true
Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
```

## 5. Object.keys()，Object.values()，Object.entries()

**Object.keys()**
ES5 引入了 Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

```js
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```

ES2017 引入了跟 Object.keys配套的Object.values和 Object.entries ，作为遍历一个对象的补充手段，供 for...of 循环使用。

```js
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };
for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}
for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}
for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

## 6. Object.fromEntries()

Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。

```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。

该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。

```js
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }
```