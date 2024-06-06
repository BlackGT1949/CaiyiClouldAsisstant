// ==UserScript==
// @name         彩艺云自动表单填写助手
// @namespace    http://tampermonkey.net/
// @version      0.1
// @icon         https://gezreco.cn/images/logo.ico
// @description  自动填写caiyicloud上的表单
// @author       gezreco.cn
// @match        https://*.caiyicloud.com/*
// @match        https://*.gezreco.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 预约时间yyyy-MM-dd hh:mm:ss
    var targetDateTime = '2023-12-09 14:00:00';
    // 处理网络延时导致的提前进入的时间偏移量（ms）
    targetDateTime += '.999';
    // 姓名
    var uname = '张三';
    // 身份证号
    var uid = '500230200000000000';
    var targetTime = new Date(targetDateTime).getTime();
    var fixedPanel = document.createElement('div');
    initInterface(fixedPanel);
    var showTimer = setInterval(function (){
        fixedPanel.innerHTML = '等待中 ' + getCurrentTime();
    },100);

    // 等待DOM准备就绪
    window.onload = function () {
        // 判断当前处于什么页面
        var page = urlNow();
        // 如果在首页
        if(page == 0) {
            console.log('首页');
            jumpHomePage();
        } else if(page == 1) {
            console.log('选择预约日期页');
            jumpSelectDate();
        } else {
            console.log('表单页');
            inputPersonInfo();
        }
    };
    // 填写资料并提交
    function inputPersonInfo() {
        // 获取添加参观者的按钮
        var addPerson = document.querySelector('.person-msg .add-person');
        while(!addPerson || addPerson.children[0].innerText != '添加参观者') {
            addPerson = document.querySelector('.person-msg .add-person');
        }
        addPerson.click();
        setTimeout(function(){
            // 获取提交按钮
            var submBtn = document.querySelector('.person-btn div');
            // 获取输入框
            var inputs = document.querySelectorAll('.view_form_container input');
            while(inputs.length != 2) {
                document.querySelectorAll('.view_form_container input');
            }
            inputs[0].value = uname;
            inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
            inputs[1].value = uid;
            inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
            submBtn.click();
        },30);
    }
    // 跳过同意协议按钮
    function jumpConfirm() {
        var res = '<\!---->\n        我已阅读并同意声明内容\n      ';
        setTimeout(()=>{
            var timer = setInterval(function () {
                var confirmBtn = document.querySelector('.confirm-layout .button div');
                // 判断同意协议按钮是否存在
                if(confirmBtn) {
                    // 判断时机是否符合
                    if(res == confirmBtn.innerHTML && new Date().getTime() >= targetTime) {
                        confirmBtn.click();
                        clearInterval(showTimer);
                        fixedPanel.innerHTML = '已点击同意按钮';
                        // 同意协议按钮存在则清除找按钮的定时器
                        clearInterval(timer);
                    }
                }
            }, 10);
        },100);
    }
    // 跳过主页
    function jumpHomePage() {
        var count = 0;
        // 获取门票预约按钮组
        var reserveBtn = document.querySelector('.reserve-button');
        var timer = setInterval(function() {
            if(reserveBtn) {
                var btns = reserveBtn.children;
                // 判断按钮是否存在
                if(btns) {
                    // 获取门票预约按钮
                    btns[0].click();
                    // 在同一页当中查找同意声明的按钮并跳过
                    jumpConfirm();
                }
                clearInterval(timer);
            }
        },10);
    }
    // 跳过预约时间选择
    function jumpSelectDate() {
        var confirmBtn = document.querySelector('.reserve-list .confirm-btn');
        var count = 0;
        var timer = setInterval(function() {
            if(confirmBtn) {
                confirmBtn.click();
                clearInterval(timer);
            } else {
                if(count == 50) {
                    clearInterval(showTimer);
                    fixedPanel.innerHTML = '预约已满';
                    clearInterval(timer);
                    return;
                }
                confirmBtn = document.querySelector('.reserve-list .confirm-btn');
                count++;
            }
        },10);
    }
    // 判断当前在什么url之下
    function urlNow() {
        var url = window.location.href;
        var regDetail = /reserve-detail/g;
        var regPersoninfo = /reserve-detail\/personinfo/g;
        if(url) {
            if(regPersoninfo.test(url)) {
                return 2;
            } else if(regDetail.test(url)) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    // 初始化一个控制面板
    function initInterface(fixedPanel) {
        // 创建一个浮动的面板
        fixedPanel.style.className = 'fixedPanel';
        fixedPanel.style.width = '200px';
        fixedPanel.style.height = '100px';
        fixedPanel.style.borderRadius = '15px';
        fixedPanel.style.border = '1px solid #ccc';
        fixedPanel.style.position = 'fixed';
        fixedPanel.style.fontSize = '20px';
        fixedPanel.style.backgroundColor = '#fff';
        fixedPanel.style.zIndex = '9999';
        fixedPanel.style.top = '55px';
        fixedPanel.style.right = '45px';
        fixedPanel.style.zIndex = '999999';
        fixedPanel.style.lineHeight = '100px';
        fixedPanel.style.textAlign = 'center';
        fixedPanel.addEventListener('mousedown', function (e) {
            var left = e.clientX - fixedPanel.offsetLeft;
            var top = e.clientY - fixedPanel.offsetTop;
            var mousemoveHandle = function (e) {
                fixedPanel.style.left = e.clientX - left + 'px';
                fixedPanel.style.top = e.clientY - top + 'px';
            }
            document.addEventListener('mousemove',mousemoveHandle);
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', mousemoveHandle);
            });
        });
        // 兼容移动端
        document.addEventListener('touchstart', function (e) {
            if(e.target == fixedPanel){
                var touch = e.touches[0];
                var left = touch.clientX - fixedPanel.offsetLeft;
                var top = touch.clientY - fixedPanel.offsetTop;
                var touchmoveHandle = function (e) {
                    e.preventDefault();
                    fixedPanel.style.left = e.touches[0].clientX - left + 'px';
                    fixedPanel.style.top = e.touches[0].clientY - top + 'px';
                };
                document.addEventListener('touchmove', touchmoveHandle, {passive: false});
                document.addEventListener('touchend', function () {
                    document.removeEventListener('touchmove', touchmoveHandle);
                });
            }
        }, {passive: false});
        document.body.appendChild(fixedPanel);
    }
    // 获取实时的时间
    function getCurrentTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        // 格式化时间，确保小时、分钟和秒数始终是两位数
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        // 返回格式化后的时间字符串
        return hours + ':' + minutes + ':' + seconds;
    }
})();
