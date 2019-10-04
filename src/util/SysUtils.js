/**
 * 判断是否是移动客户端，否则则是PC端
 */
export function isMobile() {
    // let sUserAgent = navigator.userAgent.toLowerCase(),
    //     bIsIpad = sUserAgent.match(/ipad/i) == 'ipad',
    //     bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os',
    //     bIsMidp = sUserAgent.match(/midp/i) == 'midp',
    //     bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4',
    //     bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb',
    //     bIsAndroid = sUserAgent.match(/android/i) == 'android',
    //     bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce',
    //     bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile',
    //     bIsWebview = sUserAgent.match(/webview/i) == 'webview';
    // return bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM;
    return /(iPhone|iPod|iOS|Android|Windows Phone)/i.test(navigator.userAgent);
}

/**
 * 判断是否是微信客户端
 */
export function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否是苹果的iOS系统
 */
export function isIOS() {
    let userAgent = navigator.userAgent,
        isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isIOS;
}

/**
 * 判断是否是安卓系统
 */
export function isAndroid() {
    let userAgent = navigator.userAgent,
        isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1;
    return isAndroid;
}

/**
 * 判断浏览器的CSS是否支持某个特性
 *
 * @param {*} attr 特性的名称
 * @param {*} value 特性的值
 */
export function isSupportCssAttr(attr, value) {
    // var element = document.createElement('div');
    // if (attr in element.style) {
    //     element.style[attr] = value;
    //     return element.style[attr] === value;
    // } else {
    //     return false;
    // }
    return CSS.supports(attr, value) || CSS.supports(attr, '-webkit-' + value);
}

/**
 * 判断浏览器的CSS是否支持sticky特性
 *
 * @param {'*'} stickyDom 要启用sticky效果的dom
 */
export function isSupportSticky(stickyDom) {
    const result = isSupportCssAttr('position', 'sticky');
    if (result) {
        const rect = stickyDom.getBoundingClientRect();
        return rect.y !== undefined;
    } else return false;
}

// let elem = window.document.documentElement;
// let w = elem.clientWidth;
// let h2 = (w / 16) * 9; //使用sticky定位的顶端是一个16比9的div

// export function isSupportSticky() {
//     //判断是否支持sticky
//     var prefixTestList = ['', '-webkit-'];
//     var stickyText = '';
//     for (var i = 0; i < prefixTestList.length; i++) {
//         stickyText += 'position:' + prefixTestList[i] + 'sticky;';
//     }
//     // 创建一个dom来检查
//     var div = document.createElement('div');
//     div.style.cssText = stickyText;
//     document.body.appendChild(div);
//     var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
//     document.body.removeChild(div);
//     div = null;
//     return isSupport;
// }
// export function fixBottomBar() {
//     var topbarTop = h2;
//     window.onscroll = function(e) {
//         let winTop = document.body.scrollTop;
//         if (winTop > topbarTop) {
//             _this.navClass['nav-fixed'] = true; //vue动态添加class写法
//             //            topbar.setAttribute('class','nav nav-fixed');  //原生js写法
//         } else {
//             _this.navClass['nav-fixed'] = false;
//             //            topbar.setAttribute('class','nav');
//         }
//     };
// }
// !isSupportSticky() && fixBottomBar();



export function formatNumber(n) {  
    n = n.toString()  
    return n[1] ? n : '0' + n  
  }  

export function formatTime(number,format) {  
  
    var formateArr  = ['Y','M','D','h','m','s'];  
    var returnArr   = [];  
    
    var date = new Date(number);  
    returnArr.push(date.getFullYear());  
    returnArr.push(formatNumber(date.getMonth() + 1));  
    returnArr.push(formatNumber(date.getDate()));  
    
    returnArr.push(formatNumber(date.getHours()));  
    returnArr.push(formatNumber(date.getMinutes()));  
    returnArr.push(formatNumber(date.getSeconds()));  
    
    for (var i in returnArr)  
    {  
      format = format.replace(formateArr[i], returnArr[i]);  
    }  
    return format;  
  } 