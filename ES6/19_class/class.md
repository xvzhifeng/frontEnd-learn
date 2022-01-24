# class

## 1. 简介

**类的由来**
JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
var p = new Point(1, 2);
```

上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。

基本上，ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的 class 改写，就是下面这样。

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

上面代码定义了一个“类”，可以看到里面有一个 constructor 方法，这就是构造方法，而 this 关键字则代表实例对象。也就是说，ES5 的构造函数 Point ，对应 ES6 的 Point 类的构造方法。

Point 类除了构造方法，还定义了一个 toString 方法。注意，定义“类”的方法的时候，前面不需要加上 function 这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

ES6 的类，完全可以看作构造函数的另一种写法。

```js
class Point {
  // ...
}
typeof Point // "function"
Point === Point.prototype.constructor // true
```

上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

使用的时候，也是直接对类使用 new 命令，跟构造函数的用法完全一致。

```js
class Bar {
  doStuff() {
    console.log('stuff');
  }
}
var b = new Bar();
b.doStuff() // "stuff"
```

构造函数的 prototype 属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的 prototype 属性上面。

```js
class Point {
  constructor() {
    // ...
  }
  toString() {
    // ...
  }
  toValue() {
    // ...
  }
}
// 等同于
Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

在类的实例上面调用方法，其实就是调用原型上的方法。

```js
class B {}
let b = new B();
b.constructor === B.prototype.constructor // true
```

上面代码中， b 是 B 类的实例，它的 constructor 方法就是 B 类原型的 constructor 方法。

由于类的方法都定义在 prototype 对象上面，所以类的新方法可以添加在 prototype 对象上面。 Object.assign 方法可以很方便地一次向类添加多个方法。

```js
class Point {
  constructor(){
    // ...
  }
}
Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

prototype 对象的 constructor 属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

```js
Point.prototype.constructor === Point // true
```

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```js
class Point {
  constructor(x, y) {
    // ...
  }
  toString() {
    // ...
  }
}
Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

上面代码中， toString 方法是 Point 类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。

```js
var Point = function (x, y) {
  // ...
};
Point.prototype.toString = function() {
  // ...
};
Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

上面代码采用 ES5 的写法， toString 方法就是可枚举的。

## 2. constructor 方法

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。

```js
class Point {
}
// 等同于
class Point {
  constructor() {}
}
```

上面代码中，定义了一个空的类 Point ，JavaScript 引擎会自动为它添加一个空的 constructor 方法。

constructor 方法默认返回实例对象（即 this ），完全可以指定返回另外一个对象。

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}
new Foo() instanceof Foo
// false
```

上面代码中， constructor 函数返回一个全新的对象，结果导致实例对象不是 Foo 类的实例。

类必须使用 new 调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 new 也可以执行。

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}
Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

## 3. class 的继承

Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

```js
class Point {
}
class ColorPoint extends Point {
}
```

上面代码定义了一个 ColorPoint 类，该类通过 extends 关键字，继承了 Point 类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个 Point 类。下面，我们在 ColorPoint 内部加上代码。

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

上面代码中， constructor 方法和 toString 方法之中，都出现了 super 关键字，它在这里表示父类的构造函数，用来新建父类的 this 对象。

子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用 super 方法，子类就得不到 this 对象。

```js
class Point { /* ... */ }
class ColorPoint extends Point {
  constructor() {
  }
}
let cp = new ColorPoint(); // ReferenceError
```

上面代码中， ColorPoint 继承了父类 Point ，但是它的构造函数没有调用 super 方法，导致新建实例时报错。

ES5 的继承，实质是先创造子类的实例对象 this ，然后再将父类的方法添加到 this 上面（ Parent.apply(this) ）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this 。

如果子类没有定义 constructor 方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有 constructor 方法。

```js
class ColorPoint extends Point {
}
// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

另一个需要注意的地方是，在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有 super 方法才能调用父类实例。

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```

上面代码中，子类的 constructor 方法没有调用 super 之前，就使用 this 关键字，结果报错，而放在 super 方法之后就是正确的。

下面是生成子类实例的代码。

```js
let cp = new ColorPoint(25, 8, 'green');
cp instanceof ColorPoint // true
cp instanceof Point // true
```

上面代码中，实例对象 cp 同时是 ColorPoint 和 Point 两个类的实例，这与 ES5 的行为完全一致。

最后，父类的静态方法，也会被子类继承。

