/*
 * @Author: dongqingming
 * @Date: 2021-03-23 20:34:20
 * @LastEditTime: 2021-06-10 15:29:35
 * @LastEditors: dongqingming
 * @Description: Do not edit
 * @FilePath: /articles/docs/.vuepress/config.js
 * no bug no code
 */
const articleConfig = require('../article/config');
const engineeringConfig = require('../engineering/config');
const jsConfig = require('../js/config');
const nodeConfig = require('../node/config');
const othersConfig = require('../others/config');
const reactConfig = require('../react/config');
const vueConfig = require('../vue/config');

module.exports = {
  title: '大木的小站',
  description: '我的博客小站、文章记录与分享',
  themeConfig: {
    nav: [
      { text: '回到首页', link: '/' },
      {
        text: '技术笔记',
        items: [
          { text: '工程化', link: '/engineering/' },
          { text: 'JS', link: '/js/' },
          { text: 'REACT', link: '/react/' },
          { text: 'VUE', link: '/vue/' },
          { text: '其他', link: '/others/' },
        ]
      },
      { text: '读书笔记', link: '/article/' },
    ],
    sidebar: {
      ...articleConfig.sidebar,
      ...engineeringConfig.sidebar,
      ...jsConfig.sidebar,
      ...nodeConfig,
      ...othersConfig.sidebar,
      ...reactConfig.sidebar,
      ...vueConfig.sidebar
    }
  }
}