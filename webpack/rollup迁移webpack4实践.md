# rollup迁移webpack4

## 为何要迁移
- 工具本身属于业务逻辑模块（字体、图片甚至视频）
- rollup定位
- rollup本身生态环境的限制
- webpack强大生态
- 便于扩展和使用

## 现状分析
### 是什么？
工具本身特性：Container + Component；Vue项目
### rollup都做了什么
> 截图对比

### 有何差异？
- replace vs webpack.DefinePlugin
- vue vs vue-loader
- postcss vs css-loader|less-loader
- json
- nodeResolve vs resolve
- commonjs
- eslint
- babel vs bable-loader
- image vs url-loader
- serve vs devServer
- watch vs HMR(inline/hot)
- uglify
- minify

## 遇到的问题
### 引用文件省略了后缀
`resolve`

### elementUI并没有引用执行
`externals`

### .vue文件处理
`vue-loader` and `VueLoaderPlugin`

### ISMOCK
`webpack.DefinePlugin`

### 逻辑处理
`HtmlWebpackPlugin`解决多个文件引用问题

### 启动多个工具的时候
`portfinder`的作用，自动递增端口号，正常打开页面进行调试

### 一个比较有意思的处理
`AddExtraSourcePlugin`来完善需要的功能补充

一张图来解释工具gptool-core包的问题，以及在rollup里的处理办法，webpack暂时没办然绕过这个逻辑，那么需要手动在文件打包的时候增加这样一段代码，因此开发了一个插件使用。

- 打包的问题有默认default
- 如何引用这样一段代码

## 总结
`配置项目千变万化，配置套路千篇一律`

webpack的默认能力很强大，且生态较为完善，因约定而规范，但也因约定而带来迁移成本。

rollup默认能力一般，工具包构建生态不能应用更多其他场景，但是灵活代码简单。

