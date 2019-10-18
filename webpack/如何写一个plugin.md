# 如何写一个webpack插件

## 理解plugin和loader的区别
- loader 针对文件的转换，也就是说匹配文件进行转化
- plugin是扩展器，不直接操作文件，而是根据打包某些节点丰富构建打包的能力，更为广义的能力

## webpack节点
理解了是依据webpack打包的节点进行能力扩展，那么看下webpack的可扩展的节点有哪些
- entry-options
- compile
- make
- build-module
- after-compile
- emit
- after-emit

## plugin的规范长什么样子呢
- 一个javascript对象或者Class
- 有apply方法
- 指定挂载webpack时间钩子
- 处理webpack内部实例的特定数据
- 功能完成要执行webapck的callback

## tapable需要介绍
连接插件和compiler，管理所有的插件绑定和调用，类似nodejs的eventEmitter，compiler和compilation都是tapable的实例。

## 那么compiler是什么呢？
compiler需要跟compilation区分着看
- compiler像是订制好的一个生产环境
- compilation则是一次版本构建和资源产生，每次变化重新创建

## compilation有什么用呢？这有什么Hook可以用呢？