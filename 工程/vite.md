# Vite

## why vite
bundler的形式比较慢，每次修改都需要重复构建很多无意义的文件。而且随着项目的扩大，其中构建的速度就越来越慢。

因此诞生了Vite，通过浏览器的native ESM和esbuild的能力支持，极大程度上提升了构建效率。

## comparisons with other no-bundler solutions

## how it comes out
起初是解决.vue文件能够在浏览器能够被直接加载执行，那么怎么做呢？@vue/vue-dev-server
- 浏览器直接请求import文件，没有bundler
- 服务端拦截.vue文件，运行时编译返回可执行的js
- 对于依赖库支持module格式的直接饮用cdn
- 对于js文件里的饮用包的（只有包名），重写饮用方式，直接指向本地已安装的文件

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