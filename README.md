## hexo-readmore

[![npm-image]][npm-url]
[![lic-image]](LICENSE)

> 为 Hexo 博客的每一篇文章都自动添加阅读更多的效果，关注公众号后方可解锁全站文章，从而将博客流量导流到微信公众号，达到涨粉丝数的目的。

### 安装插件

![size-image]
[![dm-image]][npm-url]
[![dt-image]][npm-url]

- 运行 `npm install` 命令安装插件到本地项目

``` sh
$ npm install hexo-readmore --save
```

### 配置 Hexo

编辑 Hexo 的 `_config.yml` 配置文件，新增 `hexo-readmore` 插件相关的信息，如下所示：

``` yml
readmore:
  enable: true                                                      # 是否启用，默认否
  blogId: 18762-1609305354821-257                                   # 已申请的博客 ID
  name: '全栈技术驿站'                                                # 已申请的微信公众号名称
  keyword: tech                                                     # 已申请的微信公众号回复关键字
  qrcode: https://www.techgrow.cn/img/wx_mp_qr.png                  # 已申请的微信公众号二维码链接
  # libUrl: https://qiniu.techgrow.cn/js/readmore.js                # CDN 加速链接（可选）
  # random: 0.5                                                     # 每篇文章随机添加阅读更多效果的概率，有效范围在 0.1 ~ 1 之间（可选）
```

### 构建 Hexo

- 运行 `hexo generate` 命令构建本地项目

``` sh
$ hexo generate
```

- 运行 `hexo server` 命令启动本地服务

``` sh
$ hexo server
```

### 取消某篇文章阅读更多的效果

若希望强制取消某篇文章的阅读更多效果，可以在文章的头模板中使用 `readmore: false` 配置属性，如下所示：

```
---
title:  Hexo版本升级教程
tags: [Hexo]
readmore: false
keywords: [Hexo, 版本升级]
date: 2022-01-12 22:25:49
updated: 2022-01-12 22:25:49
---
```

### 效果截图

![](https://qiniu.techgrow.cn/uploads/2022/02/28/3f53ab36dfa84fb99a6508ae46e5373a)
![](https://qiniu.techgrow.cn/uploads/2022/02/28/202980a480fd463c814a31d5cc3fb2a1)

### 在线演示

- [官方博客](https://www.techgrow.cn/posts/c847598e.html)

## License

Released under the MIT License

[npm-image]: https://img.shields.io/npm/v/hexo-readmore?style=flat-square
[lic-image]: https://img.shields.io/npm/l/hexo-readmore?style=flat-square

[size-image]: https://img.shields.io/github/languages/code-size/rqh656418510/hexo-readmore?style=flat-square
[dm-image]: https://img.shields.io/npm/dm/hexo-readmore?style=flat-square
[dt-image]: https://img.shields.io/npm/dt/hexo-readmore?style=flat-square

[npm-url]: https://www.npmjs.com/package/hexo-readmore