// ==UserScript==
// @name         AB站网页背景更改
// @icon         http://github.smiku.site/sakura.png
// github地址
// @namespace    https://github.com/wuxintlh/
// 博客站点
// @namespace    https://wuxintlh.github.io
// b站空间
// @namespace    https://space.bilibili.com/29058270
// acfun空间
// @namespace    https://www.acfun.cn/u/57391284
// @version      1.0.0.0
// @description  更改ab站背景的懒人脚本
// @author       桜ミク
// @match        https://www.bilibili.com/*
// @match        *://*.bilibili.com/*
// @match        https://message.bilibili.com/*
// @match        https://t.bilibili.com/*
// @match        https://manga.bilibili.com/*
// @match        https://live.bilibili.com/blackboard/*
// @match        https://www.bilibili.com/page-proxy/*
// @match        https://www.acfun.cn/*
// @match        *://*.acfun.cn/*
// @exclude      https://live.bilibili.com/p/html/live-lottery/*
// @exclude      *//message.bilibili.com/pages/nav/index_new_pc_sync*
// @exclude      *//t.bilibili.com/pages/nav/index_new*
// @exclude      *//member.bilibili.com/x2/creative/*
// @exclude      *//member.bilibili.com/video/*
// @QQgroup      793513923
// @QQgroup      https://jq.qq.com/?_wv=1027&k=0ewDiWw1
// @grant        none
// @require https://greasyfork.org/scripts/436151-ab%E7%AB%99%E8%83%8C%E6%99%AF%E6%9B%B4%E6%94%B9css%E8%84%9A%E6%9C%AC/code/ab%E7%AB%99%E8%83%8C%E6%99%AF%E6%9B%B4%E6%94%B9css%E8%84%9A%E6%9C%AC.js?version=992415
// ==/UserScript==

//#region 全局变量
/*
    screenHeight 代表屏幕高度
    bcurl 代表背景地址
    host 代表域名
    domain 代表域名
    abChosen 代表a或b站
    body 代表body元素
    main 代表id为main的元素
    i,j未循环元素
 */
var screenHeight, bcurl, host, domain, abChosen, body, main, i, j;
var bcb = ['https://i0.hdslb.com/bfs/article/d12fee446e2533206e0b04024c39e00a40c4bc4c.png@1320w_912h.webp', 'https://i0.hdslb.com/bfs/article/54616fdbb9bed40ea2cf8540f8517b11c9aa4ad3.jpg@1320w_868h.webp', 'https://i0.hdslb.com/bfs/article/67a82d9f881dd41dd6709322595340bf9e6cf46a.jpg@1320w_788h.webp', 'https://i0.hdslb.com/bfs/album/658ab52e2d631f9d974112e2d5b4cab476e3f61d.jpg', 'https://i0.hdslb.com/bfs/vc/c255f51c594cf6e724fb9f04975fae7e7eb8b876.jpg@2000w_1e.webp', 'https://iknow-pic.cdn.bcebos.com/42a98226cffc1e17c52713054290f603738de96e?x-bce-process=image/resize,m_lfit,w_600,h_800,limit_1'];
var bca = ['https://w.wallhaven.cc/full/g8/wallhaven-g8kd37.jpg', 'https://img.tt98.com/d/file/96kaifa/201905101622281/001.jpg', 'https://img.tt98.com/d/file/tt98/2019092618001803/001.jpg', 'https://w.wallhaven.cc/full/zm/wallhaven-zmemxg.png', 'https://w.wallhaven.cc/full/rd/wallhaven-rdyyjm.png', 'https://iknow-pic.cdn.bcebos.com/42a98226cffc1e17c52713054290f603738de96e?x-bce-process=image/resize,m_lfit,w_600,h_800,limit_1'];

//#endregion

//#region 主体js脚本

