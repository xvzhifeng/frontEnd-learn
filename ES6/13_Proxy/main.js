
/**
 * Proxy可以理解成，在目标对象之前架设一层“拦截”，
 * 外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
 * Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
 */
let test1 = () => {
    // 相当于重写，对象的get和set方法，在每次调用前，进行输出
    var obj = new Proxy({}, {
        get: function (target, propKey, receiver) {
          console.log(`getting ${propKey}!`);
          return Reflect.get(target, propKey, receiver);
        },
        set: function (target, propKey, value, receiver) {
          console.log(`setting ${propKey}!`);
          return Reflect.set(target, propKey, value, receiver);
        }
      });

      obj['test'] = 1;  // setting test!
      console.log(obj.test) // getting test! 1
}

// proxy apply方法
let test2 = () => {
    var twice = {
        // apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（ this ）和目标对象的参数数组
        apply (target, ctx, args) {
            for(let [key,value] of Object.entries(arguments)) {
                console.log(key,value)
            }
            // console.log(...arguments)
          return Reflect.apply(...arguments) * 2;
        }
      };
      function sum (left, right) {
        return left + right;
      };
      var proxy = new Proxy(sum, twice);
      console.log(proxy(1, 2)) // 6
      console.log(proxy.call(null, 5, 6)) // 22
      console.log(proxy.apply(null, [7, 8])) // 30
}

test2()