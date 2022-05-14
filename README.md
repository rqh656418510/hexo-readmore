## hexo-readmore

[![npm-image]][npm-url]
[![lic-image]](LICENSE)
![size-image]
[![dm-image]][npm-url]
[![dt-image]][npm-url]

> Hexo 微信公众号导流插件，将免费的公众号导流工具整合到博客中，用户扫码关注公众号后才可以解锁文章，从而将博客流量导流到公众号，达到涨粉丝数的目的。

## 特色功能

- [x] 已兼容主流的 Hexo 主题
- [x] 支持关闭某篇文章的导流功能
- [x] 支持随机为博客添加导流功能
- [x] 支持查询用户解锁文章的历史记录
- [x] 支持自定义 CSS 样式，轻松适配不同风格的博客

## 注册博客

浏览器访问 [TechGrow](https://open.techgrow.cn) 的官网，注册并登录账号后，进入博客的后台管理页面。首先点击左侧的菜单 `博客注册`，然后点击 `新增` 按钮，添加自己博客的信息。博客注册成功后，记录下博客 ID，后面的步骤会使用到

![](https://www.techgrow.cn/uploads/2022/02/28/717e14eb59dd44dea62d6a0b7549abfd.png)

## 设置公众号

在微信公众号的后台管理页面，菜单栏里选择 `自动回复` - `关键词回复`，启用 `自动回复`，然后点击 `添加回复` 按钮：

![](https://www.techgrow.cn/uploads/2022/02/28/em64p7w8wlqtt0rsjop0jjeywx29m25w.png)

填写 `规则名称`、`关键词（当初你在 TechGrow 中设置的）`、`回复内容` 选择 `文字`，然后 `回复文字` 的内容填写获取博客解锁验证码的链接，如下所示（请自行更改 `xxxxx-xxxxxxxxx-xxx` 为你申请到的博客 ID）

``` html
<a href="https://open.techgrow.cn/#/readmore/captcha/generate?blogId=xxxxx-xxxxxxxxx-xxx">点击链接，获取博客解锁验证码</a>
```

![](https://www.techgrow.cn/uploads/2022/02/28/yd89wbdji196ixtwzgzamw37fbein1ia.png)

此时，当读者关注你的微信公众号，并输入关键词后（比如我设置的关键词就是 `tech`），那么读者就会自动接收到获取博客解锁验证码的链接

## 安装插件

- 运行 `npm install` 命令安装插件到本地博客

``` sh
$ npm install hexo-readmore --save
```

## 配置 Hexo

编辑 Hexo 的 `_config.yml` 配置文件，新增插件的配置信息（请自行更改博客相关的信息），如下所示：

``` yml
readmore:
  enable: true                                                      # 是否启用，默认否
  blogId: '18762-1609305354821-257'                                 # 已申请的博客 ID
  name: '全栈技术驿站'                                                # 已申请的微信公众号名称
  keyword: 'tech'                                                   # 已申请的微信公众号回复关键词
  qrcode: 'https://www.techgrow.cn/img/wx_mp_qr.png'                # 已申请的微信公众号二维码链接
  # libUrl: 'https://qiniu.techgrow.cn/js/readmore.js'              # 自定义的 JS 资源链接，可用于 CDN 加速（可选）
  # cssUrl: 'https://qiniu.techgrow.cn/css/hexo.css'                # 自定义的 CSS 资源链接，可用于适配不同风格的博客（可选）
  # random: 0.8                                                     # 每篇文章随机添加微信公众号导流工具的概率，有效范围在 0.1 ~ 1 之间，1 则表示所有文章默认都自动添加导流工具（可选）
```

或者打开 TechGrow 的[博客后台管理页面](https://open.techgrow.cn/#/readmore/website/register)，点击博客列表中右侧的 `使用` 链接，将窗口里的 YML 配置内容复制到 Hexo 的 `_config.yml` 配置文件即可

## 构建 Hexo

- 运行 `hexo clean` 命令清理本地博客

``` sh
$ hexo clean
```

- 运行 `hexo generate` 命令构建本地博客

``` sh
$ hexo generate
```

- 运行 `hexo server` 命令启动本地博客服务

``` sh
$ hexo server
```

## 验证插件效果

打开文章页面，若文章自动隐藏了部分内容，并且出现了 `阅读全文` 按钮，则说明导流插件正常运行，如下图所示：

![](https://www.techgrow.cn/uploads/2022/02/28/3f53ab36dfa84fb99a6508ae46e5373a.png)

点击 `阅读全文按钮`，会弹出微信公众号的二维码窗口，如下图所示：

![](https://www.techgrow.cn/uploads/2022/02/28/202980a480fd463c814a31d5cc3fb2a1.png)

## 取消阅读限制

若希望关闭某篇文章的微信公众号导流功能，可以在文章的头模板中使用 `readmore: false` 配置属性，如下所示：

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

## 已兼容的主题

- [x] [NexT](https://github.com/next-theme/hexo-theme-next)
- [x] [Yilia](https://github.com/litten/hexo-theme-yilia)
- [x] [Icarus](https://github.com/ppoffice/hexo-theme-icarus)
- [x] [Matery](https://github.com/blinkfox/hexo-theme-matery)
- [x] [Fluid](https://github.com/fluid-dev/hexo-theme-fluid)
- [x] [Stun](https://github.com/liuyib/hexo-theme-stun)

## 官方教程

- [在线演示案例](https://www.techgrow.cn/posts/52f22f9b.html)
- [博客实现微信公众号导流](https://open.techgrow.cn/#/guide/readmore/blog)
- [Hexo 使用插件实现微信公众号导流](https://open.techgrow.cn/#/guide/readmore/hexo)

## 开发计划

- [ ] 支持博客的 UV、PV 统计
- [ ] 在博客的后台管理界面中，支持博客浏览量的图表分析

## 官方微信群

![](https://www.techgrow.cn/img/wx-group-qr-techgrow.png)

## License

Released under the MIT License

[npm-image]: https://img.shields.io/npm/v/hexo-readmore?style=flat-square
[lic-image]: https://img.shields.io/npm/l/hexo-readmore?style=flat-square

[size-image]: https://img.shields.io/github/languages/code-size/rqh656418510/hexo-readmore?style=flat-square
[dm-image]: https://img.shields.io/npm/dm/hexo-readmore?style=flat-square
[dt-image]: https://img.shields.io/npm/dt/hexo-readmore?style=flat-square

[npm-url]: https://www.npmjs.com/package/hexo-readmore