window.addEventListener('load', (function() {
    //首先判断a或b站点
    screenHeight = document.documentElement.clientHeight;
    domain = document.domain;
    host = window.location.host;
    body = document.querySelector('body');
    if (domain == 'bilibili.com' || domain == 'www.bilibili.com' || domain == 'live.bilibili.com' || domain == 't.bilibili.com' || domain == 'h.bilibili.com') {
        abChosen = 0;
    } else {
        abChosen = 1;
    }
    if (abChosen == 0) {
        host = window.location.host;
        if (host == 'live.bilibili.com') {
            setDefaultBackground();
            body = document.querySelector('.live-room-app').querySelector('.z-app-content');
            boxSetting(body);
        } else {
            setDefaultBackground();
            body = document.querySelector('body');
            boxSetting(body);
        }
    } else if (abChosen == 1) {
        host = window.location.host;
        var aUrl = document.location;
        if (aUrl.pathname == '\/') {
            setDefaultBackground();
            body = document.querySelector('body');
            boxSetting(body);
        } else {
            setDefaultBackground();
            main = document.querySelector('#main');
            boxSetting(main);
        }
    }
}))

//#endregion

//#region 其他脚本

//创建左下角box窗体
function boxSetting(parentNode) {
    var spanRoller = document.createElement('span');
    parentNode.appendChild(spanRoller);
    spanRoller.className = 'sakuraSpanRoller';
    spanRoller.innerText = '背景更改';
    var divBackgroundSettingsBox = document.createElement('div');
    parentNode.appendChild(divBackgroundSettingsBox);
    divBackgroundSettingsBox.className = 'divBackgroundSettingsBox';
    var firstBox = document.createElement('div');
    var changeBoxOne = document.createElement('div');
    var changeBoxTwo = document.createElement('div');
    divBackgroundSettingsBox.appendChild(firstBox);
    firstBox.className = 'firstBox';
    firstBox.appendChild(changeBoxOne);
    firstBox.appendChild(changeBoxTwo);
    changeBoxOne.className = 'changeBoxOne';
    changeBoxTwo.className = 'changeBoxTwo';
    var span = document.createElement('span');
    var backgroundDefaultClickToChange = document.createElement('ul');
    changeBoxOne.appendChild(span);
    changeBoxOne.appendChild(backgroundDefaultClickToChange);
    backgroundDefaultClickToChange.className = 'backgroundDefaultClickToChange';
    span.innerText = '默认背景';
    for (i = 0; i < 6; i++) {
        var Ulli = document.createElement('li');
        backgroundDefaultClickToChange.appendChild(Ulli);
        var img = document.createElement('img');
        Ulli.appendChild(img);
        img.src = abChosen == 0 ? bcb[i] : bca[i];
    }

    //添加默认图片点击更换背景事件
    backgroundDefaultClickToChange = document.querySelector('.backgroundDefaultClickToChange');
    var imgAll = backgroundDefaultClickToChange.querySelectorAll('img');
    for (var id = 0; id < imgAll.length; id++) {
        imgAll[id].addEventListener('click', function() {
            var bcChangeUrl = this.src;
            backgroundSet(bcChangeUrl);
            console.log(bcChangeUrl);
            window.localStorage.setItem('bcurl', bcurl);
        })
    }


    var backgroundInputUrl = document.createElement('input');
    var backgroundClickToChange = document.createElement('button');
    changeBoxTwo.appendChild(backgroundInputUrl);
    changeBoxTwo.appendChild(backgroundClickToChange);
    backgroundInputUrl.placeholder = '请输入背景地址';
    backgroundInputUrl.className = 'backgroundInputUrl';
    backgroundInputUrl.type = 'text';
    backgroundClickToChange.className = 'backgroundClickToChange';
    backgroundClickToChange.innerText = '点击更改背景';

    //添加box是否显示的点击事件
    setTimeout(function() {
        spanRoller = document.querySelector('.sakuraSpanRoller');
        divBackgroundSettingsBox = document.querySelector('.divBackgroundSettingsBox');
        spanRoller.addEventListener('click', function() {
            if (divBackgroundSettingsBox.style.display == 'none') {
                divBackgroundSettingsBox.style.display = 'block';
            } else {
                divBackgroundSettingsBox.style.display = 'none';
            }
        })
    }, 3000);
    //添加url背景更改的点击事件
    backgroundClickToChange = document.querySelector('.backgroundClickToChange');
    backgroundClickToChange.addEventListener('click', function() {
        var backgroundInputUrl = document.querySelector('.backgroundInputUrl');
        bcurl = backgroundInputUrl.value;
        if (bcurl == '') {
            alert('你没有输入任何内容!');
        } else {
            //在本地储存bcurl
            window.localStorage.setItem('bcurl', bcurl);
            backgroundSet(bcurl);
        }
    });
}

