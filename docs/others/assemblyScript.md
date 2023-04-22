# AssemblyScript

## 定义
WebAssembly(Wasm) 浏览器低级语言，它使得网站代码可以再安全的沙盒环境中以接近本机的速度运行。
- 二进制交付
- 大小体积
- 加载时长

目标：不是取代Js，至少目前还没有访问DOM的能力，而是把WebAssembly看作是`与现有Web平台良好集成的新工具`

应用场景：
- 游戏
- 可视化
- CAD应用
- 图像/视频编辑

通用特点：CPU密集型任务提供接近本机的性能，让一些程序迁移至Web成为可能。（Figma这种网站提速）

前端如何来用呢？手写Wasm当然可以，但是这种低级语言是成为其他语言（C/C++/GO/Rust）的编译目标的，最终变成了学习一门后端语言。前端怎么可以快速上手并运用呢？AssemblyScript就是为了解决这个问题而产生的。

`AssemblyScript`是一个把Ts转换为WebAssembly的编译器。但是只支持了Ts的部分能力，但是写法上跟Js极为相似，因此Web开发人员上手会变得更加容易。

## 上手Demo
refer links: https://www.assemblyscript.org/getting-started.html#setting-up-a-new-project

## 一些关于AssemblyScript的疑问
### AssemblyScript最终会完全支持Ts吗？
一些功能不能提前编译中支持，但是严格模式下的ts可以兼容需求

### AssemblyScript的运用场景
- 镜像处理
- 游戏逻辑
- 特殊算法
- 模拟器
- 编译器等

### AssemblyScript可以在浏览器之外运行吗
当然可以，只要载体支持WebAssembly就可以