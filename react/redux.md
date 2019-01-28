# redux
## redux思想
- state
- action
- reducer

### 思想简介
> 思想很简单

1、state是什么？
```
{
  todos: [{
    text: 'eat'
  }, {
    text: 'drink'
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}
```
所以是什么？状态树（一个包含所有状态的一个对象）。但是我们只能看不能动手改，也就是说我们可以取值不可以修改值，那我们是不是得需要有修改的能力？

蹡蹡

2、action出场，这是个什么？
```
{type: 'ADD_TODO', text: 'play'}
{type: 'TOGGLE_TODO', index: 1}
{type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL'}
```
action看起来很简单，有没有一种语义化代码的意思，好像看到一个对象就知道这是做什么的。对！这就是action的意义，一个是发起修改，二是告知你们我的修改细节。

但是。。。action也并没有真正的修改state，他只是描述了有事情发送了这一事实，这个时候需要一个方式衔接action和state

3、reducer出场

不难理解这就是一个函数，拿到state和action，然后返回一个新的state。

但是一个大的应用里我们不可能把所有的逻辑管理放在这样一个函数里，我们可以拆分很多小的函数各自管理各自的state，也就是拆分state tree。大概长这样。
```
function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter
  } else {
    return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{text: action.text}])
    case 'TOGGLE_TODO':
      return state.map((todo, index) => {
        action.index === index
          ? {text: todo.text} 
          : todo
      })
    default:
      return state  
  }
}

// 再加一个reducer来调用这两个reducer
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}
```
关于reducer的注意点：如果状态有变化，一定要返回新的state；如果没有命中type，要返回默认的state来兜底

That's all! 是不是很简单啊。

### 三个原则
- 单一数据源，确保state的唯一性
- state的修改只能来自action，store.dispatch(action)
- reducer是个纯函数

### store
忘记介绍store

store是衔接state/action/reducer之间的对象。他有一些额外的方法：

- getState()
- dispatch(action)
- subscribe() 注册监听器
- subscribe() 返回的函数注销监听器

```
import { createStore } from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)

// store 注入reducer然后调用方法执行action完成对state的更新
```

### 生命周期
- 调用store.dispatch(action)
- store调用传入的reducer
- 根reducer应该将多个子reducers的state合并成一个大的state
- store保存了根reducer返回的state

## provider
提供一个容器，可以存放store。

## connect
将store里的数据通过props透传给模板函数。
```
const A = connect(
  mapStateToProps,
  mapDispatchToProps
)(template Fun)
// 最终在外层引用这个对象进行渲染
```

## 示例总结
- action定义最简单的行为：type & 其他参数，type对应到reducers
- reducers根据type处理state，返回新的state
- 总的reducers会combineReducers
- connect可以将store和模板连接，而且store到props的逻辑都在connect之前处理，connect之后通过props获取

## Redux开发步骤
- Provider 引入store
- Store示例化通过CreateStore(rootReducer)
- rootReducer可以拆成几个store，分别存储
  - reducer是修改state的纯函数
  - 并且不可以返回在state本身上面修改的结果，需要返回一个新的state
- action定义操作类型和修改值，通过dispatch调用，并且action的type与reducer里的type匹配
- 关键步骤：将模板和state连接，connect即可，两个参数mapStateToProps
  /mapDispatchToProps，将整个state中需要在本模板使用的参数和方法引用一下。注意：返回的是({})，不是函数。
- 此时，我们可以在模板里直接通过props调用定义在map里的key对应的值进行操作
- reducer参与store的初始化，action放在map函数里通过dispatch调用，且调用dispatch的本质就是执行reducer的state修改