//滑动动画
function animateLeft(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        } else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 10)
};

function animateBottom(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetTop) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetTop == target) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        } else {
            obj.style.top = obj.offsetTop + step + 'px';
        }
    }, 10)
};

//背景设置
function backgroundSet(bcurl) {
    if (abChosen == 0) {
        var div = document.querySelector('.SakuraBackground');
        div.style.background = 'url("' + bcurl + '")';
        div.style.backfroundRepeat = 'no-repeat';
        div.style.position = 'fixed';
        div.style.backgroundPosition = 'center 0';
        div.style.backgroundSize = 'cover';
        div.style.zoom = '1';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.top = '0';
        div.style.left = '0';
        div.style.webkitBackgroundSize = 'cover';
        div.style.zIndex = '-1';
        div.className = 'SakuraBackground';
    } else if (abChosen == 1) {
        var aUrl = document.location;
        if (aUrl.pathname == '\/') {
            div = document.querySelector('.SakuraBackground');
            div.style.background = 'url("' + bcurl + '")';
            div.style.backfroundRepeat = 'no-repeat';
            div.style.position = 'fixed';
            div.style.backgroundPosition = 'center 0';
            div.style.backgroundSize = 'cover';
            div.style.zoom = '1';
            div.style.width = '100%';
            div.style.height = '100%';
            div.style.top = '0';
            div.style.left = '0';
            div.style.webkitBackgroundSize = 'cover';
            div.style.zIndex = '-1';
            div.className = 'SakuraBackground';
        } else {
            var main = document.querySelector('#main');
            main.style.background = 'url("' + bcurl + '")';
            main.style.backgroundRepeat = 'no-repeat';
            main.style.backgroundPosition = 'center 0';
            main.style.backgroundSize = 'cover';
            main.style.zoom = '1';
            main.style.width = '100vw';
            main.style.height = '100vh';
            main.style.top = '0';
            main.style.left = '0';
            main.style.webkitBackgroundSize = 'cover';
            main.style.zIndex = '-1';
        }
    }
}
//第一次打开时的默认背景设置
function setDefaultBackground() {
    var body = document.querySelector('body');
    var bcgSakura = document.createElement('div');
    var main = document.getElementById('main');
    if (abChosen == 0) {
        body.appendChild(bcgSakura);
    } else {
        var aUrl = document.location;
        if (aUrl == '\/') {
            body.appendChild(bcgSakura);
        }
    }
    bcgSakura.className = 'SakuraBackground';
    var ifbcurl = window.localStorage.getItem('bcurl');
    if (ifbcurl != '' && ifbcurl != null) {
        bcurl = window.localStorage.getItem('bcurl'); //保存的背景
        backgroundSet(bcurl);
    } else {
        bcurl = abChosen == 0 ? 'https://i0.hdslb.com/bfs/album/eb65ae5ee6f66b6381090f5bee4fe6cbabfd6d0d.png' : 'https://img.tt98.com/d/file/96kaifa/201905101622281/001.jpg'; //默认背景
        backgroundSet(bcurl);
    }
};
//#endregion
