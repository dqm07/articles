# Nginx
静态服务，高性能的http和反向代理服务器
```sh
...              # 全局块

events {         # events模板
  ...
}

http {           # http块
  ...            # http全局块

  server {       # server块
    ...          # server全局块

    location [pattern] {    # location块
      ...
    }
    location [pattern] {
      ...
    }
  }

  server {
    ...
  }
  ...       # http全局块
}
```
1. 全局块：nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入等全局的指令
2. events块：配置影响nginx服务器与用户的网络连接
3. http块：嵌套多个server，配置代理、缓存、日志定义等绝大多数功能和第三方模块的配置
4. server块：虚拟主机的相关配置
5. location块：配置请求的路由
   1. 匹配模式
      1. location [ = | ~ | ~* | ^~ ] /URI { ... }
         1. = ： 精准匹配，匹配成功后停止搜索
         2. ^~ ： 正则匹配，匹配到就停止匹配
         3. ~ ： 正则匹配，区分大小写
         4. ~* ： 正则匹配，不区分大小写
         5. 空 ： 前缀匹配
      2. location @/name/ { ... }
         1. 内部定向，即当找不到某个匹配文件走内部的location
   2. alias与root的区别
      1. root追加path，而alias是整个path别名，替代path
   3. try files
      1. try_files $uri /app/ @callback
      2. 顺序匹配文件，找到即返回，否则走到最后的一个内部重定向参数
   4. index
      1. 默认index，按照顺序执行，最后一个可以是相对路径
   5. proxy_pass
      1. 代理到某个Path，不影响浏览器的Url
   6. rewrite
      1. 会替换掉浏览器的Url

## 平滑重启原理