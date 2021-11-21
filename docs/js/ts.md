# TypeScript

## all about ts

## how to write d.ts
### 声明文件第一步————分清库的调用方式
- 全局库
  - 特点：顶级var或者function / 显式调用window / document或window是存在的
- 模块化库
  - 特点：require / define / exports / module.exports / import / export
  ```ts
  // module.function.d.ts
  var x = require('x');
  const a = x();

  // module.class.d.ts
  var x = require('x');
  const a = new x();

  // module-plugin.d.ts
  import * as someModule from 'someModule'
  declare module 'someModule' {
    export function newFunction() {};
    export interface someModuleOptions {
      // 原有的模块中 新增 自定义属性
    }
    // 新增模块中types
    export interface newModuleOptions {}
  }

  // global-plugin.d.ts
  // global-modifying-module.d.ts
  // module.d.ts
  ```
- 使用依赖
- 补充说明