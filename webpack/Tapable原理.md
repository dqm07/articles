# Tapable
Tapable提供各种hook来管理webpack的插件（内部或者外部插件），为了确保事件的执行顺序，提供了各种类型的Hook。

先通过一个例子来看下Tapable使用形式：

```
const { SyncHook } = require('tapable')

const hook = new SyncHook(['arg1', 'arg2'])

hook.tap('a', function(arg1, arg2) {
  console.log('a')
})

hook.tap('b', function(arg1, arg2) {
  console.log('b')
})

hook.call(1, 2)
```
看起来事件注册、事件触发，但是Tapable相较于EventEmit功能更强大。

## 事件类型
- 同步和异步（异步并行和异步串行）
- Bail/Waterfall/Loop类型

### 1、BailHook
一个例子：如果一个模块M，如果它满足A、B或者C三者任何一个条件，就将其打包为一个单独文件。

- 如果A、B、C不存在先后顺序，可以使用AsyncParallelBailHook，满足一个条件，其他无需判定
- 如果A、B、C存在先后顺序，需要使用SyncBailHook或者AsyncSeriseBailHook，抉择来自ABC的同步还是异步函数

### 2、Waterfall
类似reduce，如果前一个Hook函数的结果resule!==undefined，则result会作为后一个Hook函数的第一个参数

顺序执行的结果为：SyncWaterfallHook 和 AsyncSeriesWaterfallHook

### 3、LoopHook
不停的循环执行Hook，直到所有函数结果result===undefined

对串行有依赖，所以只有SyncLoopHook 和 AsyncSeriesLoopHook

## 原理
- hook事件注册

  类实例的tap方法注册对应hook的处理函数
  - tap
  - tapAsync
  - tapPromise
- hook触发
  
  - call
  - callAsync
  - promise
- 生成hook执行代码
- 执行