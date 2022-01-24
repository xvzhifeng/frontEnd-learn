/**
 * js 的类，就是ES5中的function，但是为了可读性，添加了Class
 * 对于function和class的区别：就是class必须要new，不能直接和function一样初始化
 */
let test1 = () => {
    class person{
        
        static who() {
            console.log(`person have name and age`)
        }

        constructor(name,age) {
            this.name = name;
            this.age = age;
        }

        toString() {
            return `name:${this.name} , age:${this.age}`
        }
    }

    person.who()

    let p1 = new person('xiaoming', 18);
    let p2 = new person('xiaobai',20)

    console.log(p1.toString())
    // 所有对象共享一个原型
    console.log(p1.prototype == p2.prototype) // true 
    // 类的所有方法都定义在类的 prototype 属性上面。

    console.log(person.prototype.toString())
    console.log(Object.keys(person.prototype))
    console.log(Object.getOwnPropertyNames(person.prototype))

    // 可以通过 修改类的prototyope 给所有的对象添加方法，也就是直接在这些对象的原型上添加方法

    person.prototype.getperson = function() {
        console.log(this.name)
    }

    p1.getperson()
    p2.getperson()
}

/**
 * set and get 方法不能够在已经在constructor里面出现的属性里，再次出现，否则会报错
 */
let test2 = () => {

    class point {

        constructor(x,y) {
            this.x  = x;
            this.y = y;
        }

        set z(x) {
            this.x = x;
            console.log(`set z ${this.x}`)
        }

        get z() {
            console.log(`get z ${this.x}`)
            return this.x
        }
    }

    console.log(1)
    let p1 = new point(1,2)
    p1.x = 2
    p1.y = 100
    p1.z = 1
    console.log(p1.z)
}

/**
 * 在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有 super 方法才能调用父类实例。
 */
let test3 = () => {

    class Point {
        constructor(x, y) {
            // 这是类的实例属性
          this.x = x;
          this.y = y;
        }
      }
      class ColorPoint extends Point {
        constructor(x, y, color) {
        //   this.color = color; // ReferenceError
          super(x, y);
          this.color = color; // 正确
        }

        // super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
        print() {
            console.log(this.x)
            // super里面所取得属性，必须是被继承类得原型属性
            console.log(super.y) // undefined 
        }

        print1() {
            console.log(super.y)
            console.log(this.x)
        }

        print2() {
            // super.x 进行赋值时，等同于this
            super.x = 10
            console.log(this.x) // 10
            console.log(super.x)
        }
      }

      console.log(Object.getPrototypeOf(ColorPoint) === Point) // true

      let cp = new ColorPoint(1,1,'red')
      cp.print()
      cp.print1()
      cp.print2()

}

/**
 * 如果 super 作为对象，用在静态方法之中，这时 super 将指向父类，而不是父类的原型对象。
 */
let test4 = () => {
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
}

test4()