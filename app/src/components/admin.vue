<template>
  <div>
     <div :class="['button']" @click="start">开始</div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  data() {
    return {
      websock: ''
    }
  },

  mounted() {
    this.initWebSocket();
  },
  methods: {
    /**
     * 开始抢答
     */
    start() {
      let msg = {
        role: 'admin',
        type: 'start'
      }
      
      this.websocketsend(JSON.stringify(msg));
    },
    initWebSocket(){ //初始化weosocket
        const wsuri = "ws://81.68.229.111:1104";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        let actions = {
          role:"admin", // 定义角色
          type: "login", // 定义消息类型, 是登录还是其他
          name: 'admin'
        };
        this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        const msg = JSON.parse(e.data);
        if (msg.type === 'answer') { // 有人抢答
          this.answer(msg);
        }
        
        console.log(msg);
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },

      /**
       * 处理抢答
       */
      answer(msg) {
        Dialog.alert({
          title: '抢答',
          message: `${msg.name}抢答成功`,
        })
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
    margin: 100px auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    color: #fff;
    background: lightseagreen;
    line-height: 100px;
    font-size: 24px;
    -webkit-user-select: none;
  }
</style>