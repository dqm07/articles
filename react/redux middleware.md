# redux异步数据流
createStore支持的是同步数据流，但是可以通过middleware来增加createStore的能力，实现异步数据流。

支持异步的middleware都包装了store的dispatch方法，依次来实现dispatch一些除了action之外的其他内容。

提示：middleware链中的最后一个middleware执行dispatch的时候，action必须是一个普通对象。（同步式的redux数据流）

# Redux Middleware

> 它提供的是位于action被发起之后，到达reducer之前的扩展点

这个阶段可以做什么？

日志创建、创建崩溃报告、调用异步接口或者路由等。

那这个中间件的思维如何生成？可以自定义dispatch能力

## 首先我们把redux流程化

![alt text](https://user-gold-cdn.xitu.io/2018/7/31/164edab5e41258c1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1 "redux flow")

核心部分就是在从action到reducer的过程中，那怎么处理呢？

以添加日志为例子

1、首先我们想在dispatch的前后打上日志，我们可以这么写
```
console.log('dispatching', action)
store.dispatch(action)
console.log('next state', store.getState())
```
前面说过了我们可以针对dispatch进行扩展对吧，那么我们可以把上面的代码封装成一个函数同时取代dispatch本身
```
store.dispatch = (action) => {
  console.log('dispatching', action)
  let result = store.dispatch(action)
  console.log('next state', store.getState())
  return result
}
```
此时我们再次使用dispatch的时候自然会打出相应的log。那我们再将上面的方法扩展完善一下，我们不重写dispatch方法，而是将新的dispatch通过函数返回
```
function logger(store) {
  let next = store.dispatch

  return function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = store.dispatch(action)
    console.log('next state', store.getState())
    return result
  }
}
```
这样做有什么好处呢？

将middleware串联起来的必要性：后面直接调用，其次后一个dispatch都可以操控前一个包装过的dispatch（所以有什么好处？？？？）。

链式middleware应该长这样吧
```
function logger(store) {
  return function wrapDispatchAndLog(next) {
    return function dispatchAndLog(action) {
      console.log('dispatching', action)
      let result = store.dispatch(action)
      console.log('next state', store.getState())
      return result
    }
  }
}
```
next就是上一个middleware的dispatch

接下来看看集合这些middleware的方法是怎么实现的——MiddleWare
```
function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()
  let dispatch = store.dispatch
  middlewares.forEach(middleware => (dispatch = middleware(store)(dispatch)))
  return Object.assign({}, store, {dispatch})
}
```
而其实redux本身实现了applyMiddleware方法，上述方法跟redux本身的实现非常接近了。有一些差别说明如下：

- 这个方法只是暴露了store API的一个子集给middleware：dispatch和getState
- 确保所有的dispatch都经过middleware链
- 为了保证只应用middleware一次，方法作用在createStore上面，而不是store本身。

## 举个例子
我们很简单引用两个logger作用在middleware链上，会是怎么执行的呢？或许这里可以找到上面的设计思想。
```
// logger
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

// logger2
const logger2 = store => next => action => {
  console.log('dispatching 2', action)
  let result = next(action)
  console.log('next state 2', store.getState())
  return result
}

// 创建store并引用Middleware
createStore(
  reducer,
  applyMiddleware(logger2, logger)
)

// 执行结果
// dispatching 2
// dispatching
// next state
// next state 2

// 同理我们换一个引用顺序
applyMiddleware(logger, logger2)

// 执行结果
// dispatching
// dispatching 2
// next state 2
// next state
```
上述结果表明了什么？

满足了洋葱模型，让我们的dispatch执行middleware的顺序是从前到后，而后再从后回到前面。

这里解释了reverse()。
