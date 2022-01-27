## hexo-readmore

[![npm-image]][npm-url]
[![lic-image]](LICENSE)

> 为 Hexo 博客的每一篇文章都自动添加阅读更多的效果，关注公众号后方可解锁全站文章，从而将博客流量导流到微信公众号，达到涨粉丝数的目的。

### 进度

**前端的代码已开发完成，但后端代码仍在开发中，因此该插件暂时不可用，请知悉（2022年1月27日）。**

### 安装

![size-image]
[![dm-image]][npm-url]
[![dt-image]][npm-url]

- 运行 `npm install` 命令安装到本地项目

``` sh
$ npm install hexo-readmore --save
```

- 运行 `hexo generate` 命令构建本地项目

``` sh
$ hexo generate
```

- 运行 `hexo server` 命令启动本地服务

``` sh
$ hexo server
```

### 配置

编辑 Hexo 的 `_config.yml` 配置文件，新增 `hexo-readmore` 插件相关的信息，如下所示：

``` yml
readmore:
  enable: true                                                      # 是否启用，默认否
  blogId: 18762-1609305354821-257                                   # 已申请的博客 ID
  qrcode: https://www.techgrow.cn/img/wx_mp_qr.png                  # 已申请的公众号二维码链接
  name: 'Clay 的技术博客'                                             # 已申请的博客名称
  keyword: vip                                                      # 已申请的公众号回复关键字
  # libUrl: https://qiniu.techgrow.cn/js/readmore.js                # CDN 加速链接（可选）
  # random: 0.5                                                     # 每篇文章随机添加阅读更多效果的概率（可选），有效范围在 0.1 ~ 1 之间
```

### 取消某篇文章阅读更多的效果

若希望取消某篇文章的阅读更多效果，可以在文章的头模板中使用 `unreadmore: true` 配置属性，如下所示：

```
---
title: Hexo添加阅读更多的效果
tags: [Hexo]
unreadmore: true
keywords: [Hexo, 阅读更多, 插件]
date: 2022-01-12 22:25:49
updated: 2022-01-12 22:25:49
---
```

### 演示效果

- [官方博客](https://www.techgrow.cn/posts/52f22f9b.html)

![](https://raw.githubusercontent.com/rqh656418510/hexo-readmore/master/screenshot/demo.png)


## License

Released under the MIT License

[npm-image]: https://img.shields.io/npm/v/hexo-readmore?style=flat-square
[lic-image]: https://img.shields.io/npm/l/hexo-readmore?style=flat-square

[size-image]: https://img.shields.io/github/languages/code-size/rqh656418510/hexo-readmore?style=flat-square
[dm-image]: https://img.shields.io/npm/dm/hexo-readmore?style=flat-square
[dt-image]: https://img.shields.io/npm/dt/hexo-readmore?style=flat-square

[npm-url]: https://www.npmjs.com/package/hexo-readmore