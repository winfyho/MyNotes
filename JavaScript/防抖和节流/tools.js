export function debounce(func, delay = 1000, immediate = true) {
    let timer = null
    return function () {
        if (immediate) {

            // 立即执行版本
            if (timer) {
                clearTimeout(timer)
            } else if (timer === null) {
                func.apply(this, arguments)
            }

            timer = setTimeout(() => {
                timer = null
                console.log("超过时间没触发，timer为null");
            }, delay);

        } else {

            // 延迟执行版本
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                func.apply(this, arguments)
            }, delay);

        }
    }
}
export function debounceDelay(func, delay = 1000) {
    let timer = null
    return function () {

        // 延迟执行版本
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, arguments)
        }, delay);

    }
}

export function debounceImmed(func, delay = 1000) {
    let timer = null
    return function () {

        // 立即执行版本
        if (timer) {
            clearTimeout(timer)
        } else if (timer === null) {
            func.apply(this, arguments)
        }

        timer = setTimeout(() => {
            timer = null
            console.log("超过时间没触发，timer为null");
        }, delay);

    }
}

export function throttle(func, wait = 1000) {
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

// export function throttle(func, wait=1000) {
//     let timer = null;
//     return function () {

//         if (timer === null) {
//             timer = setTimeout(() => {
//                 func.apply(this, arguments)
//                 timer = null;
//             }, wait)
//         }

//     }
// }