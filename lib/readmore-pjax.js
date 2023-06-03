'use strict';

const colors = require('colors');
const cheerio = require('cheerio');

module.exports = function(html, data) {
	const $ = cheerio.load(html);
	const readmoreConfig = data.config.readmore;
	const debugEnabled = readmoreConfig.debug == undefined ? true : readmoreConfig.debug;
	const mobileEnabled = readmoreConfig && (readmoreConfig.allowMobile ? true : false);
	const pageEnabled = data.page.readmore == undefined ? true : data.page.readmore;
	
	// Blog encrypt
	const encryptBody = $("#hexo-blog-encrypt");
	if (encryptBody.length > 0) {
		return html;
	}

	const execute = pageEnabled ? 'yes' : 'no';
	const random = readmoreConfig.random || 1;
	const interval = readmoreConfig.interval || 60;
	const expires = readmoreConfig.expires || 365;
	const lockToc = readmoreConfig.lockToc || 'yes';
	const height = readmoreConfig.height || 'auto';
	const baseUrl = readmoreConfig.baseUrl || '';
	const pjaxSelector = readmoreConfig.pjaxSelector || '';
	const pjaxCssClass = readmoreConfig.pjaxCssClass || '';
	const cssUrl = readmoreConfig.cssUrl || 'https://qiniu.techgrow.cn/readmore/dist/hexo.css';
	const libUrl = readmoreConfig.libUrl || 'https://qiniu.techgrow.cn/readmore/dist/readmore.js';

	const script = `
		<link rel="stylesheet" type="text/css" href="${cssUrl}">
		<script data-pjax src="${libUrl}" type="text/javascript"></script>
		<script data-pjax>
		var isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
		var allowMobile = ${mobileEnabled};
		if (!isMobile || (isMobile && allowMobile)) {
			try {
			var plugin = new ReadmorePlugin();
			plugin.init({
				"type": "hexo",
				"id": "readmore-container",
				"name": "${readmoreConfig.name}",
				"blogId": "${readmoreConfig.blogId}",
				"qrcode": "${readmoreConfig.qrcode}",
				"keyword": "${readmoreConfig.keyword}",
				"random": "${random}",
				"height": "${height}",
				"expires": "${expires}",
				"lockToc": "${lockToc}",
				"interval": "${interval}",
				"baseUrl": "${baseUrl}",
				"execute": "${execute}"
			});
			} catch(e) {
			console.warn("readmore plugin occurred error: " + e.name + " | " + e.message);
			}
		}
		</script>
	`;

	const pageBody = $(pjaxSelector);
	
	if (pageBody.length === 0) {
		if (debugEnabled) {
			console.log(colors.bold.white.bgRed(' READMORE PLUGIN ') + ' not found article content by selector "' + pjaxSelector + '" for ' + data.path);
		}
		return html;
	}
	else if (pageBody.length > 1) {
		if (debugEnabled) {
			console.log(colors.bold.white.bgRed(' READMORE PLUGIN ') + ' found multi article content by selector "' + pjaxSelector + '" for ' + data.path);
		}
		return html;
	}
	else if (pageBody.length === 1) {
		pageBody.attr('id', 'readmore-container');
		pageBody.append('<div id="readmore-expansion" class="' + pjaxCssClass + '"></div>');
		pageBody.append(script);
		return $.html();
	}
	else {
		return html;
	}
	
};