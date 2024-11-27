## hexo-readmore

[![npm-image]][npm-url]
[![lic-image]](LICENSE)
![size-image]
[![dm-image]][npm-url]
[![dt-image]][npm-url]

> Hexo 微信公众号引流插件，将免费的公众号引流工具整合到博客中，用户扫码关注公众号后才可以解锁文章，从而将博客流量引流到公众号，达到涨粉丝数的目的。

## 文档

- [官方中文文档](https://docs.techgrow.cn/v1/wechat/tutorial/hexo/)

## 特色功能

- 兼容主流的 Hexo 主题
- 支持随机为博客添加引流功能
- 支持关闭某篇文章的引流功能
- 支持微信公众号验证码解锁文章
- 支持查询用户解锁文章的历史记录
- 支持自定义或者动态计算文章内容的预览高度
- 支持自定义 CSS 样式，轻松适配不同风格的博客
- 支持开放 API，灵活接入第三方私有化部署的系统服务

## 注册博客

浏览器访问 [TechGrow](https://open.techgrow.cn) 的官网，注册并登录账号后，进入博客的后台管理页面。首先点击左侧的菜单 `博客注册`，然后点击 `新增` 按钮，添加自己博客的信息。博客注册成功后，记录下博客 ID，后面的步骤会使用到

![](https://raw.githubusercontent.com/rqh656418510/hexo-readmore/master/screenshot/717e14eb59dd44dea62d6a0b7549abfd.png)

## 设置公众号

在微信公众号的后台管理页面，菜单栏里选择 `自动回复` - `关键词回复`，启用 `自动回复`，然后点击 `添加回复` 按钮：

![](https://raw.githubusercontent.com/rqh656418510/hexo-readmore/master/screenshot/em64p7w8wlqtt0rsjop0jjeywx29m25w.png)

填写 `规则名称`、`关键词（当初你在 TechGrow 中设置的）`、`回复内容` 选择 `文字`，然后 `回复文字` 的内容填写获取博客解锁验证码的链接，如下所示（请自行更改 `xxxxx-xxxxxxxxx-xxx` 为你申请到的博客 ID）

``` html
<a href="https://open.techgrow.cn/#/readmore/captcha/generate?blogId=xxxxx-xxxxxxxxx-xxx">点击链接，获取博客解锁验证码</a>
```

![](https://raw.githubusercontent.com/rqh656418510/hexo-readmore/master/screenshot/yd89wbdji196ixtwzgzamw37fbein1ia.png)

此时，当读者关注你的微信公众号，并输入关键词后（比如我设置的关键词就是 `tech`），那么读者就会自动接收到获取博客解锁验证码的链接

## 安装插件

- 运行 `npm install` 命令安装插件到本地博客

``` sh
$ npm install hexo-readmore --save
```

## 配置 Hexo

编辑 Hexo 自身的 `_config.yml` 配置文件，新增插件的配置信息（请自行更改博客相关的信息），如下所示：

``` yml
readmore:
  # 是否启用
  enable: true
  # 已申请的博客 ID
  blogId: '18762-1609305354821-257'
  # 已申请的微信公众号名称
  name: '全栈技术驿站'
  # 已申请的微信公众号回复关键词
  keyword: 'tech'
  # 已申请的微信公众号二维码图片
  qrcode: 'https://www.techgrow.cn/img/wx_mp_qr.png'
  # 自定义的 JS 资源链接，可用于 CDN 加速
  libUrl: 'https://qiniu.techgrow.cn/readmore/dist/readmore.js'
  # 自定义的 CSS 资源链接，可用于适配不同风格的博客
  cssUrl: 'https://qiniu.techgrow.cn/readmore/dist/hexo.css'
  # 文章内容的预览高度(例如 300)，设置值为 auto 则表示预览高度自适应
  height: 'auto'
  # 命令行终端是否输出日志信息
  debug: true
  # 文章解锁后凭证的有效天数
  expires: 365
  # 定时校验凭证有效性的时间间隔（秒）
  interval: 60
  # 是否添加微信公众号引流工具到移动端页面
  allowMobile: false
  # 每篇文章随机添加引流工具的概率，范围在 0.1 ~ 1.0 之间，代表 10% ~ 100%，其中 1.0 表示所有文章默认都添加引流工具
  random: 1.0
```

或者打开 TechGrow 的[博客后台管理页面](https://open.techgrow.cn/#/readmore/website/register)，点击博客列表中右侧的 `使用` 链接，将窗口里的 YAML 配置内容复制到 Hexo 自身的 `_config.yml` 配置文件即可。

## 参数说明

| 参数             | 类型            | 必填 | 默认值                                                | 说明 |
| ---------------- | --------------- | ---- | ----------------------------------------------------- | ---- |
| enable           | Boolean         | 是   | `false`                                               | -    |
| blogId           | String          | 是   |                                                       | -    |
| name             | String          | 是   |                                                       | -    |
| keyword          | String          | 是   |                                                       | -    |
| qrcode           | String          | 是   |                                                       | -    |
| libUrl           | String          | 否   | `https://qiniu.techgrow.cn/readmore/dist/readmore.js` | -    |
| cssUrl           | String          | 否   | `https://qiniu.techgrow.cn/readmore/dist/hexo.css`    | -    |
| debug            | Boolean         | 否   | `true`                                                | -    |
| height           | String / Number | 否   | `auto`                                                | -    |
| expires          | Number          | 否   | `365`                                                 | -    |
| interval         | Number          | 否   | `60`                                                  | -    |
| allowMobile      | Boolean         | 否   | `false`                                               | -    |
| random           | Number          | 否   | `1.0`                                                 | -    |
| excludes         | Array           | 否   |                                                       | -    |
| tocSelector      | String          | 否   |                                                       | -    |
| articleContentId | String          | 否   | `readmore-container`                                  | -    |
| pjaxSelector     | String          | 否   |                                                       | -    |
| pjaxCssClass     | String          | 否   |                                                       | -    |

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

打开文章页面，若文章自动隐藏了部分内容，并且出现了 `阅读全文` 按钮，则说明引流插件正常运行，如下图所示：

![](https://raw.githubusercontent.com/rqh656418510/hexo-readmore/master/screenshot/3f53ab36dfa84fb99a6508ae46e5373a.png)

点击 `阅读全文按钮`，会弹出微信公众号的二维码窗口，如下图所示：

![](https://raw.githubusercontent.com/rqh656418510/hexo-readmore/master/screenshot/202980a480fd463c814a31d5cc3fb2a1.png)


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

若希望关闭部分文章的微信公众号引流功能，可以使用插件的 `excludes` 参数来实现，支持使用路径、通配符的匹配规则。

- 根据 URL 路径，关闭某篇文章的引流功能

``` yml
# 排除 URL 为 `/notes/637e7b8f.html` 的文章
readmore:
  ....
  excludes:
    - '/notes/637e7b8f.html'
```

- 根据 URL 通配符，关闭某个目录下所有文章的引流功能

``` yml
# 排除 URL 以 `/fontend` 开头的文章
# 排除 URL 为 `/backend/python/io` 的文章
readmore:
  ....
  excludes:
    - '/fontend/*'
    - '/backend/*/io'
```

> 提示：针对 `/tags`、`/categories`、`/archives`、`/comments`、`/about`、`/links` 这几个特殊页面，Hexo 引流插件默认不会添加引流功能。

## 主题兼容问题

在 Hexo 博客安装引流插件之后，如果出现兼容问题，比如代码块显示不正常、无论怎样点击文章目录（Toc）的锚点链接都没有任何反应，那么这些情况一般是引流插件与 Hexo 主题存在兼容问题导致的，解决办法是新增以下两个插件配置参数。配置示例如下：

``` yml
readmore:
  ....
  # 获取文章目录（Toc）的 JS 选择器，在存在兼容性问题时才需要根据不同的主题进行配置
  tocSelector: ''
  # 文章主体内容所在容器（DIV 标签）的 ID，在存在兼容性问题时才需要根据不同的主题进行配置
  articleContentId: ''
```

值得一提的是，上述两个参数都需要根据不同的 Hexo 主题来配置，其中不同主题的配置示例如下（特别注意，随着主题的迭代开发，以下配置可能会过时失效，请根据最新的主题代码来配置）：

| 主题                                                           | tocSelector 配置              | articleContentId 配置                   |
| -------------------------------------------------------------- | ----------------------------- | --------------------------------------- |
| [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly) | `tocSelector: '#card-toc'`    | `articleContentId: 'article-container'` |
| [Matery](https://github.com/blinkfox/hexo-theme-matery)        | `tocSelector: '#toc-content'` | `articleContentId: 'articleContent'`    |
| [Tree](https://github.com/wujun234/hexo-theme-tree)            | `tocSelector: '#site-toc'`    | `articleContentId: 'article-content'`   |

上述 `tocSelector` 参数的作用是通过 JS 选择器获取文章目录（Toc）的内容，而 `articleContentId` 参数是用于指定文章主体内容所在容器（DIV 标签）的 ID。

> 特别注意：在正常情况下，不建议也不需要配置 `tocSelector` 和 `articleContentId` 这两个参数。另外，`tocSelector` 参数可以单独使用，而 `articleContentId` 参数除了可以单独使用之外，还可以配合下面介绍的 `pjaxSelector` 与 `pjaxCssClass` 参数一起使用。

## Pjax 的支持

如果博客启用了 Pjax，那么 Hexo 引流插件需要使用 `pjaxCssClass` 参数指定 Pjax 支持重载的 Css 类名（例如 `pjax`），同时还需要使用 `pjaxSelector` 参数指定获取文章主体内容的 JS 选择器。否则在站点内（如首页、标签页、分类页、归档页等）通过链接访问文章页面时，引流工具不会生效，除非是手动刷新一次页面。配置示例如下：

``` yml
readmore:
  ....
  # 获取文章主体内容的 JS 选择器，在博客启用了 Pjax 的情况下才需要根据不同的主题进行配置
  pjaxSelector: ''
  # Pjax 支持重载的 Css 类名（例如 'pjax'），在博客启用了 Pjax 的情况下才需要根据不同的主题进行配置
  pjaxCssClass: ''
```

值得一提的是，上述两个参数都需要根据不同的 Hexo 主题来配置，其中不同主题的配置示例如下（特别注意，随着主题的迭代开发，以下配置可能会过时失效，请根据最新的主题代码来配置）：

| 主题                                                           | pjaxCssClass 配置      | pjaxSelector 配置                     | 特别说明                                                              |
| -------------------------------------------------------------- | ---------------------- | ------------------------------------- | --------------------------------------------------------------------- |
| [NexT](https://github.com/next-theme/hexo-theme-next)          | `pjaxCssClass: 'pjax'` | `pjaxSelector: 'div.main-inner'`      |                                                                       |
| [Tree](https://github.com/wujun234/hexo-theme-tree)            | `pjaxCssClass: 'pjax'` | `pjaxSelector: 'div#article-content'` |                                                                       |
| [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly) |                        |                                       | [解决 Pjax 不生效的问题](https://www.techgrow.cn/posts/8e3e42f0.html) |

上述 `pjaxCssClass` 参数的作用是让 Pjax 重载引流工具的代码段，而 `pjaxSelector` 参数的作用是通过 JS 选择器获取文章主体内容。当配置了 `pjaxSelector` 和 `pjaxCssClass` 参数之后，Hexo 引流插件会往所有渲染后的 HTML 页面自动添加引流代码段，包括 `Page` 和 `Post` 的页面类型。如果两者都不配置，则 Hexo 引流插件默认只会往渲染后的 `Post` 页面添加引流代码段。

> 特别注意：由于 Pjax 非常依赖页面布局的一致性，因此请确保通过 `pjaxSelector` 参数指定的 JS 选择器在所有页面（包括 `Page` 和 `Post`）都能够获取到唯一的 HTML 标签元素，否则会导致部分页面的 Pjax 或者引流功能不会生效。如果无法满足这一点，则需要手动更改 Hexo 主题的模板代码，使 JS 选择器在所有页面都能够获取到唯一的 HTML 标签元素。Hexo 主题模板代码的修改可以参考 [NexT](https://github.com/rqh656418510/hexo-theme-next-8.x/commit/6e259889fdc867ccd8eb1163e9b1f0629493387a)，然后设置 `pjaxSelector` 的参数值为 `div.post-container`，并设置 `pjaxCssClass` 的参数值为 `pjax`。

## 开放 API 支持

若不希望依赖 TechGrow 官方提供的系统服务，可以选择使用开放 API 的方式，让引流插件直接使用私有化部署的后端系统服务，详细教程请阅读[官方文档](https://docs.techgrow.cn/v1/wechat/openapi/api/)。

## 自定义样式

插件默认使用了定义在 [hexo.css](https://qiniu.techgrow.cn/readmore/dist/hexo.css) 的 CSS 样式，你可以使用以下两种方式自定义自己的样式：

- 第一种方式：更改博客主题的 CSS 源码文件，将自定义的那部分 CSS 样式添加到里面
- 第二种方式：根据 [hexo.css](https://qiniu.techgrow.cn/readmore/dist/hexo.css) 创建自己的 CSS 文件（完整的），并将其存放在自己的博客里，同时通过插件的 `cssUrl` 配置参数来指定其访问的 URL 路径

> 提示：为了方便日后维护，强烈建议使用第二种方式来添加自定义样式

## 已兼容的主题

| 主题      | GitHub 仓库                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ |
| NexT      | [https://github.com/next-theme/hexo-theme-next](https://github.com/next-theme/hexo-theme-next)         |
| Yilia     | [https://github.com/litten/hexo-theme-yilia](https://github.com/litten/hexo-theme-yilia)               |
| Icarus    | [https://github.com/ppoffice/hexo-theme-icarus](https://github.com/ppoffice/hexo-theme-icarus)         |
| Matery    | [https://github.com/blinkfox/hexo-theme-matery](https://github.com/blinkfox/hexo-theme-matery)         |
| Fluid     | [https://github.com/fluid-dev/hexo-theme-fluid](https://github.com/fluid-dev/hexo-theme-fluid)         |
| Stun      | [https://github.com/liuyib/hexo-theme-stun](https://github.com/liuyib/hexo-theme-stun)                 |
| Butterfly | [https://github.com/jerryc127/hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly) |
| Stellar   | [https://github.com/xaoxuu/hexo-theme-stellar](https://github.com/xaoxuu/hexo-theme-stellar)           |
| Tree      | [https://github.com/wujun234/hexo-theme-tree](https://github.com/wujun234/hexo-theme-tree)             |

## 周边生态

- [Hexo 引流插件](https://github.com/rqh656418510/hexo-readmore)
- [VuePress v1 引流插件](https://github.com/rqh656418510/vuepress-plugin-readmore-popular)
- [VuePress v2 引流插件](https://github.com/rqh656418510/vuepress-plugin-readmore-popular-next)
- [基于开放 API 的 Java 后端引流项目](https://github.com/rqh656418510/techgrow-openapi-java)
- [TechGrow 公众号引流工具的整合案例](https://github.com/rqh656418510/techgrow-blog-demo)

## 官方微信群

- [微信群二维码](https://www.techgrow.cn/img/wx-group-qr-techgrow.png)

## License

Released under the MIT License

[npm-image]: https://img.shields.io/npm/v/hexo-readmore?style=flat-square
[lic-image]: https://img.shields.io/npm/l/hexo-readmore?style=flat-square

[size-image]: https://img.shields.io/github/languages/code-size/rqh656418510/hexo-readmore?style=flat-square
[dm-image]: https://img.shields.io/npm/dm/hexo-readmore?style=flat-square
[dt-image]: https://img.shields.io/npm/dt/hexo-readmore?style=flat-square

[npm-url]: https://www.npmjs.com/package/hexo-readmore
