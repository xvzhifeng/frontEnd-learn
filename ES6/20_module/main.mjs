/**
 * 在node.js 中，要使用ES6的module语法，去进行导入，需要在package配置里面去配置moduel或者，将文件的后缀改成mjs
 */
import { test,x,test6_name } from './test6.mjs'

import './rename.mjs'

test()
console.log(x)
// 因为name的值在 rename.js中被修改了，然后export 导出的都是引用，就是所以导入的位置修改的都是直接修改的原始module的位置
// 是共享的变量
console.log(test6_name) // rename