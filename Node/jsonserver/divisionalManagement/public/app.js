// 用mockjs模拟生成数据
var Mock = require('mockjs');

test = () => {
    console.log("ttest")
    // 使用 Mock
    var data = Mock.mock({
        'bu|101': [
            {
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1000,
                course_name: '@first',
                autor: '@cname',
                college: '@ctitle(6)',
                'category_Id|1-6': 1
            }
        ],
        'people|101':[
            {
                'id|+1': 1000,
                "name":"@first",
                "sex":'@integer(0,1)',
                "wockerDate":"@date()",
                "manager":"@first",
                "city":"@city('true')"
            }
        ]
    });
    // 返回的data会作为json-server的数据
    console.log(data);
    return data;
};

test()