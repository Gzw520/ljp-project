<template>
  <div id="order">
    <Navmain>
      <div slot='left' class="left" @click="Left">
        <van-icon name="arrow-left" color="#eee" size=".6rem"/>
      </div>
      <div slot="title">订单中心</div>
    </Navmain>
    <van-cell is-link @click="showPopup" v-model="carmodel">选择你的收货地址</van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-area
        :area-list="areaList"
        :columns-num="3"
        ref="myArea"
        title="标题"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <h1>
      <input type="text" disabled v-model="address" />
    </h1>
    <h1>
      <input type="text" placeholder="详细地址" v-model="ad2" />
    </h1>
    <h1>
      <input type="text" placeholder="电话号码" v-model="tel" />
    </h1>
    <h2>订单详情</h2>
    <article>
      <van-card
        v-for="(pay,index) in cartData"
        :key="index"
        :num="pay.value"
        :price="pay.price"
        :title="pay.name"
        :thumb="pay.img"
      />
    </article>
    <footer>
      <van-goods-action class="cartbtn">
        <van-goods-action-button text="立即支付" color="#07c160" @click="onClickButton" />
      </van-goods-action>
    </footer>
  </div>
</template>

<script>
import areaList from "@/assets/area/area.js";
import Navmain from "@/components/Navmain";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      areaList,
      show: false,
      carmodel: "",
      address: "北京市朝阳区",
      ad2: "",
      tel: ""
    };
  },
  computed: {
    ...mapGetters(["cartData", "cartLength"])
  },
  components: {
    Navmain
  },
  methods: {
    // 弹出层显示
    showPopup() {
      this.show = true;
    },
    //value=0改变省，1改变市，2改变区
    onChange(picker, index, value) {
      let val = picker.getValues();
      console.log(val); //查看打印
      let areaName = "";
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i == 0 ? "" : "/") + val[i].name;
      }
      this.carmodel = areaName;
    },
    //确定选择城市
    onConfirm(val) {
      this.address = val[0].name + val[1].name + val[2].name;
      // console.log(val[0].name + val[1].name + val[2].name);
      this.show = false; //关闭弹框
    },
    //取消选中城市
    onCancel() {
      this.show = false;
      this.$refs.myArea.reset(); // 重置城市列表
    },
    onClickButton() {
      this.$dialog
        .confirm({
          title: "确认收货信息",
          message: this.address + '<br/>'+ this.ad2 + this.tel
        })
        .then(_ => {
          console.log("支付模拟界面");
        })
        .catch(_ => {
          console.log("邓紫棋失恋之极写了泡沫，我听泡沫写完三份毕设");
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
h1
    width 7rem
    height 0.8rem
    margin 0.2rem auto 0
    border 1px solid #B8D0EA
    border-radius 0.15rem
    input 
        width 100%
        height 100%
        border none 
        border-radius 0.15rem
        padding-left 0.25rem
        font-size 0.12rem
        background #fff
h2
    width 100%
    height 0.5rem
    margin-top 0.3rem
    padding-left 0.3rem
    line-height .5rem
    font-size 0.26rem
article 
    width 7rem
    height 6.7rem
    margin 0.15rem auto 0
    overflow auto
footer 
    width 100%
    height 1.2rem
    position fixed
    bottom 0
    z-index 10
    background #fff
    .cartbtn
        bottom 0.1rem
        height 1.2rem
        width 2.5rem
        margin-left 4.9rem
</style>