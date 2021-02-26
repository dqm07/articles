<!--
 * @Author: dongqingming
 * @Date: 2021-02-25 15:46:50
 * @LastEditTime: 2021-02-26 10:41:59
 * @LastEditors: dongqingming
 * @Description: cli源码学习
 * @FilePath: /articles/工程/Vue-cli源码学习.md
 * @no bug no code
-->
# Vue-cli解读
## Lerna包管理
所有的包都存放在packages里

包的管理操作都放在scripts里

## 全局包的安装规则
```json
// package.json
{
  ...,
  "bin": {
    "vue": "bin/vue.js"
  },
  ...
}
```
面对package.json里的bin字段的配置解释，bin的作用是创建命令行的包。

以上述的bin字段举例，如果是-g安装，那么安装成功以后，命令行中的Vue会找全局配置下的vue映射，而这个映射刚好就是bin/vue.js文件；如果不是-g安装，那么会安装到./node_modules/.bin下面

因此我们便有了脚手架里的相关命令行
```sh
vue create [app-name]
vue add eslint
vue-cli-service serve
```

这样的好处是可以将一部分的能力隐藏到npm包里，整个仓库的目录结构更加简洁

## 便捷与规范
cli很重要的一个部分是插件思路，正是这些规范的插件在底层支持，使得用户需要关心的内容很少，同时这些插件也支持了很好地对用户的配置交互

脚手架里包含了两大类包：全局包和插件包

顾名思义全局包是供用户直接调用执行的命令，也就是隐藏在底层的入口，那么这些插件的支持就是在支撑功能的完善。

全局包的命名规则：cli-[name]

插件包的命名规则：cli-plugin-[name]

另外通过用户的自定义配置在run相应地命令时，init初始化执行，同时也会进行插件的注册，最后完善成一个完整的工程

## 如何开发一个cli插件
遵循如下规则：

入口文件index.js

generator/promote

