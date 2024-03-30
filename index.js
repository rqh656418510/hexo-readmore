'use strict';

const colors = require('colors');
const { match } = require('node-match-path');

const readmoreConfig = hexo.config.readmore;
const articleContentId = readmoreConfig.articleContentId || '';
const pjaxSelector = readmoreConfig.pjaxSelector || '';
const pjaxCssClass = readmoreConfig.pjaxCssClass || '';
const excludeRules = readmoreConfig.excludes == undefined ? [] : readmoreConfig.excludes;
const pluginEnabled = readmoreConfig && (readmoreConfig.enable == undefined ? false : readmoreConfig.enable);
const mobileEnabled = readmoreConfig && (readmoreConfig.allowMobile == undefined ? false : readmoreConfig.allowMobile);

if (!pluginEnabled) {
	return;
} else {
	console.log(colors.bold.white.bgBlue(' READMORE PLUGIN ') + ' running... ');
}

if (articleContentId != '') {
	// After render html, include post and page types
	hexo.extend.filter.register('after_render:html', require('./lib/readmore-compatible'));
}
else if (pjaxSelector != '' || pjaxCssClass != '') {
	// After render html, include post and page types
	hexo.extend.filter.register('after_render:html', require('./lib/readmore-pjax'));
}
else {
	// After render html, include post type
	hexo.extend.filter.register('after_post_render', function (data) {

		var isExcluded = false;
		const postPath = "/" + data.path;
		if (excludeRules && excludeRules.length > 0) {
			for (var i = 0; i < excludeRules.length; i++) {
			  if (match(excludeRules[i], postPath).matches) {
				isExcluded = true;
				break;
			  }
			}
		}
		
		var postEnabled = data.readmore == undefined ? true : data.readmore;
		
		if (postEnabled && !isExcluded && validateMdFile(data.full_source)) {
			const random = readmoreConfig.random || 1;
			const interval = readmoreConfig.interval || 60;
			const expires = readmoreConfig.expires || 365;
			const lockToc = readmoreConfig.lockToc || 'yes';
			const height = readmoreConfig.height || 'auto';
			const baseUrl = readmoreConfig.baseUrl || '';
			const tocSelector = readmoreConfig.tocSelector || '';
			const cssUrl = readmoreConfig.cssUrl || 'https://qiniu.techgrow.cn/readmore/dist/hexo.css';
			const libUrl = readmoreConfig.libUrl || 'https://qiniu.techgrow.cn/readmore/dist/readmore.js';
			
			const content = '<div id="readmore-container">' + data.content + '</div>';
	
			const script = `
				<link rel="stylesheet" type="text/css" href="${cssUrl}">
				<script src="${libUrl}" type="text/javascript"></script>
				<script>
				var isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
				var isEncrypt = document.getElementById('hexo-blog-encrypt');
				var allowMobile = ${mobileEnabled};
				if (!isEncrypt && (!isMobile || (isMobile && allowMobile))) {
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
							"tocSelector": "${tocSelector}"
						});
					} catch(e) {
						console.warn("readmore plugin occurred error: " + e.name + " | " + e.message);
					}
				}
				</script>
			`;
	
			data.content = content + script;
		}
	
		return data;
	});
}

function validateMdFile(filePath) {
	if (!filePath || filePath === '') {
		return true;
	}

	var startIndex = filePath.lastIndexOf('.');
	if (startIndex != -1) {
		var type = filePath.substring(startIndex + 1, filePath.length).toLowerCase();
		return 'md' === type;
	}
	return false;
}
