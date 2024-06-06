// 引入axios
const axios = require('axios');
// 引入express
const express = require('express');
// 创建express实例
const app = express();
// 引入基础信息配置
const {
  url,
  reservationDateTime,
  stopTicketTime,
  uList,
  emailToken,
  emailUrl,
  showToken,
  timeout
} = require('./config');

// 配置跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// 使用Express内置的中间件解析JSON请求体
app.use(express.json());
// 使用Express内置的中间件解析URL编码的请求体
app.use(express.urlencoded({
  extended: true
}));

// 配置服务端口号
const port = 11455;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// API接口
const CaiyiAPIs = {
  sendVerifyCode: '/cyy_gatewayapi/user/pub/v3/send_verify_code',
  generatePhotoCode: '/cyy_gatewayapi/user/pub/v3/generate_photo_code',
  loginOrRegister: '/cyy_gatewayapi/user/pub/v3/login_or_register',
  reservationOrders: '/cyy_buyerapi/buyer/cyy/v1/reservation_orders',
  reservationConfigs: '/cyy_buyerapi/buyer/cyy/v1/reservation_configs'
}

// CaiyiToken
let caiyiToken = '';
// 活动配置
let reservationConfig = null;
// 计时器
let timer = null;
// 记录用户上一次登陆的时间戳
let lastLoginTime = null;
// 是否应该停止了
let shouldStop = false;

// 封装Axios BaseURL
const caiyi = axios.create({
  baseURL: parseCaiyiUrl(url).baseurl
});

// 封装POST方法
function post(url, data) {
  return caiyi({
    url,
    params: {
      channelId: '',
      terminalSrc: ''
    },
    headers: {
      'access-token': caiyiToken,
    },
    method: 'POST',
    data
  })
}

// 封装get方法
function get(url, params) {
  return caiyi({
    url,
    params: {
      channelId: '',
      src: 'WEB',
      ...params
    },
    headers: {
      'access-token': caiyiToken,
    },
    method: 'GET'
  })
}

// 彩艺云官方API请求封装
/**
 * 1、彩艺云发送手机验证码
 * @param {string} phone 
 * @param {string} picCode 
 * @returns 
 */
function sendSmsCode(phone, picCode) {
  return post(CaiyiAPIs.sendVerifyCode, {
    "verifyCodeUseType": "USER_LOGIN",
    "messageType": "MOBILE",
    "cellphone": phone,
    "token": picCode,
    "src": "WEB"
  });
}

/**
 * 2、创建图形验证码
 * @param {string} phone 
 * @returns 
 */

function generatePhotoCode(phone) {
  return post(CaiyiAPIs.generatePhotoCode, {
    "verifyCodeUseType": "USER_LOGIN",
    "messageType": "MOBILE",
    "cellphone": phone,
    "src": "WEB"
  })
}

/**
 * 3、登录
 * @param {string} phone 
 * @param {string} smsCode 
 * @returns 
 */
function login(phone, smsCode) {
  return post(CaiyiAPIs.loginOrRegister, {
    "cellphone": phone,
    "verifyCode": smsCode,
    "src": "WEB"
  })
}

/**
 * 4、预约
 * @param uList
 * @returns {Promise<number>|*}
 */
function reservation(uList) {
  if (!reservationConfig) {
    console.log("活动配置信息为空，无法预约");
    return Promise.resolve(1);
  }
  const userList = uList.map(user => {
    return {
      "audienceCellphone": null,
      "audienceIdentityNumber": user.idCard,
      "audienceIdentityType": "ID_CARD",
      "audienceName": user.name,
      "seatInfo": "",
      "showOrderTicketItemId": ""
    }
  });
  const data = {
    "reservationConfigId": reservationConfig.id, // 预约的项目
    "reservationDate": reservationConfig.reservationDate, // 预约的日期
    "startTime": reservationConfig.startTime, // 开始时间
    "endTime": reservationConfig.endTime, // 结束时间
    "showOrderId": "",
    "showSessionId": "",
    "reservationAudienceParams": userList,
    "src": "WEB"
  }
  return post(CaiyiAPIs.reservationOrders, data);
}

/**
 * 5、获取活动配置参数
 * @param {string} reservationConfigId 
 * @returns 
 */
function getReservationConfig(reservationConfigId) {
  const url = `${CaiyiAPIs.reservationConfigs}/${reservationConfigId}/instance`;
  return get(url, {
    terminalSrc: 'WEB',
    id: reservationConfigId
  })
}

