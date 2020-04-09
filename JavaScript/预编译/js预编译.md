## 1. 函数运行前进行预编译
创建AO对象，寻找`var`、`function`关键字
原函数test()
``` js
function test(a) {

    var a = 1;

    var b = 2;

    function a() {}

    function d() {}

    var c = function () {}
}
```
创建AO对象，值都暂时为`undefined`
``` js
// AO对象
AO = {
    a : underfined,
    b : underfined,
    d : underfined,
    c : underfined
}
```
变量提升后，函数的实际情况
``` js
function test(a) {
    var a = undefined;
    var b = undefined;
    var d = undefined;
    var c = undefined;

    a = 1;

    b = 2;

    function a() {}

    function d() {}

    c = function () {}
}
```

## 2. 对函数的参数赋值
``` js
test(5)

// AO对象
AO = {
    // 此时a被赋值为5
    a : 5,
    b : underfined,
    d : underfined,
    c : underfined

}
```



## 3. 执行函数前，寻找内部的`function`进行提升

``` js
// 将声明的函数提升到最前面
function test(a) {
    // 函数提升
    function a(){}
    function d() {}

    var a = 1;

    var b = 2;

    // function a(){}
    // function d() {}

    var c = function () {}

}

// AO对象变为
AO = {
    a : function(){},
    b : undefined,
    d : function(){},
    c : undefined
}
```
## 4. 执行函数，按序进行赋值`=`操作

``` js
// 将声明的函数提升到最前面
function test(a) {
    // 函数提升
    function a(){}
    function d() {}

    console.log(a,b,d,c)// function undefined function undefined

    var a = 1;

    console.log(a);// 1

    var b = 2;

    console.log(b);// 2

    // 被提升的函数
    // function a(){}
    // function d() {}
    var c = function () {}

    console.log(c);// function


    
}
```

``` js
// 最终AO对象变为
AO = {
    a : 1,
    b : 2,
    d : function(){},
    c : function(){}
}
```