# webpack配置的都是啥
  - base
  - dev
  - prod
  - dll
  - deploy
  
上面的配置参数熟悉吧，各自的作用是什么？又应该做哪些配置呢？

1、配置参数说明
- base 基础配置
- dev  开发配置 
- prod 发布配置 
- dll  拆分chunks 
- deploy 发布配置

2、webpack基础配置项
```
{
  entry: ,
  output: ,
  devtool: ,
  module: {},
  plugins: []
}
```
## 举个栗子
你有这样一个前端项目：webpack + antd + react

- base 做公共基础建设，配置entry、output、module(loader)、plugins

base部分我们做什么？


- dev 顾名思义跟开发相关的功能：配置devServer，热加载，抽取文件配置mock(HtmlWebpackPlugin)

- prod 发布生产环境相关的：压缩文件、集成打包文件、拆分公共chunks、抽离css、css压缩

- dll 拆分bundles，提升构建速度，这里重点是拆分bundles的相关配置

- deploy 针对特定服务器的特定部署处理，重点在于关联部署配置

## ExtractTextWebpackPlugin
## OptimizeCssPlugin
## commonChunkPlugin VS splitChunk

关于css更新的HMR https://www.kancloud.cn/hfpp2012/webpack-tutorial/467674

HappyPack & DllPlugin
