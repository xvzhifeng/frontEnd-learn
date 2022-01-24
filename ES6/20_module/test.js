var name = "test commonJs"
 
let test1 = () => {
    console.log(name)
}

// commonJs 的导出

module.exports.name = name
module.exports.test1 = test1

// 等价
module.exports = {
    name:name,
    test1,test1
};
