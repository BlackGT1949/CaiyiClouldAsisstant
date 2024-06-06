const {
    createClient
} = require('redis');
const express = require('express');

// 创建express实例
const app = express();

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
const port = 11457;
app.listen(port, () => {
    console.log(`Redis Client Server is running on port ${port}`);
});

// 创建 Redis 客户端
const client = createClient({
    password: 'SuperUser123',
    socket: {
        host: 'gezreco.cn',
        port: 11452
    }
});

client.on('error', err => console.log('Redis Client 出现错误', err));

// 连接到 Redis 服务器
client.on('connect', () => {
    console.log('Redis 连接成功');
});

// 连接到 Redis 服务器
client.connect();

// 
app.post('/save', async (req, res) => {
    const { token } = req.body;
    if (token) {
        const r = await saveToken(token)
        res.json({
            statusCode: 200,
            msg: r
        })
    } else {
        res.json({
            statusCode: 400,
            msg: '参数错误'
        })
    }
})

app.get('/get', async (req, res) => {
    const token = await getToken();
    res.json({
        statusCode: 200,
        msg: token
    })
})


async function saveToken(token, expires = 7200) {
    return await client.setEx('token', expires, token);;
}

async function getToken() {
    return await client.get('token');
}