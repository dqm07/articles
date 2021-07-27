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
    - 解决功能复用的问题，对立于class组件的特性
    - 原理
      - 举例useState：本质上就是维护两个数组，因为每次重新渲染都是重新从数组头部开始，因此顺序很重要
    - 原则
      - 循环、条件语句不可以使用hooks
      - 只能在函数式组件里使用 
  - TypeScript
    - 静态语言有了类型的概念，增强了js语言
    - 更适合在底层或者长期稳定的业务项目中去推广，最大程度的发挥类型语言带来的优势——便于维护、错误前置
    - 经典的ts的原理
      - record typeof Record<K extends keyof any, T> = { [P in K]: T }
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
- redux vs mobx vs vuex
  - mobx成本低，装饰器的方案，多个局部store，面向对象编程，可以修改状态。不推荐运用到复杂工程里，因为过于自由的开发方式，维护是个成本
  - redux成本高，全局store，可运用到大型工程里，状态不可变，都是返回一个新的状态
  - vuex跟redux类似，都是基于flux，运用在vue项目中，使用方式上有一些差异，可以修改状态

## Vue
### Vue的发展历程
- Vue2.0
  - 响应式原理
    - 观察者模式
  - diff算法
    - 首位交叉对比法则   
    - 考虑含有key的情况下的优化思路
- Vue3.0
  - 更快-diff算法
  - 更小-实际加载更小
  - 新特性
    - 多个根节点问题
    - 拉齐自定义api
    - teleport
    - createApp
  - useRef & useReactive
    - 互为补充，仅仅是提供了一种书写风格
  - composition api
    - 逻辑复用

## Js
- 原型与继承
  - 原型产生的背景：解决继承的问题
  - 组合继承最优
- 设计模式
  - 观察者模式
  - 发布订阅模式
- 深拷贝
  - 浅拷贝，基础类型拷贝，引用类型不拷贝
  - JSON.parse(Json.stringify(obj))，不能解决互相调用的问题
  - 实现深拷贝，解决互相引用的问题（weakMap/weakSet）
- 浏览器渲染机制
  - 浏览器发起一次dns域名解析请求
    - 先查看本地浏览器缓存
    - 查找服务器缓存
    - 查询到域名返回
  - 浏览器拿到ip进行真实的资源请求
    - 简历tcp链接，三次握手
      - 发起请求，需要建立连接
      - 服务器响应确认
      - 客户端发起确认消息，建立连接
    - 请求html资源
    - 返回浏览器进行Html解析
      - 生产dom树
      - 生成cssom树
      - 请求js资源，这会阻塞渲染
        - 合并dom树和cssom树为render树
        - 将render树进行渲染并绘制到浏览器中  
- Promise实现原理
  - then的入参可能是Promise
  - resolve的value可能是Promise
  - 数组的存在是支持异步
- 柯里化
  - 递归 


## 工程化
- Webpack
  - 生命周期
    - 合并参数
    - 初始化环境（tapable管理插件）
    - compile方法进行入口分析
    - 依赖分析（深度/广度都行）
    - 运用Loader（less到style的过程）
    - 产出文件，seal阶段整合代码
    - 合并webpack代码
    - 进入封装打包，大量执行plugin的过程
    - module的格式支持
    - asset阶段产出实际内容输出
  - 优化方案
    - DLL
    - HappyPack
    - Hard Source
  - loader & plugin
  - 热加载原理
    - sockjs
    - jsonp
    - HotModuleReplacementTemplate
    - JsonpTemplate
- Vite
  - 核心思想：ESM浏览器 + esbuild的构建能力（go language）
  - 1.0版本
    - 解决的是.vue文件的加载更新问题
      - 直接import文件
      - 服务器拦截.vue文件，返回可执行js
      - 依赖库的支持主要是引用cdn和本地已安装文件
  - 2.0版本
    - 不再简单支持.vue文件，而是支持更多框架
    - 扩展更多能力，例如预打包，js和css同步加载等

## Node
- node的执行机制
- 洋葱模型
  - 手写洋葱模型，本质是递归调用Promise.resolve()
- egg框架
- Nest.js
- child_process & cluster
  - folk出子进程
  - cluster通过folk批量生产子进程

## 其他
- 性能优化
  - lighthouse
    - 用户感知的优化才是真的好的优化
      - ttl
      - Lcp
      - fcp 25
      - sl
      - tbt 25
      - cls
  - 首屏
    - 首屏dom元素加载完毕后的时间
  - 白屏
    - head标签加载完毕时间
- 安全与网络
  - http status
  - cookie
    - httponly: js
    - secure: https xss
  - xss js注入-转义就好
  - csrf 跨站伪造请求-生成随机数即可
  - 缓存原则
    - etag的出现是为了兜底，秒级别以下的监控
    - 协商缓存
- Nginx & linux命令
  - linux
    - tail -f xxx.log
    - cat -n xxx.log | grep 'keyword'
    - ps aux | grep nginx
    - kill -9 id
  - nginx
    - 静态资源服务器
    - 负载均衡
    - 转发代理
    - 中间层处理

## 算法