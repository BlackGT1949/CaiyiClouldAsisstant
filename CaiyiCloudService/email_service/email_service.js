const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const appToken = generateRandomToken(32);
// 跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// 使用Express内置的中间件解析JSON请求体
app.use(express.json());
// 使用Express内置的中间件解析URL编码的请求体
app.use(express.urlencoded({ extended: true }));
// 开放端口号9025
const PORT = 9025;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// 创建邮件传输器
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, // true for 465, false for other ports; 此处使用非安全的端口 25，因此设置为 false
    auth: {
        user: 'EmailAccount@qq.com',    // 发送邮件的邮箱地址
        pass: 'mycbxipevxekddgg'      // 发送邮件的邮箱密码或应用程序密码
    }
});

/**
 * 生成邮件模板
 * @param { string } to // 接收方邮箱 example123@test.com
 * @param { string } msg // 接收的消息，可以是html格式的
 */
function EmailTemplate(to, subject, msg) {
    this.from = 'EmailAccount@qq.com';
    this.to = to;
    this.subject = subject;
    this.html = msg;
}

/**
 * 发送邮件
 * @param { EmailTemplate } // 使用new EmailTemplate 创建出的对象
 */
function sendEmail(emailTemplate) {
    transporter.sendMail(emailTemplate, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// 随机生成32位的字符串
function generateRandomToken(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log("appToken:", result);
    return result;
}


// 生成格式化时间
function getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// 发送邮件
app.post('/sendEmail', (req, res) => {
    const { to, subject, html , token} = req.body;
    console.log(getTimestamp(), to, subject);
    if (token !== appToken) {
        res.json({
            timestamp: getTimestamp(),
            code: 403,
            msg: '非法请求'
        });
        return;
    }
    if (to) {
        sendEmail(new EmailTemplate(to, subject || '未指定主题', html || '未指定内容'))
        res.json({
            timestamp: getTimestamp(),
            code: 200,
            msg: '邮件发送成功'
        });
    } else {
        res.json({
            timestamp: getTimestamp(),
            code: 400,
            msg: '参数错误'
        });
    }
});
