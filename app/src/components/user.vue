<template>
  <div>
    <div v-if="!userName" class="login">
      <input type="text" class="input" v-model='user' laceholder="请输入姓名"> 
      <button class="submit" @click="login">登录</button>
    </div>
    <div v-else :class="['button', lock ? 'disabled' : '']" @click="submit">抢答</div>
    <div class="mark" v-show="show">
      {{count === 0 ? '开始' : count}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      userName: '',
      msg: '',
      lock: true,
      count: 0,
      timer: null,
      show: false
    }
  },

  mounted() {
    this.userName = sessionStorage.getItem('userName');
    if (this.userName) {
      this.initWebSocket();
    }
    
  },
  methods: {
    /**
     * 登录
     */
    login() {
      if (!this.user) {
        return ;
      }
      this.userName = this.user;
      sessionStorage.setItem('userName', this.user);
      this.initWebSocket();
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
          role:"user", // 定义角色
          type: "login", // 定义消息类型, 是登录还是其他
          name: this.userName
        };
        this.websocketsend(JSON.stringify(actions));
      },

      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },

      websocketonmessage(e){ //数据接收
        const msg = JSON.parse(e.data);
        console.log(msg)
        if (msg.type === 'answer') {
          this.handlerAnswer(msg);
        } else if (msg.type === 'start') { // 开始抢答
          this.countTime();
        }
      },

      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },

      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
      /**
       * 开启倒计时
       */
      countTime() {
        clearInterval(this.timer);
        this.show = true;
        this.count = 3;
        this.timer = setInterval(() => {
          if (this.count === 0) {
            this.lock = false;
            this.show = false;
            clearInterval(this.timer); 
          } else {
            this.count -= 1;
          }
        }, 1000)
      },

      submit() {
        if (this.lock) {
          return ;
        }
        this.lock = true;
        let obj = {
          name: this.userName,
          type: 'answer'
        }
        this.websocketsend(JSON.stringify(obj))
      },

       /**
       * 抢答结果
       */
      handlerAnswer(msg) {
        if (msg.code === 'success') {
          // alert('抢答成功');
          this.$toast.success('抢答成功');
        } else {
          this.$toast.fail(`抢答失败, 已经被${msg.name}抢答`);
        }
        
      },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .button {
    margin: 200px auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    color: #fff;
    background: lightseagreen;
    line-height: 200px;
    font-size: 48px;
    -webkit-user-select: none;
  }
  .disabled {
    background: #ccc;
  }
  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 48px;
    line-height: 400px;
  }

  .login {
    display: flex;
    margin-top: 200px;
    justify-content: center;
  }
  .login .input {
    width: 200px;
    height: 44px;
    font-size: 36px;
    border: #ccc 1px solid;
  }
  .login .submit {
    margin-top: 0;
    width: 80px;
    height: 48px;
    line-height: 48px;
    background: #67C23A;
    border: none;
    color: #fff;
    font-size: 18px;
  }
</style>