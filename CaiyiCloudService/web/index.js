const doms = {
  tel: document.querySelector('#phone'),
  smsCode: document.querySelector('#sms-code'),
  smsBtn: document.querySelector('.sms-code-btn'),
  loginBtn: document.querySelector('#loginBtn'),
  ticketBtn: document.querySelector('#ticket'),
  ticketBtn2: document.querySelector('#ticket2'),
  contentWrappers: document.querySelectorAll('.content-wrapper'),
  smsParent: document.querySelector('#sms-code').parentElement,
  textarea: document.querySelector('textarea')
}

const url = "http://localhost:11455/";

let domStatus = {
  smsBtn: false,
  loginBtn: false,
  loginStatus: false
}

// 消息输出方法
function showMsg(msg) {
  var value = doms.textarea.value;
  value += msg + "\r\n\r\n";
  doms.textarea.value = value;
}

// 判断输入值
function checkTel() {
  // 将输入的非数字的字符替换为空
  doms.tel.value = doms.tel.value.replace(/\D/g, '');
  if (doms.tel.value.length === 11) {
    doms.smsBtn.classList.remove('btn-disabled');
    doms.smsBtn.removeAttribute('disabled');
    domStatus.smsBtn = true;
  } else {
    doms.smsBtn.classList.add('btn-disabled');
    doms.smsBtn.setAttribute('disabled', 'disabled');
    domStatus.smsBtn = false;
  }
}

// 判断是否需要解禁按钮
function checkTelStatus() {
  const tel = doms.tel.value;
  const smsCode = doms.smsCode.value;
  if (tel.length === 11 && smsCode.length === 4) {
    doms.loginBtn.classList.remove('btn-disabled');
    doms.loginBtn.removeAttribute('disabled');
    domStatus.loginBtn = true;
    return;
  }
  if (tel.length !== 11 || smsCode.length !== 4) {
    doms.loginBtn.classList.add('btn-disabled');
    doms.loginBtn.setAttribute('disabled', 'disabled');
    domStatus.loginBtn = false;
    return;
  }
}

// 设置smsBtn倒计时
function setSmsBtnTime() {
  let time = 60;
  doms.smsBtn.innerText = `${time}s`;
  doms.smsBtn.classList.add('btn-disabled');
  doms.smsBtn.setAttribute('disabled', 'disabled');
  let timer = setInterval(() => {
    time--;
    doms.smsBtn.innerText = `${time}s`;
    if (time === 0) {
      clearInterval(timer);
      doms.smsBtn.innerText = '获取验证码';
      doms.smsBtn.classList.remove('btn-disabled');
      doms.smsBtn.removeAttribute('disabled');
    }
  }, 1000)
}


// 创建图形验证码区域
function createPicCodeNode(src) {
  if (doms.picCodeNode) {
    doms.picCodeNode.querySelector('img').src = src;
    return;
  }
  let picCodeNode = document.createElement('div');
  picCodeNode.className = 'login-input clf';
  let input = document.createElement('input');
  input.className = 'code';
  input.type = 'text';
  input.maxLength = 4;
  input.placeholder = '请输入图形验证码';
  input.id = 'pic-code';
  let img = document.createElement('img');
  img.className = 'fr';
  img.src = src;
  img.alt = '图形验证码';
  img.title = '点击刷新图形码';
  img.addEventListener('click', function () {
    getPicCode();
  });
  input.addEventListener('input', function () {
    domStatus.picCode = input.value.length === 4;
  })
  picCodeNode.appendChild(input);
  picCodeNode.appendChild(img);
  doms.contentWrappers[0].insertBefore(picCodeNode, doms.smsParent);
  doms.picCodeNode = picCodeNode;
  doms.picCode = input;
  domStatus.picCode = false;
}

// 添加事件
doms.tel.addEventListener('input', checkTel);
doms.tel.addEventListener('input', checkTelStatus);
doms.smsCode.addEventListener('input', checkTelStatus);

// 为获取验证码按钮设置点击事件
doms.smsBtn.addEventListener('click', function () {
  if (!domStatus.smsBtn) {
    showMsg('请检查输入的手机号');
    return;
  }
  if (doms.picCode && !domStatus.picCode) {
    showMsg('请检查图形验证码');
    return;
  }
  // 发送请求
  fetch(url + 'sendSmsCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'phone': doms.tel.value,
      'picCode': doms.picCode ? doms.picCode.value : ""
    })
  }).then(res => res.json()).then(data => {
    if (data.statusCode !== 200) {
      if (doms.picCode) {
        doms.picCode.value = '';
      }
      getPicCode();
    } else {
      setSmsBtnTime();
    }
  }).catch(err => {
    console.log(err);
    showMsg(err);
    showMsg('网络异常，请稍后再试');
  });

});

// 获取图形验证码
function getPicCode() {
  // 发送请求
  fetch(url + 'generatePicCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'phone': doms.tel.value
    })
  }).then(res => res.json()).then(data => {
    if (data.statusCode === 200) {
      createPicCodeNode(data.data.baseCode);
    }
  }).catch(err => {
    console.log(err);
    showMsg(err);
    showMsg('网络异常，请稍后再试');
  });
}


// 直接抢票
function getTicket(queryString) {
  fetch(url + queryString, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  }).then(r => r.json()).then(data => {
    showMsg(JSON.stringify(data));
  })
}

// 查询用户登录状态
function getLoginInfo() {
  fetch(url + 'getLoginInfo').then(r => r.json()).then(data => {
    if (data.result.isLogin) {
      doms.loginBtn.classList.remove('btn-disabled');
      doms.loginBtn.removeAttribute('disabled');
      domStatus.loginBtn = true;
      domStatus.loginStatus = true;
    }
    return data.result.isLogin;
  })
}

// 手动取号
doms.ticketBtn.addEventListener('click', function () {
  getTicket('ticket');
});

// 开通定时抢号
doms.ticketBtn2.addEventListener('click', function () {
  getTicket('ticket2');
  this.classList.add('btn-disabled');
  this.setAttribute('disabled', 'disabled');
});


// 为登录按钮设置点击事件
doms.loginBtn.addEventListener('click', function () {
  if (!domStatus.loginBtn && !domStatus.smsBtn) {
    showMsg('请检查输入是否正确');
    return;
  }
  if (domStatus.loginStatus) {
    console.log("不用验证直接登录")
    doms.contentWrappers[0].style.display = "none";
    doms.contentWrappers[1].style.display = "block";
    showMsg('用户已登录');
    return;
  }
  const tel = doms.tel.value;
  const smsCode = doms.smsCode.value;
  // 发送请求
  fetch(url + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'phone': tel,
      'smsCode': smsCode
    })
  }).then(res => res.json()).then(data => {
    if (data.statusCode === 200) {
      alert("登录成功");
      doms.contentWrappers[0].style.display = "none";
      doms.contentWrappers[1].style.display = "block";
      showMsg('登录成功==========');
      showMsg(data.data.accessToken);
      localStorage.setItem('loginDate', Date.now());
    }
  }).catch(err => {
    console.log(err);
    showMsg(err);
    showMsg('网络异常，请稍后再试');
  });
});



// 初始化
(function () {
  checkTel();
  checkTelStatus();
  getLoginInfo();
})();