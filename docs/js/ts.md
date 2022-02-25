# TypeScript

## some way i don't know
```ts
// numeric literal types
function compare(a: string, b:string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

// It's about is
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

## 高级类型
```ts
// 交叉类型
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};

  for (let id in first) {
    (<any>result)[id] = (<any>first)[id]
  }

  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id]
    }
  }

  return result;
}

// 索引类型
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}

// Record
const obj: Record<string, any>;
```
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

## Issue
### What's differences between Type aliases and Interface
the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

