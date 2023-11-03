###
 # @Author: dongqingming
 # @Date: 2021-03-23 20:54:15
 # @LastEditTime: 2023-11-03 18:04:38
 # @LastEditors: dongqingming@58.com
 # @Description: Do not edit
 # @FilePath: /articles/deploy.sh
 # no bug no code
### 
#! /usr/bin/env sh

set -e
npm run build

cd .vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/dqm07/dqm07.github.io.git master