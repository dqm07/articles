# npm
最大的软件注册地，三部分组成：官网、cli和npm包集合。对于Npm包的集中管理
```sh
npm view npm-package version(s)
## 查看npm包的版本号，不含s的情况下是最新版本

npm info npm-package
## 查看所有版本号，但是信息会更全

npm ls npm-package（-g）
## 查看本地的npm包版本（全局）
```

# npx
执行npm包不用下载包

# n
交互式node版本管理
```sh
## 安装
npm install -g n

## n <version>
## 安装某个版本，如果已经安装那么n会从缓存中安装，并切换到当前版本
n 10.16.0
n lts ##安装最新版本

## n
## 查看node的已安装版本
n

## rm
n rm 0.9.4 v0.10.0

## prune 删除当前版本之外的全部
n prune

## uninstall
n uninstall

## 三种不安装node直接使用的方式
## 1、直接查到node地址使用
n which version
## 2、run命令指定下载版本执行
n run version --debug test.js
## 3、exec
n exec version zsh

```

# nvm
功能与n相同，不同的是nvm是独立的软件包，能力相较于n更强大

# nrm
简单快捷地切换npm源，目前包含了npm、cnpm、taobao、nj(nodejitsu)
```sh
## 安装
npm install -g nrm

## 查看源列表
nrm ls

## 切换源
nrm use registry
```