// 本地服务API封装
// 1、发送短信接口
app.post('/sendSmsCode', (req, res) => {
  const {
    phone,
    picCode
  } = req.body;
  console.log("1、发送短信接口", phone, picCode);
  sendSmsCode(phone, picCode).then((r) => {
    res.json(r.data);
  })
})

// 2、创建图形验证码
app.post('/generatePicCode', (req, res) => {
  const {
    phone
  } = req.body;
  generatePhotoCode(phone).then((r) => {
    res.json(r.data);
  })
})

// 3、登录
app.post('/login', (req, res) => {
  const {
    phone,
    smsCode
  } = req.body;
  console.log("2、登录接口", phone, smsCode);
  login(phone, smsCode).then((r) => {
    if (r.data.statusCode === 200) {
      caiyiToken = r.data.data.accessToken;
      lastLoginTime = Date.now();
      showToken && console.log('AccessToken: ' + caiyiToken);
      setReservationConfig().then(r => {
        console.log("3、活动配置信息：", r);
      })
    }
    res.json(r.data);
  })
})

// 4、预约
app.post('/ticket', (req, res) => {
  if(shouldStop) {
    res.json({
      statusCode: 200,
      message: '已经停止抢票',
    });
    return;
  }
  // 清除计时器
  console.log("4、直接抢票============");
  reservation(uList).then((r) => {
    if(r.data.statusCode === 200) {
      sendEmail('2765146946@qq.com', JSON.stringify(r.data), '彩艺云预约详情');
      shouldStop = true;
    }
    console.log(r.data);
    res.json(r.data);
  })
});

// 5、定时预约
app.post('/ticket2', (req, res) => {
  // 防止重复开启定时器
  clearInterval(timer);
  timer = setInterval(() => {
    const localTime = new Date(reservationDateTime).getTime();
    // 判断开始时机
    if (new Date().getTime() > localTime) {
      // 清除计时器
      console.log("5、到点开抢============");
      clearInterval(timer);
      timer = null;
      // 预约
      fetchTicket(uList);
    }
  }, 10);
  res.json({
    statusCode: 200,
    comments: "开启预约成功"
  })
});

// 6、返回登录状态
app.get('/getLoginInfo', (req, res) => {
  res.json({
    statusCode: 200,
    result: {
      isLogin: isLogin(),
      loginTime: lastLoginTime
    }
  });
});

// 7、返回活动配置信息
app.get('/getReservationConfig', (req, res) => {
  setReservationConfig().then(r => {
    console.log("活动配置信息：", r);
    res.json(r);
  })
});


// 其它类的方法
/**
 * 1、Gezreco邮件封装
 * @param {string} to 
 * @param {string} msg 
 * @param {string} subject 
 */
function sendEmail(to, msg, subject) {
  axios.post(emailUrl, {
    'to': to,
    'html': msg,
    'subject': subject,
    'token': emailToken
  })
}

/**
 * 2、配置活动信息
 */
function setReservationConfig() {
  const id = parseCaiyiUrl(url).reservationConfigId;
  return getReservationConfig(id).then((r) => {
    if (r.data.statusCode === 200) {
      const reservationDates = r.data.data.reservationDates;
      reservationConfig = {
        id: r.data.data.id,
        reservationDate: reservationDates[0].reservationDate,
        startTime: reservationDates[0].configItems[0].configTimeItems[0].startTime,
        endTime: reservationDates[0].configItems[0].configTimeItems[0].endTime
      };
      return reservationConfig;
    }
  })
}

/**
 * 3、解析地址中的BaseURL和商铺ID
 * @param {string} url 
 */
function parseCaiyiUrl(url) {
  let arr = url.split('/');
  return {
    'baseurl': arr[0] + '//' + arr[2],
    'reservationConfigId': arr[4]
  }
}

/**
 * 5、判断是否需要登录
 * @returns 
 */
function isLogin() {
  return lastLoginTime && (lastLoginTime + 43200000) > Date.now();
}

// 6、预约接口
function fetchTicket(uList) {
  let i = 0;
  let timer = setInterval(() => {
    console.log(`第${++i}次`)
    reservation(uList).then((r) => {
      console.log("5、预约数据：", r.data);
      if (r.data.statusCode === 200 || new Date(stopTicketTime).getTime() < new Date().getTime()) {
        sendEmail('2765146946@qq.com', JSON.stringify(r.data), '彩艺云预约详情');
        clearInterval(timer);
      }
    });
  }, timeout);
}