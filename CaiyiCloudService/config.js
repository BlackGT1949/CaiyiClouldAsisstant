const config = {
    // URL
    url: 'https://6461cb736d49f200018eb97d.caiyicloud.com/reserve/65e8122d2014ec000144a57c',
    // 预约时间和预约抢票的时间有关系
    reservationDateTime: '2024-04-13 14:57:59.500',
    // 无论如何都要停止的时间
    stopTicketTime: '2024-04-13 14:58:15.000',
    // 每次请求的间隔时间毫秒ms
    timeout: 500,
    // 最多只允许有两个观演人
    uList: [
        {
            uname: "张三",
            uid: "500102200000000000"
        }, {
            uid: '500230200000000000',
            uname: '李四'
        }
    ],
    // Email
    emailToken: 'zpc4CixzbEvPzAaNGS6C7MGR9du6DlGk',
    emailUrl: 'http://gezreco.cn:9025/EmailService',
    // 配置是否在控制台打印token
    showToken: true
}
console.log("配置文件：config.js", config)
module.exports = config;