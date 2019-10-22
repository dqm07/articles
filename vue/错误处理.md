# Vue错误处理

## 先看错误
```
// 错误1
<div id="app">
  hello, {{ name }}
</div>

// 错误2
const app = new Vue({
  el: '#app',
  computed: {
    name() {
      return x
    }
  }
})

// 错误3
<div id="app">
  <button @click="doIt">Do It</button>
</div>

const app = new Vue({
  el: "#app",
  methods: {
    doIt() {
      return x;
    }
  }
})
```

### 官方解释
> 如果在组件渲染时出现运行错误，错误将会被传递至全局 Vue.config.errorHandler 配置函数。利用这个钩子函数来配合错误跟踪服务。

### 技巧分类
#### 1、errorHandler
```
Vue.config.errorHanlder = function(err, vm, info) {
  console.log(`Error: ${err.toString()}\n Info:${info}`)
}

// Error: ReferenceError: x is not define
// Info: render / v-on handler
```
#### 2、warnHandler
```
Vue.config.warnHandler = function(msg, vm, trace) {
  console.log(`Warn: ${msg}\nTrace: ${trace}`)
}

// Warn: Property or method 'name' is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.
// Trace:

(found in <Root>)
```
#### 3、renderError - only for develop environment with component
```
const app = new Vue({
  el: "#app",
  renderError(h, err) {
    return h("pre", {style: {color: "red"}}, err.stack)
  }
})
```
#### 4、errorCaptured
> 捕获一个来自子孙组件的错误信息，返回错误对象，发送错误组件实例和错误信息来源字符串。可以返回false阻止该错误继续向上传播
```
new Vue({
  ...
  errorCaptured(err, vm, info) {
    console.log(`Error: ${err.toString()}\ninfo: ${info}`);
    return false;
  }
})

// Error: TypeError: dontexist is not a function
// info: render
```
#### 5、window.onerror
```
window.onerror = function(message, source, line, column, error) {
  // msg of error
}
```
优先级方面：errorHandler高于onerror

彩蛋：
- window.onerror = window.close
- Fundebug ( https://www.fundebug.com/ )
- Sentry ( https://sentry.io/welcome/ )

## Vue的错误原理
```
export function handleError (err: Error, vm: any, info: string) {
  if (vm) {
    let cur = vm
    while ((cur = cur.$parent)) {
      const hooks = cur.$options.errorCaptured
      if (hooks) {
        for (let i = 0; i < hooks.length; i++) {
          try {
            const capture = hooks[i].call(cur, err, vm, info) === false
            if (capture) return
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook')
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info)
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler')
    }
  }
  logError(err, vm, info)
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(`Error in ${info}: "${err.toString()}"`, vm)
  }
  /* istanbul ignore else */
  if (inBrowser && typeof console !== 'undefined') {
    console.error(err)
  } else {
    throw err
  }
}
```

```
try {
  ...
} catch (error) {
  handleError(error, vm, 'msg msg')
}
```

可以看到 errorCaptured 和 errorHandler 的触发时机都是相同的，不同的是 errorCaptured 发生在前，且如果某个组件的 errorCaptured 方法返回了 false，那么这个异常信息不会再向上冒泡也不会再调用 errorHandler 方法。

## How About React Error
### ErrorBoundary
自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载。