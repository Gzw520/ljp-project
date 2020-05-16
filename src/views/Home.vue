<template>
  <div id="home">
    <Navmain>
      <div slot="left">
        <van-icon name="location-o" color="#eee" size=".4rem" />
        <p>甘肃</p>
      </div>
      <div slot="title" @click="Search">
        <van-search
          class="search"
          v-model="value"
          shape="round"
          background="#07c160"
          placeholder="请输入搜索关键词"
        />
      </div>
    </Navmain>
    <Swiper />
    <van-grid :gutter="10" :icon-size="60">
      <van-grid-item
        v-for="(nav,index) in navlist"
        :key="index"
        :icon="nav.img"
        :text="nav.shopname"
      />
    </van-grid>
    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="medal-o"
    >亲爱的顾客朋友，时值炎夏，酷暑难熬，对此，我们新推出西瓜等一些避暑水果，欢迎品尝！</van-notice-bar>
    <div class="type" v-for="(type,index) in typeList" :key="index">
      <img :src="type.img" alt id="tj" />
      <div class="list">
        <div class="con" v-for="(item,index) in type.showList" :key="index">
          <router-link :to="'/detail?id='+item.id">
            <img class="list-img" :src="item.img" alt />
          </router-link>
          <h2>{{item.shopname}}</h2>
          <span>
            <i>{{item.price | Showprice(item.price)}}</i>
            <van-icon name="shopping-cart" size=".3rem" color="#07c160" @click="Cart" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/Swiper";
import Navmain from "@/components/Navmain";
import { Demo, Navdata } from "@/components/network/api";
export default {
  props: [""],
  data() {
    return {
      active: 0,
      value: "",
      typeList: "",
      navlist: ""
    };
  },
  components: {
    Swiper,
    Navmain
  },
  filters: {
    Showprice(price) {
      return price + "元/kg";
    }
  },
  mounted() {
    Demo().then(res => {
      this.typeList = res.data.result;
    });
    Navdata().then(res => {
      this.navlist = res.data.result;
    });
  },

  methods: {
    Search() {
      this.$router.push("/search");
    },
    Cart() {
      this.$router.push("/cart");
    }
  }
};
</script>
<style lang='stylus' scoped>
#tj 
    width 100%
    height 4.15rem
.list
  height 3.5rem
  width 100%
  overflow auto
  border-bottom 1px solid #eeeeee
  display flex
  .con
    width 2.5rem
    height 3.2rem
    display flex 
    justify-content space-around
    flex-direction column
    align-items center
    margin 0 .16rem
    border-radius .2rem
    box-shadow 0 0 5px rgba(0,0,0,.1)
  .list-img
    width 2.2rem
    height 2.3rem
    margin-left 0.1rem
    border-radius 0.1rem
  h2
    width 2rem
    height 0.28rem
    font-size 0.12rem
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    margin-top 0.15rem
    color #888
    margin-left 0.12rem
  span 
    width 100%
    display flex
    justify-content space-around
    align-items center
    color red
    font-weight 600
.search
  height 0.88rem
  font-weight 100
</style>
