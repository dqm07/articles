<!--
 * @Author: dongqingming
 * @Date: 2019-01-22 15:16:43
 * @LastEditTime: 2021-02-07 19:31:25
 * @LastEditors: dongqingming
 * @Description: Do not edit
 * @FilePath: /articles/react/mobx.md
 * @no bug no code
-->
# Mobx

几个名词

- 透明函数响应式编程
- 任何起源于应用状态的数据应该自动获取

解释上面几个名词之前，我们先看几个核心概念

- observable & observer

Mobx会对 在执行 跟踪函数 期间读取的 任何现有的可观察属性 做出反应

## Mobx 三步骤

- 定义状态并使得其可观察
- 创建视图以响应状态的变化
- 更改状态

## Mobx 几个概念和原则

- state——状态，不多解释
- derivations——源自状态，并且不会再有进一步的相互作用的东西
  - computed values——计算属性
  - reactions——状态变化需要发生的副作用
- actions——状态的唯一修改入口

## Mobx的优缺点
1. 学习成本少 模板少 面向对象
2. 太过自由可能存在规范问题，也就是应用在大应用中可能存在问题，扩展是问题，简单的使用背后是包裹了很多深层是逻辑，技术掌握上也就是停留在使用层面

## Mobx vs Redux
https://juejin.im/post/5a7fd72c5188257a766324ae#heading-12