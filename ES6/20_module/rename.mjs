import { test,rename,test6_name } from "./test6.mjs"
// import { test,x } from './test6.mjs'
let t_name = test6_name
test()
console.log(test6_name)
rename("rename")
console.log(test6_name) // rename
test6_name
console.log("t_name a" + t_name)
test()