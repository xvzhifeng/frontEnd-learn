# fetch和axios的区别

## 一、fecth与xios的定义

fecth是浏览器提供的一个api，而axios是社区封装的一个组件
fecth是一个低底层的api，是W3C的正式标准，使用起来不怎么舒服，所以需要封装，以便使用。

## 二、**fetch和axios的区别**

fetch是规范底层api
axios是封装

### fetch的优点

- 语法简洁，更加语义化
- 基于标准Promise实现，支持async/await
- 更加底层，提供的API丰富
- 底层原生支持
- 是由whatwg组织提出，是w3c的规范



### fetch的缺点

	fetch是一个底层api，使用不便，需重新封装

1. fetch只对网络请求报错，对400,500都当做成功的请求，服务器返回400,500错误码时并不会reject,只有网络错误导致这些请求不能完成时，fetch才会被reject。

2. fetch默认不会带cookie,需要添加配置项:fetch(url,{credentials:‘include’})

3. fetch不支持abort,不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止过程继续在后台运行，造成了流量的浪费

4. fetch没有办法原生检测请求的进度，而XHR可以（进度条）

   

   ```js
   //fetch举例
   fetch('httpp://example.com/movies.js') //第二个参数 指定get/post
   .then(function(response){
   	return response.json();
   })
   .then(function(myJson){
   	console.log(myJson);
   });
   ```



### **axios的优点**

axios是一个基于Promise用于浏览器和nodejs的http客户端，本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范，它本身具有以下特征：

1. 从浏览器中创建XMLHttpRequest
2. 支持Promise API
3. 客户端支持防止CSRF
4. 提供了一些并发请求的接口（！方便了很多操作）
5. 从node.js创建http请求
6. 拦截请求和响应
7. 转换请求和响应数据（请求A服务器可以转换到B服务器）
8. 中断请求
9. 自动转换JSON数据（fetch API需要手动处理返回的数据）



```js
//axios举例
xios.get('/user'{
	params:{
		ID:0512
	}
})
.then(funtion(response){
	console.log(response);
})
.catch(function(error){
	console.log(error);
});
```

