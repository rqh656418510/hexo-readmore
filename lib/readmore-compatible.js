/* Compatible with some special themes, such as Matery */

'use strict';

const colors = require('colors');
const cheerio = require('cheerio');
const { match } = require('node-match-path');

module.exports = function(html, data) {
	const $ = cheerio.load(html);
	const readmoreConfig = data.config.readmore;
	const pageEnabled = data.page.readmore == undefined ? true : data.page.readmore;
	const excludeRules = readmoreConfig.excludes == undefined ? [] : readmoreConfig.excludes;
	const debugEnabled = readmoreConfig && (readmoreConfig.debug == undefined ? true : readmoreConfig.debug);
	const mobileEnabled = readmoreConfig && (readmoreConfig.allowMobile == undefined ? false : readmoreConfig.allowMobile);
	
	// Blog encrypt
	const encryptBody = $("#hexo-blog-encrypt");
	if (encryptBody.length > 0) {
		return html;
	}

	// Exclude Rule
	var isExcluded = false;
	const pagePath = "/" + data.path;
	if (excludeRules && excludeRules.length > 0) {
		for (var i = 0; i < excludeRules.length; i++) {
		  if (match(excludeRules[i], pagePath).matches) {
			isExcluded = true;
			break;
		  }
		}
	}
	
    if (pageEnabled && !isExcluded) {
        const random = readmoreConfig.random || 1;
        const interval = readmoreConfig.interval || 60;
        const expires = readmoreConfig.expires || 365;
        const lockToc = readmoreConfig.lockToc || 'yes';
        const height = readmoreConfig.height || 'auto';
        const baseUrl = readmoreConfig.baseUrl || '';
        const tocSelector = readmoreConfig.tocSelector || '';
        const articleContentId = readmoreConfig.articleContentId || 'readmore-container';
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
                    "id": "${articleContentId}",
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
        
        const pageBody = $('#' + articleContentId);
	
        if (pageBody.length === 0) {
            if (debugEnabled) {
                console.log(colors.bold.white.bgYellow(' READMORE PLUGIN ') + ' not found article content by articleContentId "' + articleContentId + '" for ' + data.path);
            }
            return html;
        }
        else if (pageBody.length > 1) {
            if (debugEnabled) {
                console.log(colors.bold.white.bgYellow(' READMORE PLUGIN ') + ' found multi article content by articleContentId "' + articleContentId + '" for ' + data.path);
            }
            return html;
        }
        else if (pageBody.length === 1) {
            pageBody.append(script);
            return $.html();
        }
        else {
            return html;
        }
    }

};
