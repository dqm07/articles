<!--
 * @Author: dongqingming
 * @Date: 2019-12-06 17:18:28
 * @LastEditTime: 2019-12-06 17:19:42
 * @LastEditors: dongqingming
 * @Description: reactHooks.md
 * @FilePath: /articles/react/reactHooks.md
 * @no bug no code
 -->
#### Hooks下的状态管理迁移
1. mobx
  - 书写方便
  - 流程不清晰、不规范
  - 与react设计理念不同
2. redux
 - 生态好，支持中间件
 - 流程清晰action->reducer->state
 - 书写不方便
3. context API + hooks
  - 不需要额外的库
  - 不可完全覆盖redux的能力
  
在一个react大型项目里建议使用redux，天然地与hook兼容

> 我理解：hooks确实存在useReducer + useContext的形式来处理管理状态问题，但是hooks产生的定位不是用来替代redux进行状态管理，是增强函数组件的能力，同时hooks的管理能力不及redux灵活稳定，因此大型应用还是使用redux。同时redux也不是react必须要使用的功能。如果有个项目你觉得需要状态管理，你可以自己写也可以用redux，而hooks是用来增强函数组件的能力，简化代码书写，与状态管理无关，就像你写react代码的时候用props state一样，你会思考取代状态管理吗？它就是获取状态的一种方案。