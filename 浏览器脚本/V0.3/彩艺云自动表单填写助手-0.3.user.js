// ==UserScript==
// @name         彩艺云自动表单填写助手
// @namespace    http://tampermonkey.net/
// @version      0.3
// @icon         https://gezreco.cn/images/logo.ico
// @description  自动填写caiyicloud上的表单
// @author       gezreco.cn
// @match        https://*.caiyicloud.com/*
// @match        https://*.gezreco.cn/*
// @grant        none
// ==/UserScript==

// 用户参数
let data = {
    uname: "张三",
    uid: "500102200000000000",
    reserveTime: "2024-03-05 14:00:00",
    userTimeOffset:".200",
    ntpServiceUrl: "https://gezreco.cn",
    ntpTimeOffset: 0,
    getTargetTime: function() {
        return new Date(this.reserveTime + this.userTimeOffset).getTime();
    },
    getTimeNow: function () {
        return new Date(Date.now() + this.ntpTimeOffset);
    }
};



(function(data) {
    // 初始化面板
    let panelObj = initInterface();

    // 等待DOM准备就绪
    window.onload = function () {
        let page = urlNow();
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

    // 跳过主页
    function jumpHomePage() {
        let count = 0;
        let timer = setInterval(function() {
            let reserveBtn = document.querySelector('.reserve-button');
            if(reserveBtn) {
                let btns = reserveBtn.children;
                // 判断用户是否登录
                if(btns.length == 2) {
                    btns[0].click();
                    clearInterval(timer);
                    jumpConfirm();
                }
            }
        },10);
    };

    // 跳过同意协议按钮
    function jumpConfirm() {
        let res = '<\!---->\n        我已阅读并同意声明内容\n      ';
        let timer = setInterval(function () {
            let confirmBtn = document.querySelector('.confirm-layout .button div');
            if(confirmBtn) {
                if(res == confirmBtn.innerHTML && data.getTimeNow() >= data.getTargetTime()) {
                    confirmBtn.click();
                    panelObj.setMsg('已点击同意按钮');
                    clearInterval(timer);
                }
            }
        }, 10);
    };

    // 跳过预约时间选择
    function jumpSelectDate() {
        let count = 0;
        let reg = /确定/g;
        let timer = setInterval(function() {
            let confirmBtn = document.querySelector('.reserve-list .confirm-btn');
            if(confirmBtn) {
                clearInterval(timer);
                if(reg.test(confirmBtn.innerHTML)) {
                    confirmBtn.click();
                } else {
                    window.location.reload();
                }
            } else {
                if(count == 50) {
                    panelObj.setMsg('预约已满');
                    clearInterval(timer);
                    return;
                }
                count++;
            }
        },10);
    };

    // 填写资料并提交
    function inputPersonInfo() {
        let timer = setInterval(function(){
            // 获取添加参观者的按钮
            let addPerson = document.querySelector('.person-msg .add-person');
            if(addPerson || addPerson.children[0].innerText == '添加参观者') {
                clearInterval(timer);
                addPerson.click();
                setTimeout(function(){
                    // 获取提交按钮
                    let submBtn = document.querySelector('.person-btn div');
                    // 获取输入框
                    let inputs = document.querySelectorAll('.view_form_container input');
                    while(inputs.length != 2) {
                        document.querySelectorAll('.view_form_container input');
                    }
                    inputs[0].value = data.uname;
                    inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
                    inputs[1].value = data.uid;
                    inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
                    submBtn.click();
                },30);
            } else {
                window.location.reload();
            }
        }, 10);
    };

    // 初始化一个控制面板
    function initInterface() {
        // 创建一个浮动的面板
        let fixedPanel = createFixedPanel();
        // 绑定鼠标拖动事件
        bindMouseDragEvent(fixedPanel);
        // 兼容移动端
        bindTouchDragEvent(fixedPanel);
        // 添加到页面中
        document.body.appendChild(fixedPanel);
        // 创建定时器
        let showTimer = setInterval(function (){
            fixedPanel.children[0].innerHTML = '等待中 ' + getCurrentTime(data.getTimeNow());
        },100);
        // 返回panel的操作接口对象
        return new Panel(fixedPanel, showTimer);
    };

    // 给元素绑定鼠标拖动事件
    function bindMouseDragEvent(elem) {
        if(elem){
            elem.addEventListener('mousedown', function (e) {
                let left = e.clientX - elem.offsetLeft;
                let top = e.clientY - elem.offsetTop;
                const mousemoveHandle = function (e) {
                    elem.style.left = e.clientX - left + 'px';
                    elem.style.top = e.clientY - top + 'px';
                }
                document.addEventListener('mousemove',mousemoveHandle);
                document.addEventListener('mouseup', function () {
                    document.removeEventListener('mousemove', mousemoveHandle);
                });
            });
        }
    };

    // 给元素绑定触屏拖动事件
    function bindTouchDragEvent(elem) {
        if(elem){
            document.addEventListener('touchstart', function (e) {
                if(e.target == elem){
                    let touch = e.touches[0];
                    let left = touch.clientX - elem.offsetLeft;
                    let top = touch.clientY - elem.offsetTop;
                    const touchmoveHandle = function (e) {
                        e.preventDefault();
                        elem.style.left = e.touches[0].clientX - left + 'px';
                        elem.style.top = e.touches[0].clientY - top + 'px';
                    };
                    document.addEventListener('touchmove', touchmoveHandle, {passive: false});
                    document.addEventListener('touchend', function () {
                        document.removeEventListener('touchmove', touchmoveHandle);
                    });
                }
            }, {passive: false});
        }
    };

    // 创建浮动面板
    function createFixedPanel(elemType) {
        let panel = document.createElement('div');
        panel.style.className = 'fixedPanel';
        panel.style.width = '200px';
        panel.style.minHeight = '102px';
        panel.style.borderRadius = '15px';
        panel.style.border = '1px solid #ccc';
        panel.style.position = 'fixed';
        panel.style.fontSize = '20px';
        panel.style.backgroundColor = '#fff';
        panel.style.zIndex = '9999';
        panel.style.top = '55px';
        panel.style.right = '45px';
        panel.style.padding = '20px';
        panel.style.textAlign = 'center';
        panel.style.boxSizing = 'border-box';
        var realTime = document.createElement('span');
        realTime.style.lineHeight = '60px';
        realTime.style.display = 'block';
        realTime.style.cursor = 'pointer';
        realTime.setAttribute('title', "点击同步时间");
        panel.appendChild(realTime);
        realTime.addEventListener('click', function() {
            var msgBox = panel.children[1];
            if(!msgBox) {
                msgBox = document.createElement('span');
                msgBox.style.lineHeight = '20px';
                msgBox.style.display = 'block';
                msgBox.style.fontSize = '12px';
                panel.appendChild(msgBox);
            }
            msgBox.innerHTML = "正在同步时间";
            getTimeOffset(msgBox);
        });
        return panel;
    };

    // Panel操作接口类
    function Panel(panel, timer){
        this.setMsg = function(msg) {
            if(msg){
                clearInterval(timer);
                panel.children[0].innerHTML = msg;
            }
        }
    };

    // 获取实时的时间
    function getCurrentTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        return hours + ':' + minutes + ':' + seconds;
    };

    // 判断当前在什么url之下
    function urlNow() {
        let url = window.location.href;
        let regDetail = /reserve-detail/g;
        let regPersoninfo = /reserve-detail\/personinfo/g;
        if(url) {
            if(regPersoninfo.test(url)) {
                return 2;
            } else if(regDetail.test(url)) {
                return 1;
            } else {
                return 0;
            }
        }
    };

    // 计算时间偏移量
    async function getTimeOffset(msgBox) {
        // 设置请求次数
        const numRequests = 3;
        // 统计总的偏移量
        let totalOffset = 0;
        let url = data.ntpServiceUrl + '/get-time'
        try {
            for (let i = 0; i < numRequests; i++) {
                const startTime = Date.now();
                const response = await fetch(url, { timeout: 5000 });
                const endTime = Date.now();
                // 获取同步时间数据
                const data = await response.json();
                const serverTime = new Date(data.time).getTime();
                 // 获取半程时间
                const offset = (endTime - startTime) / 2;
                 // 计算总偏移量
                totalOffset += serverTime + offset - endTime;
            }
            // 计算平均偏移量
            data.ntpTimeOffset = totalOffset / numRequests;
            console.log('Offset：' + data.ntpTimeOffset.toFixed() + 'ms');
            msgBox.innerHTML = 'Offset Now：' + data.ntpTimeOffset.toFixed() + 'ms';
        } catch (error) {
            console.log('当前Offset值为：' + data.ntpTimeOffset.toFixed() + 'ms 同步失败');
            msgBox.innerHTML = '同步失败！Offset Now：' + data.ntpTimeOffset.toFixed() + 'ms';
        }
    }

})(data);
