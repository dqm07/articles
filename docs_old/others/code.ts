// promise example
const ps = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
})

ps.then(() => {}, () => {})

// promise source code
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class promise{
    fn: any
    status: any
    resolveArr: any[]
    rejectArr: any[]
    value: any
    constructor(fn) {
        this.fn = fn
        this.status = PENDING
        this.value = ''
        this.resolveArr = []
        this.rejectArr = []

        this.fn(this.resolve, this.reject)
    }

    resolve(value: any) {
        this.status = FULFILLED
        this.value = value
        this.resolveArr.forEach((fn) => fn(value))
    }

    reject(value: any) {
        this.status = REJECTED
        this.value = value
        this.rejectArr.forEach((fn) => fn(value))
    }

    then(resolveFn, rejectFn) {
        return new promise((nextResolveFn, nextRejectFn) => {
            switch(this.status) {
                case PENDING:
                    this.resolveArr.push(resolveFn)
                    this.rejectArr.push(rejectFn)
                    break
                case FULFILLED:
                    const res = resolveFn(this.value)
                    nextResolveFn(res)
                    break
                case REJECTED:
                    const err = rejectFn(this.value)
                    nextRejectFn(err)
                    break
            }
        })
    }
}

// apply/call/bind
// fn.apply(this, [])
// fn.call(this, 1, 2, 3)
// const fn1 = fn.bind(this)
Function.prototype.apply = function(context, ...args) {
    context.fn = this
    context.fn(args)
    delete context.fn
}

Function.prototype.bind = function(context, ...args) {
    let fn = this

    return function() {
        return fn.apply(context, args)
    }
}

// hooks原理 - setState
let firstRun = true
let states: any[] = []
let setters: any[] = []
let cursor = 0

function setSetters(cursor) {
    return function aaa(newVal) {
        states[cursor] = newVal
    }
}

function setState(defaultValue) {
    if (firstRun) {
        states.push(defaultValue)
        setters.push(setSetters(cursor))
        firstRun = false
    }

    const state = states[cursor]
    const setter = setters[cursor]

    cursor++
    return [state, setter]
}

// 观察者模式
function Dep() {
    this.subs = []
}

Dep.prototype.addSubs = (sub) => {
    this.subs.push(sub)
}

Dep.prototype.notify = () => {
    this.subs.forEach(sub => sub.update())
}

function Watcher(fn) {
    this.fn = fn
}

Watcher.prototype.update = () => {
    this.fn()
}

let d = new Dep()
d.addSubs(new Watcher(() => {
    console.log('111')
}))

d.notify()

// 发布订阅模式
class EventEmitter {
    subs: {}
    constructor() {
        this.subs = {}
    }

    emit(type, callback) {
        if (!this.subs[type]) this.subs[type] = []

        this.subs[type].push(callback)
    }

    on(type, ...args) {
        if (this.subs[type]) {
            this.subs[type].forEach(fn => fn.call(this, ...args))
        }
    }
}

// 洋葱模型
function compose(middlewares) {
    return function(context, next) {
        function dispatch(i) {
            if (i > middlewares.length) return

            let fn = middlewares[i]
            if (i === middlewares.length) fn = next
            if (!fn) fn = Promise.resolve()

            return Promise.resolve(fn(context, function next() {
                return dispatch(i + 1)
            }))
        }

        dispatch(0)
    }
}

// 柯里化
let addFun = function(a, b, c) { return a + b + c }
let fn = curry(addFun)
fn(2)(3)(4) = 9

function curry(fn) {
    const limit = fn.length
    return function judgeCurry(...args) {
        if (args.length >= limit) {
            fn.apply(null, args)
        } else {
            return function(...args2) {
                return judgeCurry.apply(null, args.concat(args2))
            }
        }
    }
}

// 节流防抖

function jl(fn) {
    let st: number | null = null
    return function(time) {
        if (st) return
        st = setTimeout(() => {
            fn.call(this, arguments)
            st && clearTimeout(st)
        }, time)
    }
}

let timestamp = 0
function fd(fn) {
    let timeout = null
    return function(time) {
        timeout && clearTimeout(time)
        timeout = setTimeout(() => {
            fn.call(this, arguments)
        }, time)
    }
}
