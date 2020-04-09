MyPromise.prototype.then = function (onResolve, onReject) {
    const self = this
    onResolve = typeof onResolve === 'function' ? onResolve : (v => v);
    onReject = typeof onReject === 'function' ? onReject : (e => e);
    // console.log(onResolve, onReject);
 
    if (self.state === "fulfilled") {
        return new MyPromise((resolve, reject) => {

            let hasReturn = onResolve(self.value)
            console.log("hasReturn",hasReturn);
            
            
            if (hasReturn instanceof MyPromise) {
                // 返回的是一个Promise,使用传入的Promise
                hasReturn.then(resolve);
            } else {
                // 没有返回值undefined Or (v => v)
                // 传递下一个Promise，保证链式调用
                resolve(hasReturn)
            }
            // console.log(new Promise((resolve, reject) => { }));

        })
    } else if (self.state === "rejected") {
        
        return new MyPromise((resolve, reject) => {

            let hasReturn = onReject(self.value) // self.value
            console.log("hasReturn",hasReturn);
            
            if (hasReturn instanceof MyPromise) {
                // 返回的是一个Promise,使用传入的Promise
                hasReturn.then(resolve);
            } else {
                // 没有返回值undefined Or (e => e)
                // 传递下一个Promise，保证链式调用
                reject(hasReturn)
            }

        })
    }

}
MyPromise.prototype.catch = function (onReject) {
    return this.then(null, onReject)
}

export function MyPromise(executor) {
    this.state = "pending" // fulfilled rejected
    this.value = null
    const _this = this

    executor(resolve, reject)

    function resolve(result) {
        _this.state = "fulfilled"
        _this.value = result
    }
    function reject(error) {
        _this.state = "rejected"
        _this.value = error
    }
}



