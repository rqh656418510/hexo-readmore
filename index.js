'use strict';

const colors = require('colors');
const readmoreConfig = hexo.config.readmore;

function validateFile(filePath) {
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

const pluginEnabled = readmoreConfig && (readmoreConfig.enable ? true : false);
if (pluginEnabled) {
	console.log(colors.bold.white.bgBlue(' READMORE PLUGIN ') + ' running... ');
}

hexo.extend.filter.register('after_post_render', function (data) {
	var postEnabled = data.readmore;
	if (postEnabled == undefined) {
		postEnabled = true;
	}

	if (pluginEnabled && postEnabled && validateFile(data.full_source)) {
		const random = readmoreConfig.random || 1;
		const interval = readmoreConfig.interval || 60;
		const expires = readmoreConfig.expires || 365;
		const lockToc = readmoreConfig.lockToc || 'yes';
		const height = readmoreConfig.height || 'auto';
		const validateTokenUrl = readmoreConfig.validateTokenUrl || '';
		const validateCaptchaUrl = readmoreConfig.validateCaptchaUrl || '';
		const addBrowseRecordUrl = readmoreConfig.addBrowseRecordUrl || '';
		const cssUrl = readmoreConfig.cssUrl || 'https://qiniu.techgrow.cn/readmore/dist/hexo.css';
		const libUrl = readmoreConfig.libUrl || 'https://qiniu.techgrow.cn/readmore/dist/readmore.js';
		
		const content = '<div id="readmore-container">' + data.content + '</div>';

		const script = `
			<link rel="stylesheet" type="text/css" href="` + cssUrl + `">
			<script src="` + libUrl + `" type="text/javascript"></script>
			<script>
			var isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
			if (!isMobile) {
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
						"validateTokenUrl": "${validateTokenUrl}",
						"validateCaptchaUrl": "${validateCaptchaUrl}",
						"addBrowseRecordUrl": "${addBrowseRecordUrl}"
					});
				} catch(e) {
					console.warn("readmore plugin occurred error: " + e.name + " | " + e.message);
				}
			}
			</script>
		`;

		data.content = content + '\n' + script;
	}

	return data;
});