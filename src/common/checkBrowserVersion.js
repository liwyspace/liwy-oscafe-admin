import bowser from 'bowser';

/** 校验浏览器版本 */
const browser = bowser.getParser(window.navigator.userAgent);
const isValidBrowser = browser.satisfies({
    // declare browsers per OS
    windows: {
        'internet explorer': '>10'
    },
    macos: {
        safari: '>10.1'
    },

    // per platform (mobile, desktop or tablet)
    mobile: {
        safari: '>9',
        'android browser': '>3.10'
    },

    // or in general
    chrome: '>20.1.1432',
    firefox: '>31',
    opera: '>22'
});
if(!isValidBrowser) {
    window.alert('很抱歉，本系统不支持您当前使用的浏览器。推荐您使用 Chrome 或 Firefox 浏览器打开本系统');
}
