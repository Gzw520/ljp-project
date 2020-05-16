<template>
  <div id="forget">
    <Navmain>
      <div slot="left" class="left" @click="Left">
        <van-icon name="arrow-left" color="#eee" size=".6rem" />
      </div>
    </Navmain>
    <h1>找回密码</h1>
    <h2>
      <input type="text" placeholder="请输入注册时的电话号码/邮箱" v-model="tel" />
    </h2>
    <div class="code">
      <h2 id="code">
        <input id="send" type="text" placeholder="请输入验证码" v-model="code" />
      </h2>
      <input type="button" v-model="btn" @click="Code" :disabled="dis" />
    </div>
    <h2>
      <input type="text" placeholder="请输入新密码" v-model="newpass" />
    </h2>
    <van-button type="primary" size="large" class="button" color="#3691EE" @click="Ok">确 认</van-button>
  </div>
</template>

<script>
import Navmain from "@/components/Navmain";
import { Forget, Findtel, Newpassword } from "@/components/network/api";
export default {
  data() {
    return {
      tel: "",
      btn: "发送验证码",
      time: 60,
      flag: true,
      dis: false,
      newpass: "",
      code: "",
      msg: ""
    };
  },

  components: { Navmain },

  computed: {},

  mounted() {},

  methods: {
    Code() {
      Findtel(this.tel).then(res => {
        if (res.data.success) {
          Forget(this.tel).then(res => {
            this.msg = res.data.msg;
          });
        } else {
          this.$toast(res.data.success);
        }
      });
      this.time = 60;
      if (this.flag) {
        var timer = setInterval(_ => {
          this.dis = true;
          this.flag = false;
          this.time--;
          this.btn = this.time + "s后重新发送";
          if (this.time == 0) {
            this.btn = "重新发送";
            this.dis = false;
            this.flag = true;
            clearInterval(timer);
          }
        }, 1000);
      }
    },
    Ok() {
      if (this.code == this.msg) {
        Newpassword(this.tel, this.newpass).then(res => {
          this.$toast(res.data.success);
          this.$router.push("/my");
        });
      } else {
        this.$toast("验证码错误！");
      }
    },
    Left() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='stylus' scoped>
.left
  padding-top .15rem
h1
  margin 3rem 0 0 3rem
  width 1.5rem
  height 0.6rem
  line-height .5rem
  font-weight 600
  text-align center
  border-bottom 2px solid #07c160
h2 
  width 4rem
  height .6rem
  margin .3rem 0 0 2rem
  border 1px solid #aaa
  border-radius 0.15rem
.code
  width 4rem
  height 0.65rem
  margin .3rem 0 0 2rem
#code 
  width 2.4rem
  height 0.6rem
  margin 0
  float left
#send
  width 2.36rem
  height 100%
  margin-top 0
input[type=text]
  background #EBEFF2
  width 100%
  height 100%
  border none
  border-radius 0.15rem
  font-size 0.12rem
  padding-left 0.2rem
input[type=button]
  width 1.5rem
  height .6rem
  background #409EFF
  float right
  border none
  border-radius 0.15rem
  color #fff
  font-size 0.20rem
.button
  width 4rem
  border-radius 0.2rem
  margin 0.5rem 0 0 2rem
  height .65rem
</style>