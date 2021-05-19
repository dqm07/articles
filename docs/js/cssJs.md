# css in js VS js in css

## css in js
### import css in js
- deal with webpack loader

### styled components
- 适合订制主题
- with react components
- 用js的思路写css

#### features
- 自动关联css，且支持代码分割
- 不需要关心class name
- easy to delete
- easy to dynamic styling
- 不用跨文件维护
- 自动续prefix

#### 我们可以学到什么
- split的能力是比较友好的
- 动态的样式处理形式是友好的，尤其针对主题订制

## js in css
### Houdini (develop)
为什么需要呢？
- css polyfill比较难，一些能力需要在运行时处理，不能完全通过编译时解决
  - 旧方案：动态兼容的话需要重新计算，引发重排
  - 新方案：换种干预方式，调用浏览器渲染流程中的一些不能干预的地方进行扩展编写
    - worklets类似于web workers，不阻塞主线程的执行

目标：
- 统一各大浏览器的行为——稳定性，例如放弃grid的兼容问题
- 运用css polyfill进行新特性的运用——尝鲜