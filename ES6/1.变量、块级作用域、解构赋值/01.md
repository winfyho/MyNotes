# ES6（一）：let和const、块级作用域、解构赋值

推荐学习 [ECMAScript 6 入门 | 作者：阮一峰](https://es6.ruanyifeng.com/)
地址：https://es6.ruanyifeng.com/

## 1. let命令
### 1.1 基本用法
ES6 新增了`let`命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在`let`命令所在的代码块内有效
for循环的计数器，就很合适使用`let`命令。

``` js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```
如果使用let，声明的变量仅在块级作用域内有效，最后输出的是 6 

### 1.2 不存在变量提升
`var`命令会发生“变量提升”现象，即变量可以在声明之前使用
`let`命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。
``` js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

### 1.3 不允许重复声明
`let`不允许在相同作用域内，重复声明同一个变量
``` js
// 报错
function func() {
  let a = 10;
  let a = 1;
}
```

不能在函数内部重新声明参数
``` js
function func(arg) {
  let arg;
}
func() // 报错
```


## 2. const
### 2.1 基本用法
`const`声明一个只读的常量。一旦声明，常量的值就不能改变
一旦声明变量，就必须立即初始化，不能留到以后赋值,也与let一样不可重复声明。
``` js
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```
`const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效.
``` js
if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined
```

### 2.2 本质
`const`实际上保证是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
``` js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```


## 3.块级作用域


- `var` 声明的变量是`函数级别作用域`，且存在变量提升，因此在解决闭包问题需要使用匿名函数包裹
- `let/const` 声明的变量是`块级作用域{}`，不存在变量提升，只在let命令所在的代码块内有效。比如在for循环中解决闭包问题

因此可以使用let和const完全取代var





## 4.解构赋值

### 4.1数组解构赋值

ES5写法
```js
let a = 1;
let b = 2;
let c = 3;
```
ES6写法
```js
let [a, b, c] = [1, 2, 3];
```
上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。
本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。


### 4.2对象解构赋值

``` js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"
```
对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而**对象的属性没有次序，变量必须与属性同名**，才能取到正确的值。

### 4.3用途
#### （1）交换变量的值

``` js
let x = 1;
let y = 2;

[x, y] = [y, x];
```



#### （2）从函数返回多个值

``` js
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

#### （3）函数参数的定义

``` js
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

#### （4）提取 JSON 数据

``` js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

#### 