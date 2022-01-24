 
 /**
  * Reflect 对象与Proxy 对象一样，也是 ES6 为了操作对象而提供的新 API
  */
 let test1 = () => {

    let obj = {
        "test":"test"
    }

    console.log(Reflect.has(obj, "test")) // true
    // 使用反射去添加一个属性
    Reflect.set(obj,"test1","test")
    // 使用反射去获得属性的值
    console.log(Reflect.get(obj,"test1")) // test

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
      let res = Reflect.get(myObject, 'baz', myReceiverObject) // 8
      console.log(res)
 }

 let test2 = () => {
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
      console.log(myObject.foo) // 4
      console.log(myReceiverObject.foo) // 1

      // 注意，如果 Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，
      // 而且传入了 receiver ，那么 Reflect.set 会触发 Proxy.defineProperty 拦截
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
 }

 let test3 = () => {
    function Greeting(name) {
        this.name = name;
      }
      // new 的写法
      const instance = new Greeting('张三');
      // Reflect.construct 的写法
      const instance1 = Reflect.construct(Greeting, ['张三']);
      console.log(instance1)
      Reflect.defineProperty(instance1,"age",{
          value:18
      })
      Reflect.deleteProperty(instance1,"name")
      Reflect.defineProperty(instance1,"email",{
          value: "@test.com"
        })
      console.log(Reflect.ownKeys(instance1))

      // 什么都没获取到
      for(let v of Object.keys(instance1)) {
          console.log(v,"1")
      }
      console.log(instance1)
 }

 test3()