# 知识整理

## React
### React的发展历程
- React < 16.8
  - 传统的集中setState进行更新状态，一气呵成，阻塞主流程，进而影响页面卡顿
  - 提供给开发者scu、pureComponent、useMemo、useCallback等给开发者进行性能优化
  - 原因是Jsx的灵活导致了react没办法规范优化
- React 16.8
  - fiber的产生
    - 可中断、更小粒度的渲染/更新过程
    - 浏览器空闲执行requestIdleCallback
    - 结果汇总patch到真实dom
  - fiber原理
    - diff + patch，diff是逻辑计算，可中断；而patch不可中断
    - fiber tree跟实际的vDom tree一样，携带的信息有差异（简单的节点结构关系和存储信息变量）
    - 具体实现
      - 生成fiber tree，fiber节点上的信息（parent/child/nextsibling/effect list/side effect等）
      - 深度优先遍历fiber tree
      - 调用reconciliation
      - effect list & side effect
    - 中断&恢复
      - 中断，在requestIdleCallback执行完立刻暂存数据，并打上tag，并启动下一次requestIdleCallback
      - 恢复，通过tag识别需要恢复的内容，并判定是否需要继续或者重新计算
  - hooks
    - 解决功能复用的问题
    - 原理
  - TypeScript
- React 17
  - reconciliation算法升级，细化了更新的优先级，提出了车道模式，同一类型的异步放在一个车道里，且优先级高的车道先清空
  - 技术改造的过渡版本（17+以后的版本可以混用，也是因为15到16的改造成本过高导致）
  - 事件委托从document改到了渲染react树的根dom容器中
- React 18
  - 渐进升级，减少升级痛苦
  - 新特性
    - 新的root api，并发渲染
    - 自动batching，更新更细致，异步处理结果的更新也会batching，存在一个开关可以控制
    - 异步的setState也会合并，相较于之前的只会合并生命周期内的相比
    - suspense的优化，达到真正意义上的预测性，老版本只是做了display:hidden
    - ssr可打破串行的规律
    - startTransition提供更优雅的异步能来，参考fiber可以中断思路，同时优先于setTimeout执行，默认做了transition标记

### 状态管理
- redux vs mobx:https://juejin.im/post/5a7fd72c5188257a766324ae#heading-12
- redux vs vuex:

## Vue
### Vue的发展历程
- Vue2.0
  - 响应式原理
  - diff算法
  -
- Vue3.0
  - 新特性
  - diff算法
  - useRef & useReactive
  - composition api
-

## Js
- 原型与继承
- 设计模式
  - 观察者模式
  - 发布订阅模式
- 深拷贝
- 浏览器渲染机制
- Promise实现原理


## 工程化
- Webpack
  - 生命周期
  - 优化方案
  - loader & plugin
- Vite
  - 核心思想：ESModule+浏览器的支持
- esModule
  - 了解

## Node
- node的执行机制
- 洋葱模型
- egg框架
- Nest.js

## 其他
- 性能优化
  - lighthouse
  - 首屏
  - 白屏
- 安全与网络
- Nginx & linux命令

## 算法