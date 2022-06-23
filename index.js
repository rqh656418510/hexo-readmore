'use strict';

var colors = require('colors');

var readmoreConfig = hexo.config.readmore;
var pluginEnabled = readmoreConfig && (readmoreConfig.enable ? true : false);

if (pluginEnabled) {
	console.log(colors.bold.white.bgBlue(' READMORE PLUGIN ') + ' running... ');
}

function validateFile(filePath) {
	if (!filePath || filePath === '') {
		return true;
	}

	var startIndex = filePath.lastIndexOf(".");
	if (startIndex != -1) {
		var type = filePath.substring(startIndex + 1, filePath.length).toLowerCase();
		return "md" === type;
	}
	return false;
}

hexo.extend.filter.register('after_post_render', function (data) {

	var postEnabled = data.readmore;

	// if postEnabled is undefined or null
	if (postEnabled == undefined) {
		postEnabled = true;
	}

	if (pluginEnabled && postEnabled && validateFile(data.full_source)) {

		var random = readmoreConfig.random || 1;
		var interval = readmoreConfig.interval || 60;
		var expires = readmoreConfig.expires || 365;
		var lockToc = readmoreConfig.lockToc || 'yes';
		var cssUrl = readmoreConfig.cssUrl || 'https://qiniu.techgrow.cn/readmore/dist/hexo.css';
		var libUrl = readmoreConfig.libUrl || 'https://qiniu.techgrow.cn/readmore/dist/readmore.js';

		data.content = '<div id="readmore-container">' + data.content + '</div>';

		var str = `
			<link rel="stylesheet" type="text/css" href="` + cssUrl + `">
			<script src="` + libUrl + `" type="text/javascript"></script>
			<script>
			var isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
			if (!isMobile) {
				try {
					var plugin = new ReadmorePlugin();
					plugin.init({
						"id": "readmore-container",
						"blogId": "${readmoreConfig.blogId}",
						"name": "${readmoreConfig.name}",
						"qrcode": "${readmoreConfig.qrcode}",
						"keyword": "${readmoreConfig.keyword}",
						"lockToc": "${lockToc}",
						"type": "hexo",
						"random": "${random}",
						"interval": "${interval}",
						"expires": "${expires}"
					});
				} catch(e) {
					console.warn("readmore plugin occurred error: " + e.name + " | " + e.message);
				}
			}
			</script>
		`;

		data.content = data.content + '\n' + str;
	}

	return data;
});