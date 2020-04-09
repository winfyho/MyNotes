# 防抖和节流的实现方法

函数防抖，将多次执行的事件合并成一次。函数节流，保持一段时间执行一次。常见实用场景，有滚动加载、搜索框输入、窗口大小拖拽 Resize。


## 防抖(debounce)
案例：当用户多次点击一个按钮时，会重复执行事件造成性能浪费，比如多次点击发送网络请求。防抖的目的就是当多次触发点击事件时，只有当用户超过一段时间（delay）没有点击时，才会执行一次事件

### 1. 延迟执行版本
- 如果timer计时器已经存在，则清除。
- 然后再重新开启一个计时器，如果超过一段时间(delay)该计时器仍然存在，则执行需要的函数func()

``` js
function debounceDelay(func, delay = 1000) {
    let timer = null
    return function () {
        // 延迟执行版本
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            // 通过apply改变this指向，及参数传递
            func.apply(this, arguments)
        }, delay);

    }
}

```

### 2. 立即执行版本
- 第一次点击，则立即执行`func()`
- 然后开启一个计时器，使timer不等于null来保证在一段时间内，无法执行函数
- 用户多次点击则阻止函数执行，并清除计时器，重新开启一个新的保护时间的计时器
- 延迟时间过去后，timer被为null，`func()`失去保护

``` js
function debounceImmed(func, delay = 1000) {
    let timer = null
    return function () {

        // 立即执行版本
        if (timer === null) {
            func.apply(this, arguments)
        }else if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            timer = null
            console.log("超过时间没触发，timer为null");
        }, delay);

    }
}

```





## 节流throttle
案例：浏览器的滚动事件，当用户滚动一段距离，此时滚动事件可能已经触发了几百次。节流就是为了当用户多次触发事件时，**每隔一段时间(wait)内**，只执行一次函数func()

### 1. 时间戳版本
- 初始化上一次执行时间`previous`为0
- 每次触发事件时，now记录当前触发的时间
- 如果(当前触发时间`now` - 上一次触发时间`previous`) > 间隔时间`wait`,则允许执行函数`func()`。否则不允许
- 然后记录已经执行的时间到`previous`

``` js
function throttle(func, wait = 1000) {
    let previous = 0;
    return function() {
        let now = Date.now();
        if (now - previous > wait) {
            func.apply(this, arguments);
            // 执行func后更新前一个时间戳
            previous = now;
        }
    }
}
```

### 2. 定时器版本
- 如果当前不存在保护计时器，则执行函数func()，并开启保护计时器，
- 当用户还在触发事件时，如果保护计时器timer存在，则不允许执行
- 超过间隔时间(wait)，此时timer失效变为null，失去保护

``` js
function throttle(func, wait) {
    let timer = null;
    return function () {

        if (timer === null) {
            timer = setTimeout(() => {
                func.apply(this, arguments)
                timer = null;
            }, wait)
        }

    }
}
```

## 异同比较
相同点：

- 都可以通过使用 setTimeout 实现。
- 目的都是，降低回调执行频率。节省计算资源。

不同点：

- 函数防抖，在一段连续操作结束后，处理回调，利用 clearTimeout 和 setTimeout 实现。函数节流，在一段连续操作中，每一段时间只执行一次，频率较高的事件中使用来提高性能。
- 函数防抖关注一定时间连续触发，只在最后执行一次，而函数节流侧重于一段时间内只执行一次。

