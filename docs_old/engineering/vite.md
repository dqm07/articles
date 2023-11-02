# Vite
## why vite
bundler的形式（webpack）比较慢，每次修改都需要重复构建很多无意义的文件。而且随着项目的扩大，其中构建的速度就越来越慢。

因此诞生了Vite，通过浏览器对于native ESM的特性支持和esbuild的构建能力（go语言实现），极大程度上提升了构建效率。
## comparisons with other no-bundler solutions
- snowpack
  - differ in prod: vite is more fluent(focus on rollup), snowpack adapt to more build terminal
  - no pre-bundling
  - monorepo is supported in vite
  - css compile is supported in vite
  - first class vue support
- wmr
  - only for preact
  - others framework is not friendly
- @web/dev-server
  - vite 1.0 server is inspired by this
  - it's low-level, no framework
  - vite aims to provides out-of-the-box workflow

## what about 1.0
起初是解决.vue文件能够在浏览器能够被直接加载执行，那么怎么做呢？@vue/vue-dev-server （ all rollup ）
- 浏览器直接请求import文件，没有bundler
- 服务端拦截.vue文件，运行时编译返回可执行的js
- 对于依赖库支持module格式的直接引用cdn
- 对于js文件里的引用包的（只有包名），重写引用方式，直接指向本地已安装的文件

## what's new in 2.0
相较于之前的版本，2.0算是真正意义上的稳定版本，这里面做了很多重构，做了很多改善。

- 更多框架的支持，不再只是.vue单文件组件，因为vite提供了模板，因此解析只是扩展的形式
- 新的插件形式和api
    - 继承自rollup插件并兼容很多的rollup插件
    - 增强了rollup的能力，提供了额外的api支持干预打包流程
- dependency pre-bundling with esbuild
  - fast: cus esbuild in go language
  - dependency pre-bundling
    - one dependency belongs to one file
    - convert commonjs & umd to ESM
- 头等css支持
    - css分离，且在js加载的同时并行加载对应的css文件
    - 支持@import 和 url()解析
- ssr的支持
- 老版本浏览器的支持 @vitejs/plugin-legacy

## what i concerned 生产环境的处理
- build
  - 兼容：dynamic import polyfill & @vitejs/plugin-legacy
  - public path cloud be handle by developer
  - 自定义build.rollupOptions
  - 多页支持
  - lib mode，支持发布成依赖库
- build优化
  - 动态引入轻量级的import polyfill，兼容module模块对于浏览器的支持，不支持module的需要额外的工具
  - css分割独立成文件，会在js文件加载的时候加载相应地css，当然你可以将css合并一个
  - link自动集成modulepreload
  - preload common模块，并且trace所有的直接引用模块，减少公共模块的引用次数，减少请求和打包体量