```js
class A {
  static hello() {
    console.log('hello world');
  }
}
class B extends A {
}
B.hello()  // hello world
```

上面代码中， hello() 是 A 类的静态方法， B 继承 A ，也继承了 A 的静态方法。

## 4.  Object.getPrototypeOf()

Object.getPrototypeOf 方法可以用来从子类上获取父类。

```js
Object.getPrototypeOf(ColorPoint) === Point
// true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类。

## 5. super 关键字

super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

第一种情况， super 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 super 函数。

```js
class A {}
class B extends A {
  constructor() {
    super();
  }
}
```

上面代码中，子类 B 的构造函数之中的 super() ，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。

注意， super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B 的实例，因此 super() 在这里相当于 A.prototype.constructor.call(this) 。

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```

上面代码中， new.target 指向当前正在执行的函数。可以看到，在 super() 执行时，它指向的是子类 B 的构造函数，而不是父类 A 的构造函数。也就是说， super() 内部的 this 指向的是 B 。

作为函数时， super() 只能用在子类的构造函数之中，用在其他地方就会报错。

```js
class A {}
class B extends A {
  m() {
    super(); // 报错
  }
}
```

上面代码中， super() 用在 B 类的 m 方法之中，就会造成语法错误。

第二种情况， super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```js
class A {
  p() {
    return 2;
  }
}
class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}
let b = new B();
```

上面代码中，子类 B 当中的 super.p() ，就是将 super 当作一个对象使用。这时， super 在普通方法之中，指向 A.prototype ，所以 super.p() 就相当于 A.prototype.p() 。

这里需要注意，由于 super 指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过 super 调用的。

```js
class A {
  constructor() {
    this.p = 2;
  }
}
class B extends A {
  get m() {
    return super.p;
  }
}
let b = new B();
b.m // undefined
```

上面代码中， p 是父类 A 实例的属性， super.p 就引用不到它。

如果属性定义在父类的原型对象上， super 就可以取到。

```js
class A {}
A.prototype.x = 2;
class B extends A {
  constructor() {
    super();
    console.log(super.x) // 2
  }
}
let b = new B();
```

上面代码中，属性 x 是定义在 A.prototype 上面的，所以 super.x 可以取到它的值。

ES6 规定，在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例。

```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}
let b = new B();
b.m() // 2
```

上面代码中， super.print() 虽然调用的是 A.prototype.print() ，但是 A.prototype.print() 内部的 this 指向子类 B 的实例，导致输出的是 2 ，而不是 1 。也就是说，实际上执行的是 super.print.call(this) 。

由于 this 指向子类实例，所以如果通过 super 对某个属性赋值，这时 super 就是 this ，赋值的属性会变成子类实例的属性。

```js
class A {
  constructor() {
    this.x = 1;
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}
let b = new B();
```

上面代码中， super.x 赋值为 3 ，这时等同于对 this.x 赋值为 3 。而当读取 super.x 的时候，读的是 A.prototype.x ，所以返回 undefined 。

如果 super 作为对象，用在静态方法之中，这时 super 将指向父类，而不是父类的原型对象。

```js
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }
  myMethod(msg) {
    console.log('instance', msg);
  }
}
class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }
  myMethod(msg) {
    super.myMethod(msg);
  }
}
Child.myMethod(1); // static 1
var child = new Child();
child.myMethod(2); // instance 2
```

上面代码中， super 在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

另外，在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例。

```js
class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print();
  }
}
B.x = 3;
B.m() // 3
```

上面代码中，静态方法 B.m 里面， super.print 指向父类的静态方法。这个方法里面的 this 指向的是 B ，而不是 B 的实例。

注意，使用 super 的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

```js
class A {}
class B extends A {
  constructor() {
    super();
    console.log(super); // 报错
  }
}
```

上面代码中， console.log(super) 当中的 super ，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这时，如果能清晰地表明 super 的数据类型，就不会报错。

```js
class A {}
class B extends A {
  constructor() {
    super();
    console.log(super.valueOf() instanceof B); // true
  }
}
let b = new B();
```

上面代码中， super.valueOf() 表明 super 是一个对象，因此就不会报错。同时，由于 super 使得 this 指向 B 的实例，所以 super.valueOf() 返回的是一个 B 的实例。

最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用 super 关键字。

```js
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};
obj.toString(); // MyObject: [object Object]
```
