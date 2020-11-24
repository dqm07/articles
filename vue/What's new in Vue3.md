<!--
 * @Author: dongqingming
 * @Date: 2020-11-23 20:08:55
 * @LastEditTime: 2020-11-24 21:27:11
 * @LastEditors: dongqingming
 * @Description: what's new in Vue3
 * @FilePath: /articles/vue/What's new in Vue3.md
 * @no bug no code
-->
# Vue3

## 猜想
> 依据软件（库）的演进规律
### smaller
功能完备的情况，新的大版本发布，一定会变得更小。因此Vue3.0会比Vue2.0占用空间小（实际使用情况下）

#### 引入tree-shaking
3.0引入了tree-shaking
```js
import { withDirectives, vShow } from 'vue'
```

### faster
新版本的执行效率一定更快，处理更高效——性能好

#### 新的diff算法
- patch flag——相较于全量对比，新增patch flag来标记diff node，进而提升效率
- 静态提升——不更新的元素静态提升只会被创建一次，直接复用
- 事件侦听器缓存——事件缓存、不再动态绑定追踪变化

### more stable
解决之前的issue，或者hack的处理方式
#### 没发现

### more reasonable
#### composition api
options最大的问题难以解决解决复用问题，变量定义在不同的options里，难以组合；
将逻辑闭合的能力放在一个地方——setup
- data
- computed
- watch
- method
- lifecycle
```js
setup(props, context) {
  // props从父组件传递过来
  console.log(props.name);
  console.log(props.list);

  // 定义reactive的响应式数据，返回一个对象
  const state = reactive<IState>({
    name: 'vue3.0 组件',
    count: 0,
    list: [
      {
        name: 'vue',
        id: 1
      },
      {
        name: 'vuex',
        id: 2
      }
    ]
  })

  // compunted的使用方式
  const a = computed(() => state.name)

  // watch的使用方式
  watch([() => state.name, () => state.count],
    ([newName, newCount], [oldName, oldCount]) => {

    }
  )

  // 自定义生命周期
  onMounted(() => {

  })

  function handleClick () {
    state.count++;
    context.emit('emits-name', state.count)
  }

  return {
    ...toRefs(state),
    handleClick
  }
}
```

#### teleport
支持节点渲染到dom树的任意位置，而不追随到当前组件内部，例如模态框挂载到body下面

#### 自定义事件
```js
// 更直观，更好地记录组件如何工作
app.component('custom-form', {
  emits: ['in-focus', 'submit']
})

// emits定义了原生的事件（如click），那么组件中使用的事件讲取代原生事件侦听器
app.component('custom-form', {
  emits: {
    submit: (args...) => {
      // check
      // and return boolean value
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', {args...})
    }
  }
})

// v-model 参数

```
### some new features
#### ts
optional 不强制

#### more roots

