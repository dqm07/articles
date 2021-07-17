# 设计模式

## 依赖注入
控制反转 & 依赖注入，控制反转是解耦的解决思想，依赖注入则是设计模式

### 控制反转
代码耦合一直开发者需要关注的点，模块之间的因为业务发展耦合性会越来越高，控制反转就是解决代码之间耦合的一种解决思想：通过一个三方Ioc来处理模块之间耦合问题，进而降低维护成本

以前模块A调用模块B的主动行为，因为Ioc的三方存在导致被动输入，控制权颠倒过来，这就是控制反转的由来

### 设计思想
依赖注入是将实例变量传入到一个对象中去
```js
// original
public class Human {
    ...
    Father father;
    ...
    public Human() {
        father = new Father();
    }
}

// DI
public class Human {
    ...
    Father father;
    ...
    public Human(Father father) {
        this.father = father;
    }
}
```