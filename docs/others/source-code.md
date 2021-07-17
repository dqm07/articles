# 源码

## Vue2.0响应式原理
```js
let dep = new Dep()
Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    getter() {
        // 加入依赖
        if (Dep.target) {
            dep.depend()
        }
        return obj[key]
    },
    setter(val) {
        obj[key]=val
        // 更新依赖
        dep.notify()
    }
})

class Dep {
    constructor() {
        this.subs = []
    }

    depend(sub: Watcher) {
        this.subs.push(sub)
    }

    notify() {
        let subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

class Watcher{
    constructor(obj, key, cb) {
        this.obj = obj
        this.key = key
        this.cb = cb
    }

    update() {
        this.value = this.obj[this.key]
        this.cb(this.value)
    }
}

```

## 观察者模式
```js
function Dep() {
    this.subs = []
}

Dep.prototype.addSub = function(sub) {
    this.subs.push(sub)
}

Dep.prototype.notify = function() {
    this.subs.forEach(sub => sub.update())
}

function Watcher(fn) {
    this.fn = fn
}

Watcher.prototype.update = function() {
    this.fn()
}

let dep = new Dep()
dep.addSub(new Watcher(function() {
    console.log('watcher update')
}))

dep.notify()
```

## 发布订阅模式
```js
// emit on
class EmitEvent {
    constructor() {
        this._events = {}
    }

    on(type, callback) {
        if(!this._events[type]) this._event[type] = []

        this._event[type].push(callback)
    }

    emit(type, ...args) {
        if (this._events[type]) {
            this._events[type].call(this, ...args)
        }
    }
}
```

## 深拷贝
```js
function deepClone(obj) {
    let result;
    if (typeof obj !== 'object') {
        return
    }

    if (Array.isArray(obj)) {
        result = []
    } else {
        result = {}
    }

    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
            result[key] = deepClone(obj[key])
        } else {
            result[key] = obj[key]
        }
    })

    return result;
}
```

## 手写promise
```js
new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('1111')
    }, 1000)
})

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise() {
    constructor(fn) {
        this.fn = fn
        this.status = PENDING
        this.value = ''
        this._resolveArr = []
        this._rejectArr = []

        this.fn(this.resolve, this.reject)
    }

    resolve(value) {
        this.value = value
        this.status = FULFILLED
        if (value instanceof Promise) {
            value.then(_v => {
                this.value = _v
            }, _e => {
                this.value = _e
            })
        }
        this._resolveArr.forEach(fn => fn(this.value))
    }

    reject(err) {
        this.value = err
        this.status = REJECTED
        if (err instanceof Promise) {
            err.then(_v => {
                this.value = _v
            }, _e => {
                this.value = _e
            })
        }
        this._rejectArr.forEach(fn => fn(this.value))
    }

    then(resolveFn, rejectFn) {
        return new Promise((onResolveNext, onRejectNext) => {
            switch(this.status) {
                case PENDING:
                    this._resolveArr.push(resolveFn)
                    this._rejectArr.push(rejectFn)
                    break
                case FUFILLED:
                    if (!isFunction) {
                        onResolveNext(this.value)
                    } else {
                        let res = resolveFn(this.value)
                        if (res instanceof Promise) {
                            res.then(onResolveNext, onRejectNext)
                        } else {
                            onResolveNext(res)
                        }
                    }
                    break
                case REJECTED:
                    let err = rejectFn(this.value)
                    onRejectNext(err)
                    break
            }
        })
    }
}
```

## 洋葱模型
```js
function compose(middlewares) {
    return function(context, next) {

        dispatch(0)

        function dispatch(i) {
            if (i > middlewares.length) return

            let fn = middlewares[i]
            if (i === middlewares.length) fn = next
            if (!fn) fn = Promise.resolve()

            try {  
                return Promise.resolve(fn(context, function next(){
                    return dispatch(i + 1)
                })
            } catch(err) {
                return Promise.reject(err)
            }
        }
    }
}
```