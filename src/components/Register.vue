<template>
  <div id="reg">
    <Navmain>
      <div slot='left' class="left" @click="Left">
        <van-icon name="arrow-left" color="#eee" size=".6rem"/>
      </div>
    </Navmain>
    <header>
      <h1>
        <img :src="url" alt />
      </h1>
      <p>用户注册</p>
    </header>
    <h3>
      <input type="text" placeholder="请输入用户名" v-model="user" @blur="Blur" />
      <b ref="user"></b>
    </h3>
    <h3>
      <input type="password" placeholder="请输入密码" v-model="pass1" @blur="Blur1" />
      <b ref="pas1"></b>
    </h3>
    <h3>
      <input type="password" placeholder="请再次输入密码" v-model="pass2" @blur="Blur2" @input="Focu" />
      <b ref="pas2"></b>
    </h3>
    <h3>
      <input type="email" placeholder="请输入邮箱" v-model="email" @blur="Blur3" @input="Email" />
      <b ref="email"></b>
    </h3>
    <h3>
      <input id="tel" type="text" placeholder="请输入手机号" v-model="tel" @blur="Blur4" @input="Tel" />
      <b ref="tel"></b>
    </h3>
    <van-button type="info" color="#07c160" class="btn" @click="Reg">立即注册</van-button>
  </div>
</template>

<script>
import { userInfo } from "@/components/network/api";
import Navmain from "@/components/Navmain";
export default {
  name: "",
  props: [""],
  data() {
    return {
      url: require("@/assets/img/logo.svg"),
      user: "",
      pass1: "",
      pass2: "",
      email: "",
      tel: ""
    };
  },
  components: {Navmain},
  mounted() {},
  methods: {
    Blur() {
      if (this.user == "") {
        this.$refs.user.innerText = "用户名不能为空！";
      }
    },
    Blur1() {
      if (this.pass1 == "") {
        this.$refs.pas1.innerText = "密码不能为空！";
      }
    },
    Blur2() {
      if (this.pass2 == "") {
        this.$refs.pas2.innerText = "密码不能为空！";
      }
    },
    Focu() {
      if (this.pass1 != this.pass2) {
        this.$refs.pas2.innerText = "两次输入的密码不一致";
      } else {
        this.$refs.pas2.innerText = "";
      }
    },
    Blur3() {
      if (this.email == "") {
        this.$refs.email.innerText = "邮箱不能为空！";
      }
    },
    Blur4() {
      if (this.tel == "") {
        this.$refs.tel.innerText = "电话号码不能为空！";
      }
    },
    Email() {
      var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (pattern.test(this.email)) {
        this.$refs.email.innerText = "";
      } else {
        this.$refs.email.innerText = "请输入正确的邮箱格式！";
      }
    },
    Tel() {
      var phone = /0?(13|14|15|18)[0-9]{9}/;
      if (phone.test(this.tel)) {
        this.$refs.tel.innerText = "";
      } else {
        this.$refs.tel.innerText = "请输入正确的电话号码格式！";
      }
    },
    Reg() {
      if (this.user && this.pass1 && this.email && this.tel) {
        userInfo(this.user, this.pass1, this.email, this.tel).then(res => {
          this.$toast(res.data.state)
          this.$router.push('/my')
        });
      } else {
        this.$toast("信息有误");
      }
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
  margin 0.3rem auto 0
  border-radius 0.1rem
  border 1px solid #aaa
  input 
    width 100%
    height 100%
    font-size 0.12rem
    float left
    border none 
    padding-left 0.8rem
    border-radius .1rem
    background url('../assets/img/usesvg.svg') no-repeat 0.1rem center
    background-size 0.4rem 0.4rem
    background-color #F2F6FC
input[type=email]
    background url('../assets/img/email.svg') no-repeat 0.1rem center
    background-size 0.4rem 0.4rem
    background-color #F2F6FC
input[type=password]
    background url('../assets/img/pass.svg') no-repeat 0.1rem center
    background-size 0.4rem 0.4rem
    background-color #F2F6FC
#tel
    background url('../assets/img/tel.svg') no-repeat 0.1rem center
    background-size 0.4rem 0.4rem
    background-color #F2F6FC
.btn
  width 3rem
  border-radius 0.2rem
  margin .5rem 0 0 2rem
b 
    color red
    font-size 0.14rem
    height 0.2rem
    margin-left 0.3rem
</style>