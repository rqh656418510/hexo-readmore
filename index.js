'use strict';

function isHtmlFile(filePath){
	var startIndex = filePath.lastIndexOf(".");
	if (startIndex != -1) {
	  var type = filePath.substring(startIndex + 1, filePath.length).toLowerCase();
	  return "html" === type;
	}
	return false;
}

hexo.extend.filter.register('after_post_render', function(data) {
	var readmoreConfig = hexo.config.readmore;
	var postEnabled = data.readmore;
	
	// if the value of postEnabled is undefined or null
	if (postEnabled == undefined) { 
		postEnabled = true;
	}
	
	if (postEnabled && readmoreConfig && (readmoreConfig.enable ? true : false) && isHtmlFile(data.path)) {
		
		var random = readmoreConfig.random ? readmoreConfig.random : 1;
		var libUrl = readmoreConfig.libUrl ? readmoreConfig.libUrl : 'https://qiniu.techgrow.cn/js/readmore.js';

		data.content = '<div id="readmore-container">' + data.content + '</div>';
		
		var str = `
			<script src="` + libUrl + `" type="text/javascript"></script>
			<script>
			var isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
			if (!isMobile) {
				try {
					var btw = new BTWPlugin();
					btw.init({
						"id": "readmore-container",
						"blogId": "${readmoreConfig.blogId}",
						"name": "${readmoreConfig.name}",
						"qrcode": "${readmoreConfig.qrcode}",
						"keyword": "${readmoreConfig.keyword}",
						"random": "${random}"
					});
				} catch(e) {
					console.warn(e.name + " : " + e.message);
				}
			}
			</script>
		`;

		data.content = data.content + '\n' + str;
	}

	return data;
});