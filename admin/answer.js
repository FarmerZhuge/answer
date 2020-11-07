const ws = require('nodejs-websocket');

const express = require('express');

const path = require('path');

let admin = {};

let users = {}

let first = '';

const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.listen(1105, () => {
    console.log('App listening at port 1105')
  })

const server = ws.createServer(connect => {
    //链接上来的时候
    connect.on('text',(str)=>{
        let data = JSON.parse(str);
        if (data.type === 'login') { // 如果是登录
            login(connect, data);
        } else if (data.type === 'answer') { // 用户抢答
            answer(connect, data);
        } else if (data.type === 'start') { // 开始抢答
            start(); 
        }
    });

    //关闭链接的时候
    connect.on('close',()=>{
        console.log("关闭连接")
    });

    //错误处理
    connect.on('error',(err)=>{
        console.log(err);
    })
}).listen(1104,()=>{
    console.log("running")
});

/**
 * 登录
 * @param { WebSocket.connect } connect
 * @param { object } data
 */
function login(connect, data) {
    if (data.role === 'admin') {
        admin = connect;
    } else if (data.role === 'user') {
        // 只要重新登录就替换链接
        users[data.name] = connect;
        // console.log(users[data.name])
        users[data.name].sendText(JSON.stringify({text: 'Hello'}))
    }
}

/**
 * 抢答
 * @param { WebSocket.connect } connect
 * @param { object } data
 */
function answer(connect, data) {
    if (!first) {
        first = data.name;
        let msg = { code: 'success', type: 'answer'};
        connect.sendText(JSON.stringify(msg));
    } else { // 如果已经有人抢答
        let msg = { code: 'error', name: first, type: 'answer'}
        connect.sendText(JSON.stringify(msg));
    }
    let owner = {
        name: data.name,
        type: 'answer'
    }
    admin.sendText(JSON.stringify(owner)) // 向管理员发送第一个抢答者的姓名
}

function start() {
    let obj = {
        type: 'start'
    }
    first = '';
    Object.values(users).map(connect => {
        connect.sendText(JSON.stringify(obj));
    })
}

