---
title: JS沙盒模式
date: 2023/11/03
tags:
 - 沙盒
 - 闭包
categories:
 - other
---
## 定义
沙箱（sandbox）：与外界隔绝的一个环境，内外环境互不影响，外界无法修改该环境内的任何信息，属于一个独立的世界。

JS沙箱：hack写法，是一种安全机制的设计，把一些不信任的代码运行在沙箱之内，使其不能访问沙箱之外的代码，即：限制不信任代码的能力范围。

## 实现
- 构建一个闭包
- 模拟原生浏览器对象

### 构建闭包环境
```js
(function foo(){
  var a = 1;
  console.log(a);
})()

console.log(a) // 抛出错误：”Uncaught ReferenceError: a is not defined“
```
内外部环境变量互不干扰，除非通过window传递挂载或者将IIFE分配给一个变量并存储执行的返回结果，才可能实现内容的查找。

### 原生浏览器对象的模拟

作用：防止闭包环境操作原生对象，污染原生环境
```js
(function (window) {
    var jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context);
    }
    jQuery.fn = jQuery.prototype = function () {
        //原型上的方法，即所有jQuery对象都可以共享的方法和属性
    }
    jQuery.fn.init.prototype = jQuery.fn;
    window.jQeury = window.$ = jQuery; //如果需要在外界暴露一些属性或者方法，可以将这些属性和方法加到window全局对象上去
})(window);
```

#### 熟悉几个api
1、eval
```js
var b = eval("({name:'张三'})")
console.log(b.name);
```
代码可以访问闭包和全局范围，会污染原生，性能也比较差

2、new Function
```js
var a = 1;

function sandbox() {
    var a = 2;
    return new Function('return a;');
}
var f = sandbox();
console.log(f())
```
- 只能在全局作用域执行，只能访问全局变量和自己的局部变量
- 性能较好，但是可以访问全局变量，形成污染

3、with
```js
function sandbox(o) {
  with (o){
    //a=5; 
    c=2;
    d=3;
    console.log(a,b,c,d); // 0,1,2,3 //每个变量首先被认为是一个局部变量，如果局部变量与 obj 对象的某个属性同名，则这个局部变量会指向 obj 对象属性。
  } 
}
var f = {
  a:0,
  b:1
}
sandbox(f);       
console.log(f);
console.log(c,d); // 2,3 c、d被泄露到window对象上
```
原理：in运算符，变量访问先找沙盒条件下，然后找全局
- 性能问题
- 非严格模式下会创建全局变量

4、in运算符
```js
var o = {  
  a : 1,  
  b : function() {}
}
console.log("a" in o);  //true
console.log("b" in o);  //true
console.log("c" in o);  //false
console.log("valueOf" in o);  //返回true，继承Object的原型方法
console.log("constructor" in o);  //返回true，继承Object的原型属性
```

5、with + new Function
```js
function sandbox (src) {
  src = 'with (sandbox) {' + src + '}'
  return new Function('sandbox', src)
}
var str = 'let a = 1;window.name="张三";console.log(a);console.log(b)'
var b = 2
sandbox(str)({});
console.log(window.name);//'张三'
```
减少全局的污染，但是仍然会污染全局。有一定的限制作用。

> 如果可以都限制在with条件下，进而可以解决沙箱机制的问题呢？

#### 基于Proxy实现沙箱
```js
function sandbox(code) {
  code = 'with (sandbox) {' + code + '}'
  const fn = new Function('sandbox', code)

  return function (sandbox) {
    const sandboxProxy = new Proxy(sandbox, {
      has(target, key) {
        return true
      }
    })
    return fn(sandboxProxy)
  }
}
var a = 1;
var code = 'console.log(a)' // TypeError: Cannot read property 'log' of undefined
sandbox(code)({})
```
适用大部分场景，除非Symbol.unscopables（定义对象的不可作用属性，即不被with限制住的属性）

```js
function sandbox(code) {
  code = 'with (sandbox) {' + code + '}'
  const fn = new Function('sandbox', code)

  return function (sandbox) {
    const sandboxProxy = new Proxy(sandbox, {
      has(target, key) {
        return true
      },
      get(target, key) {
        if (key === Symbol.unscopables) return undefined
        return target[key]
      }
    })
    return fn(sandboxProxy)
  }
}
var test = {
  a: 1,
  log(){
    console.log('11111')
  }
}
var code = 'log();console.log(a)' // 1111,TypeError: Cannot read property 'log' of undefined
sandbox(code)(test)
```

#### 沙箱快照
qiankun的snapshotSandbox
```js
function iter(obj, callbackFn) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      callbackFn(prop);
    }
  }
}

/**
 * 基于 diff 方式实现的沙箱，用于不支持 Proxy 的低版本浏览器
 */
class SnapshotSandbox {
  constructor(name) {
    this.name = name;
    this.proxy = window;
    this.type = 'Snapshot';
    this.sandboxRunning = true;
    this.windowSnapshot = {};
    this.modifyPropsMap = {};
    this.active();
  }
  //激活
  active() {
    // 记录当前快照
    this.windowSnapshot = {};
    iter(window, (prop) => {
      this.windowSnapshot[prop] = window[prop];
    });

    // 恢复之前的变更
    Object.keys(this.modifyPropsMap).forEach((p) => {
      window[p] = this.modifyPropsMap[p];
    });

    this.sandboxRunning = true;
  }
  //还原
  inactive() {
    this.modifyPropsMap = {};

    iter(window, (prop) => {
      if (window[prop] !== this.windowSnapshot[prop]) {
        // 记录变更，恢复环境
        this.modifyPropsMap[prop] = window[prop];
      
        window[prop] = this.windowSnapshot[prop];
      }
    });
    this.sandboxRunning = false;
  }
}
let sandbox = new SnapshotSandbox();
//test
((window) => {
    window.name = '张三'
    window.age = 18
    console.log(window.name, window.age) //    张三,18
    sandbox.inactive() //    还原
    console.log(window.name, window.age) //    undefined,undefined
    sandbox.active() //    激活
    console.log(window.name, window.age) //    张三,18
})(sandbox.proxy);
```

#### css隔离
- CSS module
- namespace
- Dynamic StyleSheet
- css in js
- Shadow DOM (Web Component)
