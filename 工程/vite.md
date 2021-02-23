<!--
 * @Author: dongqingming
 * @Date: 2021-02-23 10:18:05
 * @LastEditTime: 2021-02-23 17:15:37
 * @LastEditors: dongqingming
 * @Description: Do not edit
 * @FilePath: /articles/工程/vite.md
 * @no bug no code
-->
# Vite
## why vite
bundler的形式比较慢，每次修改都需要重复构建很多无意义的文件。而且随着项目的扩大，其中构建的速度就越来越慢。

因此诞生了Vite，通过浏览器的native ESM和esbuild的能力支持，极大程度上提升了构建效率。

## comparisons with other no-bundler solutions
- snowpack
  - differ in prod
  - no pre-bundling
  - monorepo
  - css
  - first class vue support
- wmr
  - only for preact
  - others framework is not friendly
- @web/dev-server
  - vite 1.0 server is inspired by this
  - it's low-level, no framework
  - vite aims to provides out-of-the-box workflow

## how it comes out
起初是解决.vue文件能够在浏览器能够被直接加载执行，那么怎么做呢？@vue/vue-dev-server
- 浏览器直接请求import文件，没有bundler
- 服务端拦截.vue文件，运行时编译返回可执行的js
- 对于依赖库支持module格式的直接引用cdn
- 对于js文件里的引用包的（只有包名），重写引用方式，直接指向本地已安装的文件

## what's new in 2.0
相较于之前的版本，2.0算是真正意义上的稳定版本，这里面做了很多重构，做了很多改善。

- 更多框架的支持，不再只是.vue单文件组件，因为vite提供了模板，因此解析只是扩展的形式
- 新的插件形式和api
    - 继承自rollup插件并兼容很多的rollup插件
- dependency pre-bundling with esbuild
- 头等css支持
    - css分离
    - 支持@import 和 url()解析
- ssr的支持
- 老版本浏览器的支持 @vitejs/plugin-legacy
## 生产环境的处理
- build
  - 兼容：dynamic import polyfill & @vitejs/plugin-legacy
  - public path
  - 自定义build.rollupOptions
  - 多页
  - lib mode
- build优化
  - 动态引入轻量级的import polyfill，兼容module模块对于浏览器的支持，不支持module的需要额外的工具
  - css分割独立成文件，会在js文件加载的时候加载相应地css，当然你可以将css合并一个
  - link自动集成modulepreload
  - preload common模块，并且trace所有的直接引用模块
  -