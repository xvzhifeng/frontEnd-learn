# Reflect  

## 1. 概述

 （1） 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty ），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。

（2） 修改某些 Object 方法的返回结果，让其变得更合理。比如， Object.defineProperty(obj, name, desc) 在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc) 则会返回 false 。

```js
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}
// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}

```

（3） 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name] ，而 Reflect.has(obj, name) 和 Reflect.deleteProperty(obj, name) 让它们变成了函数行为。

```js
// 老写法
'assign' in Object // true
// 新写法
Reflect.has(Object, 'assign') // true
```

（4） Reflect对象的方法与 Proxy对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

```js
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
```

上面代码中， Proxy 方法拦截 target 对象的属性赋值行为。它采用 Reflect.set 方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。

## 2. 静态方法

Reflect对象一共有13个静态方法。

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

上面这些方法的作用，大部分与 Object 对象的同名方法的作用都是相同的，而且它与 Proxy 对象的方法是一一对应的。下面是对它们的解释。

### 2.1 Reflect.get(target, name, receiver)

Reflect.get方法查找并返回 target 对象的 name 属性，如果没有该属性，则返回 undefined 。

```js
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
}
Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3
```

如果 name 属性部署了读取函数（getter），则读取函数的 this 绑定 receiver 。

```js
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};
var myReceiverObject = {
  foo: 4,
  bar: 4,
};
Reflect.get(myObject, 'baz', myReceiverObject) // 8
```

如果第一个参数不是对象， Reflect.get 方法会报错。

```js
Reflect.get(1, 'foo') // 报错
Reflect.get(false, 'foo') // 报错
```

### 2.2 Reflect.set(target, name, value, receiver)

Reflect.set方法设置target 对象的 name 属性等于 value 。

```js
var myObject = {
  foo: 1,
  set bar(value) {
    return this.foo = value;
  },
}
myObject.foo // 1
Reflect.set(myObject, 'foo', 2);
myObject.foo // 2
Reflect.set(myObject, 'bar', 3)
myObject.foo // 3
```

如果 name 属性设置了赋值函数，则赋值函数的 this 绑定 receiver 。

```js
var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};
var myReceiverObject = {
  foo: 0,
};
Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1
```

注意，如果 Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了 receiver ，那么 Reflect.set 会触发 Proxy.defineProperty 拦截。

```js
let p = {
  a: 'a'
};
let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};
let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty
```

**Reflect.has(obj, name)**
Reflect.has方法对应name in obj里面的in运算符。

```js
var myObject = {
  foo: 1,
};
// 旧写法
'foo' in myObject // true
// 新写法
Reflect.has(myObject, 'foo') // true
```

如果 Reflect.has() 方法的第一个参数不是对象，会报错。

### 2.3 Reflect.deleteProperty(obj, name)

Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。

```js
const myObj = { foo: 'bar' };
// 旧写法
delete myObj.foo;
// 新写法
Reflect.deleteProperty(myObj, 'foo');
```

该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回 true ；删除失败，被删除的属性依然存在，返回 false 。

如果 Reflect.deleteProperty() 方法的第一个参数不是对象，会报错。

### 2.4 Reflect.construct(target, args)

Reflect.construct 方法等同于 new target(...args)，这提供了一种不使用 new ，来调用构造函数的方法.

```js
function Greeting(name) {
  this.name = name;
}
// new 的写法
const instance = new Greeting('张三');
// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
```

如果 Reflect.construct() 方法的第一个参数不是函数，会报错。

### 2.5 Reflect.getPrototypeOf(obj)

Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应 Object.getPrototypeOf(obj) 。

```js
const myObj = new FancyThing();
// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;
// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;
```

Reflect.getPrototypeOf 和 Object.getPrototypeOf 的一个区别是，如果参数不是对象， Object.getPrototypeOf 会将这个参数转为对象，然后再运行，而 Reflect.getPrototypeOf 会报错。

```js
Object.getPrototypeOf(1) // Number {[[PrimitiveValue]]: 0}
Reflect.getPrototypeOf(1) // 报错
```

### 2.6 Reflect.setPrototypeOf(obj, newProto)

Reflect.setPrototypeOf 方法用于设置目标对象的原型（prototype），对应 Object.setPrototypeOf(obj, newProto) 方法。它返回一个布尔值，表示是否设置成功。

```js
const myObj = {};
// 旧写法
Object.setPrototypeOf(myObj, Array.prototype);
// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype);
myObj.length // 0
```

如果无法设置目标对象的原型（比如，目标对象禁止扩展）， Reflect.setPrototypeOf 方法返回 false 。

```js
Reflect.setPrototypeOf({}, null)
// true
Reflect.setPrototypeOf(Object.freeze({}), null)
// false
```

如果第一个参数不是对象， Object.setPrototypeOf 会返回第一个参数本身，而 Reflect.setPrototypeOf 会报错。

### 2.7 Reflect.apply(func, thisArg, args)

Reflect.apply方法等同于 Function.prototype.apply.call(func, thisArg, args) ，用于绑定 this 对象后执行给定函数。

一般来说，如果要绑定一个函数的 this 对象，可以这样写 fn.apply(obj, args) ，但是如果函数定义了自己的 apply 方法，就只能写成 Function.prototype.apply.call(fn, obj, args) ，采用 Reflect 对象可以简化这种操作。

```js
const ages = [11, 33, 12, 54, 18, 96];
// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);
// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
```

### 2.8 Reflect.defineProperty(target, propertyKey, attributes)

Reflect.defineProperty方法基本等同于Object.defineProperty ，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用 Reflect.defineProperty 代替它。

```js
function MyDate() {
  /*…*/
}
// 旧写法
Object.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});
// 新写法
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});
```

如果 Reflect.defineProperty 的第一个参数不是对象，就会抛出错误，比如 Reflect.defineProperty(1, 'foo') 。

### 2.9 Reflect.getOwnPropertyDescriptor(target, propertyKey)

Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。

### 2.10 Reflect.isExtensible (target)

Reflect.isExtensible方法对应Object.isExtensible ，返回一个布尔值，表示当前对象是否可扩展。

```js
const myObject = {};
// 旧写法
Object.isExtensible(myObject) // true
// 新写法
Reflect.isExtensible(myObject) // true
```

如果参数不是对象， Object.isExtensible 会返回 false ，因为非对象本来就是不可扩展的，而 Reflect.isExtensible 会报错。

### 2.11 Reflect.preventExtensions(target)

Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。

```js
var myObject = {};
// 旧写法
Object.preventExtensions(myObject) // Object {}
// 新写法
Reflect.preventExtensions(myObject) // true
```

### 2.12 Reflect.ownKeys (target)

Reflect.ownKeys方法用于返回对象的所有属性，基本等同于 Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols之和。

```js
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};
// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']
Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]
// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
```

如果 Reflect.ownKeys() 方法的第一个参数不是对象，会报错。
