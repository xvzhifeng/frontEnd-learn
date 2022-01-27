// 当调用 Symbol 的时候，会采用以下步骤：
//1. 如果使用 new ，就报错
//2. 如果 description 是 undefined，让 desc 为 undefined 否则 让 descString 为 ToString(description)
//3. 返回一个新的唯一的 Symbol 值，它的内部属性 [[Description]] 值为 descString
// 4 keyFor
let generateName = (function(){
    var postfix = 0
    return function(desc) {
      postfix++
      return '@@' + desc + postfix
    }
  })()

  function Symbol(description) {
    // 1, 如果使用 new ，就报错
    
    if (this instanceof Symbol) {
      return new TypeError('Symbol is not constructor') // 实现第一点不可以使用new 调用
    }
    // 2  3如果 description 是 undefined，让 desc 为 undefined 否则 让 descString 为 ToString(description)
    let desc = description === undefined ? undefined : String(description)
   
    let symbol = Object.create({
      toString: function() {
        console.log(this._Name_)
        return this._Name_
      },
      valueOf: function () {
        return this;
      }
   
    })
    Object.defineProperties(symbol, {
      "_Description_" : {
        value: '',
        writable: false,
        enumerable: false,
        configurable: false
      },
      '_Name_': {
        value: generateName(description),
        writable: false,
        enumerable: false,
        configurable: false
      }
    })
    console.log(symbol)
    //3 因为调用该方法，返回的是一个新对象，两个对象之间，只要引用不同，就不会相同
    //  Symbol 函数的参数只是表示对当前 Symbol 值的描述，相同参数的 Symbol 函数的返回值是不相等的
    return symbol
  }
  var forMap = {};
  // Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key
  Object.defineProperties(Symbol, {
      'for': {
          value: function (description) {
              var descString = description === undefined ? undefined : String(description)
              return forMap[descString] ? forMap[descString] : forMap[descString] = Symbol(descString); // 如果有就直接返回 重新使用同一个Symbol
          },
          writable: true,
          enumerable: false,
          configurable: true
      },
      'keyFor': {
          value: function (symbol) {
              for (var key in forMap) {
                  if (forMap[key] === symbol) return key;
              }
          },
          writable: true,
          enumerable: false,
          configurable: true
      }
  })
   
   