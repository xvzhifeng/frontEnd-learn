/**
 * 默认使用commonJS模式，或者可以将后缀改成cjs，就是使用commonJS的模块模式，也可以修改package的配置文件的type字段为commonJs
 */
// commonJS的导入
let test = require('./test')

console.log(test.name)
test.test1()