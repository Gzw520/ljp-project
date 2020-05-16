<template>
  <div id="my">
    <Navmain>
      <div slot='left' class="left" @click="Left">
        <van-icon name="arrow-left" color="#eee" size=".6rem"/>
      </div>
    </Navmain>
    <header>
      <h1>
        <img :src="url" alt />
      </h1>
      <p>甘优鲜</p>
    </header>
    <h3>
      <input type="text" placeholder="请输入用户名" v-model="username" />
    </h3>
    <h3>
      <input id="pass" type="password" placeholder="请输入密码" v-model="password" />
    </h3>
    <div class="box">
      <h3 class="code">
        <input id="code" type="text" placeholder="请输入验证码" v-model="code" />
      </h3>
      <h4 v-html="svg" ref="svg"></h4>
      <h5 @click="change">换一换</h5>
    </div>
    <aside>
      <h2 @click="Register">去注册</h2>
      <h2 @click="Forget">忘记密码？</h2>
    </aside>
    <van-button type="info" color="#07c160" class="btn" @click="loginBtn">登 陆</van-button>
  </div>
</template>

<script>
import { Login, Code } from "@/components/network/api";
import Navmain from "@/components/Navmain";
export default {
  props: [""],
  data() {
    return {
      url: require("@/assets/img/logo.svg"),
      username: "",
      password: "",
      svg: "",
      code: "",
      text: ""
    };
  },

  components: {Navmain},

  computed: {},

  mounted() {
    Code().then(res => {
      const { result, text } = res.data;
      this.svg = result;
      this.text = text;
      console.log(this.text);
    });
  },

  methods: {
    Register() {
      this.$router.push("./register");
    },
    Forget() {
      this.$router.push("/forget");
    },
    loginBtn() {
      Login(this.username, this.password).then(res => {
        this.username == "" && this.$toast("用户名不能为空！");
        this.password == "" && this.$toast("密码不能为空！");
        this.code == "" && this.$toast("验证码不能为空！");
        this.code != this.text && this.$toast("验证码错误")
        if(this.username && this.password && this.code){
          this.$store.dispatch('User',this.username)
          this.$toast(res.data.state)
          this.$router.push('/')
        }
      });
    },
    change() {
      Code().then(res => {
        this.svg = res.data.result;
      });
    },
    Left(){
      this.$router.go(-1)
    }
  }
};
</script>
<style lang='stylus' scoped>
.left
  padding-top .15rem
header 
  width 3rem
  height 1.3rem
  margin 2rem 0 0 1.5rem
  display flex
  justify-content space-around
  align-items center
  p
    font-size 0.28rem
    font-weight 600
  h1
    width 1rem
    height 1rem
    border-radius 50%
    overflow hidden
    float left
    img 
      width 100%
      height 100%
h3
  width 4.5rem
  height 0.6rem
  margin 0.5rem auto 0
  border-radius 0.1rem
  border 1px solid #aaa
  input 
    width 100%
    height 100%
    font-size 0.12rem
    float left
    border none 
    padding-left 0.6rem
    border-radius .1rem
    background url('../assets/img/user.svg') no-repeat 0.1rem center
    background-size 0.4rem 0.4rem
    background-color #F2F6FC
  #pass
    background url('../assets/img/password.svg') no-repeat 0.1rem center
    background-size 0.4rem 0.4rem
    background-color #F2F6FC
  #code
    background url('../assets/img/code.svg') no-repeat 0.1rem center
    background-size 0.4rem 0.4rem
    background-color #F2F6FC
    width 1.97rem
    border-radius .1rem
.box 
  height .6rem
  width 4.5rem
  margin 0.5rem auto 0
  display flex
  justify-content space-between
  align-items center
  h5
    font-size 0.2rem
    width .6rem
    height 100%
    line-height .6rem
    color red
  h4
    width 1.5rem
    height 100%
    border 1px solid #999
    border-radius 0.15rem
    line-height .6rem
    overflow hidden
.code
  width 2rem
  margin 0
.btn
  width 3rem
  border-radius 0.2rem
  margin .3rem 0 0 2rem
aside
  width 4.3rem
  height .5rem
  margin .3rem 0 0 1.6rem
  display flex
  justify-content space-between
  align-items center
  h2
    font-size 0.2rem
    color orangered
</style>