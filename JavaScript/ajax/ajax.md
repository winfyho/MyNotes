# 原生Js封装AJAX网络请求

W3C官方文档 https://www.w3school.com.cn/ajax/index.asp
MDN https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX

## 1. 创建 XMLHttpRequest 对象
``` js
const xmlhttp=new XMLHttpRequest(); 
```

## 2. 向服务器发送请求

``` js
xmlhttp.open("GET","http://jsonplaceholder.typicode.com/posts",true);
xmlhttp.send();
```
- `open(method,url,async)`  规定请求的类型、URL 以及是否异步处理请求。
    - method：请求的类型；`GET` 或 `POST`
    - url：文件在服务器上的位置
    - async：true（异步）或 false（同步）

- `send(string)`  将请求发送到服务器
    - string：仅用于 POST 请求


## 3. GET还是POST
与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。
然而，在以下情况中，请使用 POST 请求：

- 无法使用缓存文件（更新服务器上的文件或数据库）
- 向服务器发送大量数据（POST 没有数据量限制）
- 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠
  
### GET请求
``` js
xmlhttp.open("GET",URL, true);
xmlhttp.send();
```

### POST请求
如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据：
``` js
xmlhttp.open("POST",URL,true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("name=Jack&age=18");
```
`setRequestHeader(header,value)` 	向请求添加 HTTP头。
- header: 规定头的名称
- value: 规定头的值

## 4. 服务器响应
- responseText 获得字符串形式的响应数据,现在一般使用json数据格式，一般使`responseText`。
- responseXML 获得 XML 形式的响应数据。


## 5. onreadystatechange()  事件
当请求被发送到服务器时，我们需要执行一些基于响应的任务。
每当 readyState 改变时，就会触发 onreadystatechange 事件。
readyState 属性存有 XMLHttpRequest 的状态信息。

- onreadystatechange	存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。
- readyState	存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。

    - 0: 请求未初始化
    - 1: 服务器连接已建立
    - 2: 请求已接收
    - 3: 请求处理中
    - 4: 请求已完成，且响应已就绪
- status	
    - 200: "OK"
    - 404: 未找到页面

``` js
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // 获取服务器放回的json数据，并转换数据类型
        console.log(JSON.parse(xmlhttp.responseText));
    }
}
```


## es6+Promise手写ajax()函数
``` js
export function ajax({url,method,data,timeout}){
    return new Promise((resolve, reject) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open(method, url, true);
        xmlhttp.timeout = timeout || 5000;
        
        if(method === "GET"){
            xmlhttp.send(null);
        }else if(method === "POST"){
            
            let queryList = [];
            for(let key in data){
                queryList.push(`${key}=${encodeURIComponent(data[key])}`);
            }
            let querys = queryList.join('&')

            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send(querys);
        }
        
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log(xmlhttp.readyState,xmlhttp.status);
                
                resolve(JSON.parse(xmlhttp.responseText))
            }
        }
    })
}

```

导入
``` js
<script type="module">
    import {ajax} from "./ajax.js"

    ajax({
        url:"http://jsonplaceholder.typicode.com/posts",
        method:"GET",
        timeout:4000,
    }).then(res => {
        console.log('ajax请求',res);
    }).catch(err=>{
        console.log(err);
    })
    
</script>
```