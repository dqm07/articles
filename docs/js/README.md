# 查漏补缺
## defer vs async
```
// 均为延迟执行，不影响页面渲染
// 多个defer是顺序延迟加载，多个async是乱序延迟加载
```

## undefined vs null
```
// 不需要显式地设置undefined
const a = undefined
const a

// 当你需要给a赋值一个对象，初始化需要显式设置Null，因为typeof Null === 'object'
const a = null

// undefined派生自null
undefined == null  // true

# 逗号操作符
var num = (2, 4, 5, 9, 7)    // num 的值为 7  [:smile:]
```