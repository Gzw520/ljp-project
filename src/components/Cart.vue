<template>
  <div id="cart">
    <Navmain>
      <div slot='left' class="left" @click="Left">
        <van-icon name="arrow-left" color="#eee" size=".6rem"/>
      </div>
      <div slot="title">购物车</div>
    </Navmain>
    <main>
      <div class="cartlist"  v-if="cartLength">
        <van-card
          v-for="(item,index) in cartData" :key="index"
          :num="item.value"
          :price="item.price"
          :title="item.name"
          :thumb="item.img"
        >
          <template #footer>
            <van-button size="mini" color="#F24A30" @click="Add(index)">增加</van-button>
            <van-button size="mini" color="#F24A30" @click="Dec(item.value,index)">减少</van-button>
          </template>
        </van-card>
      </div>
      <div class="box" v-else>
        <van-empty class="custom-image" :image="img" description="亲，你的购物车空空如也，快去逛逛吧！" />
        <van-button round type="warning" class="bottom-button" @click="Addshop">去添加</van-button>
      </div>
    </main>
    <footer>
      <div class="foot">
        <span>合计：<i>{{allPrice | Showprice(allPrice)}}</i></span>
        <van-button round type="danger" @click="onSubmit">提交订单</van-button>
      </div>
    </footer>
  </div>
</template>

<script>
import Navmain from "@/components/Navmain";
import { mapGetters } from "vuex";
export default {
  props: [""],
  data() {
    return {
      img: require("../assets/img/lodding.gif"),
    };
  },

  components: {
    Navmain,
  },

  computed: {
    ...mapGetters(["cartData","cartLength","allPrice"])
  },
  filters: {
      Showprice(price) {
        return price + "元";
      },
  },
  mounted() {},

  methods: {
    onSubmit(){
      this.$router.push('/order')
    },
    Add(index){
      this.$store.dispatch('Addnum',index)
    },
    Dec(value,index){
      const obj={}
      obj.value = value
      obj.index = index
      this.$store.dispatch('Decnum',obj)
    },
    Addshop(){
      this.$router.push('/')
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
.custom-image
  margin-top 2rem
  .van-empty__image
    width: 1.2rem
    height: 1.2rem
.bottom-button
  width 2.5rem
  height .8rem
  margin-left 2.5rem
.foot
  position fixed
  right .4rem
  bottom 1rem
  width 4rem
  height 1rem
  display flex
  justify-content space-between
  align-items center
  i 
    color red
span 
  font-size .28rem
</style>