# 前端缓存

## 缓存规则

- 强缓存

  优先级高于协商缓存，与之相关联的属性有两个：Expires 和 Cache-Control。

  - Expires

    值为到期时间点，每次请求拿这个值判定过期与否，进而判定是否走缓存。这个的问题在于**不同时区的时间存在误差**

  - Cache-Control

    值为到期剩下的时间，相对于时间点更为准确，到期后直接走网络请求，否则走缓存

- 协商缓存

  如果同时设定了强缓存和协商缓存，协商缓存是不生效的，与之关联的属性也有两个：Last-Modified/If-Modified-Since 和 Etag/If-None-Match。

  - Last-Modified/If-Modified-Since

    顾名思义，属性值为上次文件修改的时间点，Last-Modified 来自 response header, 而下次请求资源的时候 request header 会通过 If-Modified-Since 将上次得到的时间点带给服务端，服务端判定是否更新来确认是否返回新资源。这个属性的问题是**时间的最小单位是秒级别，秒级以下的更新不能敏锐命中**

  - Etag/If-None-Match

    为了解决上述的问题，该属性的值为唯一标识，进而解决了秒级以下的更新问题。etag 属性来自 response header，If-None-Match 是下次请求的 request header 属性。该属性的优先级高于 Last-Modified
