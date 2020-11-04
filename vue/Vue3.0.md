<!--
 * @Author: dongqingming
 * @Date: 2020-11-04 21:01:02
 * @LastEditTime: 2020-11-04 21:36:13
 * @LastEditors: dongqingming
 * @Description: Vue3.0学习文档
 * @FilePath: /articles/vue/Vue3.0.md
 * @symbol_custom_string_obkoro1: no bug no code
-->
# setup
取代beforeCreated和created，作为composition API新特性提供了统一入口

# reactive
新的响应式数据的写法

# ref & isRef & toRefs
返回值是一个对象，对象上只包含一个value属性。`这是性能优化`

# computed
新的写法，返回的值是一个ref对象。

# watch
写法更加收敛，且提供了stop的能力。`这是性能优化`

# LifeCycle Hooks
setup里订制，可以实现按需导入到组件里。`这是优化性能`

# Template refs
`Vue3.0的使用方案`

# suspense组件
defineAsyncComponent，模拟React.lazy() + suspense。`这是优化性能`

# 完整模板
```js
<template>

</template>
<script lang="ts">
  import {
    computed,
    watch,
    defineComponent,
    getCurrentInstance,
    onMounted,
    PropType,
    reactive,
    ref,
    toRefs
  } from 'vue';

  interface IState {
    count: 0,
    name: string,
    list: Array<object>
  }

  export default defineComponent({
    name: 'demo',
    props: {
      name: {
        type: String as PropType<null | ''>,
        default: 'vue3.x'
      },
      list: {
        type: Array as PropType<object[]>,
        default: () => []
      }
    },
    components: {},
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
  })
</script>
```