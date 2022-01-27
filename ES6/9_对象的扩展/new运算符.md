# new 运算符

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

## 语法

```js
new constructor[([arguments])]
```

## 参数

- constructor
一个指定对象实例的类型的类或函数。
- arguments
一个用于被 constructor 调用的参数列表。

## 描述

new 关键字会进行如下的操作：

1. 创建一个空的简单JavaScript对象（即{}）；
2. 为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象 ；
3. 将步骤1新创建的对象作为this的上下文 ；
如果该函数没有返回对象，则返回this。
（译注：关于对象的 constructor，参见 Object.prototype.constructor）

4. 创建一个用户自定义的对象需要两步：

- 通过编写函数来定义对象类型。
- 通过 new 来创建对象实例。

创建一个对象类型，需要创建一个指定其名称和属性的函数；对象的属性可以指向其他对象，看下面的例子：

当代码 new Foo(...) 执行时，会发生以下事情：

1. 一个继承自 Foo.prototype 的新对象被创建。
2. 使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
3. 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）

你始终可以对已定义的对象添加新的属性。例如，car1.color = "black" 语句给 car1 添加了一个新的属性 color，并给这个属性赋值 "black"。但是，这不会影响任何其他对象。要将新属性添加到相同类型的所有对象，你必须将该属性添加到 Car 对象类型的定义中。

你可以使用 Function.prototype 属性将共享属性添加到以前定义的对象类型。这定义了一个由该函数创建的所有对象共享的属性，而不仅仅是对象类型的其中一个实例。下面的代码将一个值为 null 的 color 属性添加到 car 类型的所有对象，然后仅在实例对象 car1 中用字符串 "black" 覆盖该值。

```js
function Car() {}
car1 = new Car();
car2 = new Car();

console.log(car1.color);    // undefined

Car.prototype.color = "original color";
console.log(car1.color);    // original color

car1.color = 'black';
console.log(car1.color);   // black

console.log(car1.__proto__.color) //original color
console.log(car2.__proto__.color) //original color
console.log(car1.color)  // black
console.log(car2.color) // original color
```

如果你没有使用 new 运算符， 构造函数会像其他的常规函数一样被调用， 并不会创建一个对象。在这种情况下， this 的指向也是不一样的。
