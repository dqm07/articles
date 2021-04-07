###
 # @Author: dongqingming
 # @Date: 2021-03-23 20:54:15
 # @LastEditTime: 2021-04-07 21:35:58
 # @LastEditors: dongqingming
 # @Description: Do not edit
 # @FilePath: /articles/deploy.sh
 # no bug no code
### 
#! /usr/bin/env sh

set -e
npm run docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/dqm07/dqm07.github.io.git master