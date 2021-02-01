<!--
 * @Author: dongqingming
 * @Date: 2020-11-23 20:08:55
 * @LastEditTime: 2020-12-14 20:05:40
 * @LastEditors: dongqingming
 * @Description: what's new in Vue3
 * @FilePath: /articles/vue/What's new in Vue3.md
 * @no bug no code
-->
# Vue3
## 猜想
可能的方向
- 更小
  - Vue包体积更小，加载更快
- 更快
  - 性能更好，diff更快
- 更稳定
  - 之前hack的写法修改，更简便
  - 解决已知bug，不太多
- 更合理
  - 合理的写法
  - 优雅的共享与共建
  - 心智更低
- 一些新特性
  - 与时俱进
  - 解决已知问题
- 废弃一些api
  - 依赖上述两个
- 重要的原理
  - 优化的新原理

## 更小
功能完备的情况，新的大版本发布，一定会变得更小。因此Vue3.0会比Vue2.0占用空间小（实际使用情况下）

### 引入tree-shaking
3.0引入了tree-shaking
```js
// 2.0
import Vue from 'vue'

// 3.0
import { withDirectives, vShow, createApp, ref, reactive } from 'vue'
```

## 更快
新版本的执行效率一定更快，处理更高效——性能好

### 旧的diff算法
patch函数，Vnode与oldVnode进行比较，发现diff在真实的dom上面进行修补
![img](./)

### 有什么可以提升
diff算法里有提到key的作用，直接进行比较。真实的dom侧进行优化

### 新的diff算法
- patch flag——相较于vdom全量对比，新增patch flag来标记diff node，进而提升效率，相当于默认增加了Key，进而提升了diff效率
- 静态提升——不更新的元素静态提升只会被创建一次，直接复用
- 事件侦听器缓存——事件缓存、不再动态绑定追踪变化

## 更稳定
解决之前的issue，或者hack的处理方式
### 没发现
不能说之前的不稳定，只能说还可以更合理，更优雅~

## 更合理
### teleport
支持节点渲染到dom树的任意位置，而不追随到当前组件内部，例如模态框挂载到body下面
### 自定义事件
```js
// 更直观，更好地记录组件如何工作
app.component('custom-form', {
  emits: ['in-focus', 'submit']
})

// emits定义了原生的事件（如click），那么组件中使用的事件将取代原生事件侦听器
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
```
### more roots
不需要one root，more flexible
### 自定义指令
自定义指令，由原来的初始化和insert升级到包含生命周期，更方便与组件结合
### destroyed 改为 unmounted
### data始终为函数
没毛病
### mixin策略简化
弱化复杂度，弱化功能？？？

## 新特性
### ts
optional 不强制
### createApp
将全局api的影响缩小到app实例中，全局的影响更可控，且3.0移除了全局api
### v-model支持传递参数
```js
// v-model支持传递参数，prop与emit绑定实现
// 疑问一：目的是收敛？？？？？
<user-name
  v-model:first-name="firstName"
  v-model:last-name="lastName"
></user-name>
// v-model支持自定义修饰符
// created声明周期生效，modelModifiers作为存储自定义修饰符的对象
// 疑问二：怎么全局注册呢？目前并不能解耦，一次注册，多次调用
<user-name
  v-model:first-name.capitalize="firstName"
></user-name>
```
### composition api
options最大的问题难以解决解决复用问题，变量定义在不同的options里，难以组合；
将逻辑闭合的能力放在一个地方——setup
- data
- computed
- watch
- method
- lifecycle

那跟mixin的区别是什么呢？
- 覆盖机制不如setup解耦
- 命名冲突，生命周期都执行
- 同层级的互相依赖，导致风险
˜
那删不删mixin，跟使用composition api的边界在哪？
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
### defineAsyncComponent
```js
import { defineAsyncComponent } from 'vue'
// 2.0版本
const asyncPage = () => import('./NextPage.vue')
// 3.0版本
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue))
// 3.0版本带选项
const asyncPage = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
})
```

## 删除了一些api
- v-on支持keyCode修饰符
- $on, $off, $once
- filter
- $destory
- 内联模板attribute

## 原理
### ref vs reactive
```js
// 先看看ref和reactive怎么使用的
import { ref, reactive, toRefs, toRef } from 'vue'

const counter = ref(0)
console.log(counter)          // {value: 0}
console.log(counter.value)    // 0
const state = reactive({
  counter: 0
})

// ref作用作基础类型，而reactive作用在引用类型
// 但是ref初始化一个object呢？
const refState = ref({
  counter: 0
})
// 底层调用的是reactive，更底层用的是proxy
// 反而ref类型本身是响应式的数据（类似defineProperty的get、set方法）

// 那么reactive与ref的使用边界是什么？

// 1、我们先看看两种代码风格
// 风格一
let x = 0
let y = 0

function updatePos(e) {
  x = e.pageX
  y = e.pageY
}

// 风格二
const pos = { x: 0, y: 0 }

function updatePos(e) {
  pos.x = e.pageX
  pos.y = e.pageY
}
// 你自己品，细品

// 2、多次定义ref还是合并到一个reactive

// toRef 适用在将object的某个属性传递给组合函数里使用
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3

// toRefs 适合将reactive进行解构进而保持值的响应式能力
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  return toRefs(state)
}

export default {
  setup() {
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}
```
reactive 是深度响应，同时也有shallowReactive，还有readonly。

### ref核心源码
```js
export function ref(raw: unknown) {
  if (isRef(raw)) {
    return raw
  }

  // ref中传入引用类型，ref自动转化为reactive
  raw = convert(raw)

  const r = {
    _isRef: true,
    // 将基本类型包装成引用类型，进而可以被追踪
    get value() {
      track(r, OperationTypes.GET, '')
      return raw
    },
    set value(newVal) {
      raw = convert(newVal)
      trigger(r, OperationTypes.SET, '')
    }
  }

  return r as Ref
}

const convert = <T extends unknown>(val: T): T => isObject(val) ? reactive(val) : val
```

### reactive核心源码
底层是proxy能力的支持
```js

```
