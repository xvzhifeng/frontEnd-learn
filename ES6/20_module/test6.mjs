var name = "ES6"
var value = "test ES6"

var x = 1;

let test = () => {
    console.log(name, value)
}

let test1 = () => {
    console.log(x)
}

let rename = function(name1) {
    name = name1;
}

export {name as test6_name, value, x, test, test1,rename}
