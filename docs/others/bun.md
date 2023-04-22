# Bun

## 初识Bun
[Bun](https://github.com/oven-sh/bun)通过Zig编程语言开发的运行时，起初是种Javascript webserver，后续的发展中酝酿出**颠覆js生态系统**的野心。

Bun的优势：
- 提供比Node或者Deno**更快**的运行时
- 包管理器比npm或者yarn**快**上亿倍
- browser bundler——能替代webpack到react-scripts的所有内容，速度**快如闪电**（esbuild呢？）
- 提供速度**很快**的webserver(代替Express)
- Sqlite 客户端
- Bread

思路：Js拥有的我要有，而且我要更简单、更高效。用一种低级语言，编写出运行极快的代码，这就是Bun。但是Bun还很年轻，但是势头很猛，We'll see.

## 现如今Js的困境
拼了命的东拼西凑的js环境

- 例如：Ts在涉及到多位开发者的项目中解决了不少难题，感谢微软
- 例如：Npm在大型项目和单体Repo速度太慢，Yarn某种程度上解决了速度问题，感谢Facebook
- 再例如：Yarn3的”即插即用“节点模块虚拟化来替代NPM
- 再例如：JSON schema的请求解析器解决了Express的低速问题

都在用js解决js的问题，**用JS编写就是慢**

品一品，想一想，Webpack慢，于是有了Go语言的esbuild，eslint的替代方案也有了，通过Rust重写了Rome。

Bun就在这个趋势中自然延续，但是从下往上的推进思路，从零起步、以内置”batteries“的方式，用低语言重写整个JS生态系统。

## 到目前为止，Bun可以做什么呢？
- 让解释器快起来
1. Zig(C++) + JavaScriptCore(Apple)，一起归功于Zig这门语言的速度
2. 支持90%的Node Api
3. 支持对ts的解析
- 替代NPM
1. 与NPM的思路雷同，独有的lockfile格式，同时node_modules和package.json看起来也没什么变化
2. 通过文件系统的**低级访问**和**快速语言**实现极快的安装效果
3. 但是不支持更强地工作空间，但是已经在规划中。
- 内含转译器，矛头指向webpack、esbuild
1. 包含一个用于网络浏览器的转译器，bun中的解析器就是esbuild解析器的一个Zig端口
2. 内置项目脚手架，通过`bun create react my-app`和`bun dev`可以轻松启动一个react项目
3. 生产环境的方面路还很长
- 其他功能——web server和Sqlite客户端
1. 与现有的功能基本持平，但是某些条件下更好用

## 发展阻碍
- 转变的巨大
- Bun太年轻

## 开源世界中的生态阵营
- Jest Vs Mocha

Mocha痛点：稍微复杂的需求都需要引入其他模块和插件

Jest的优点：所有的能力整合到了单一框架中，慢慢也就变成了更受欢迎的框架

也许Bun就是Jest，虽然这不符合开源精神，但是确实实实在在地解决了开发者的痛点。

## 我们可以借鉴的是什么
- js中的好多问题都是通过js解决，大型项目中效果甚微
- 学习新的语言才能更好的解决本质问题，基于语言本身的性能
- 将来做优化可以直接借鉴或部分借鉴其他语言的工具包（esbuild, bun）
- 或许Bun会在接下来取代Js生态，可以了解和学习
- 基于Bun共建一些符合我们业务场景中的工具，不用很全，够我们用就好

