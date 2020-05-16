<template>
  <div id="detail">
    <Navmain>
      <div slot="title">商品详情</div>
    </Navmain>
    <h6 @click="Home(path)">
      <van-icon name="arrow-left" color="#1989fa" size=".5rem" />
    </h6>
    <header>
      <div class="img_box" v-for="(item2,index) of images" :key="index">
        <img :src="item2" alt @click="getImg(item2,index)" />
      </div>
    </header>
    <h3>{{price}}元/kg</h3>
    <p class="des">{{des}}</p>
    <div class="step">
      <p class="join-cart">选择数量：</p>
      <van-stepper v-model="value" input-width="1.5rem" button-size="0.8rem" class="con" />
    </div>
    <footer>
      <van-goods-action class="cartbtn">
        <van-goods-action-button type="warning" text="加入购物车" @click="cart(userInfo)" />
        <van-goods-action-button type="danger" text="去购物车" @click="btn" />
      </van-goods-action>
    </footer>
  </div>
</template>

<script>
import { Toast } from "vant";
import { ImagePreview } from "vant";
import { mapGetters } from "vuex";
import Navmain from "@/components/Navmain";
import { Homedetail, Typedetail, cartData } from "@/components/network/api";
export default {
  props: [""],
  data() {
    return {
      value: 1,
      price: "",
      des: "",
      images: [],
      path: "",
      id: "",
      name: ""
    };
  },

  components: {Navmain},

  computed: {
    ...mapGetters(["userInfo"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path == "/") {
        vm.path = "/";
      } else {
        vm.path = "/type";
      }
    });
  },
  mounted() {
    Homedetail(this.$route.query.id).then(res1 => {
      res1.data.result.forEach(ele => {
        const arr = [];
        arr.push(ele.img);
        this.images = arr;
        this.price = ele.price;
        this.des = ele.description;
        this.id = ele.id;
        this.name = ele.shopname;
      });
    });
    Typedetail(this.$route.query.id).then(res => {
      res.data.result.forEach(ele => {
        const arr = [];
        arr.push(ele.img);
        this.images = arr;
        this.price = ele.price;
        this.des = ele.description;
        this.id = ele.id;
        this.name = ele.shopname;
      });
    });
  },

  methods: {
    btn() {
      this.$router.push("/cart");
    },
    cart(userInfo) {
      if (userInfo == 0) {
        this.$dialog
          .confirm({
            title: "确认登陆",
            message: "亲，登陆之后才可以加入购物车！"
          })
          .then(_ => {
            this.$router.push("/my");
          })
          .catch(_ => {});
      } else {
        cartData(this.value, this.images[0], this.name, this.price).then(
          res => {
            res.data.success == true && Toast("加入成功");
            const product = {};
            product.value = this.value;
            product.img = this.images[0];
            product.name = this.name;
            product.price = this.price;
            this.$store.dispatch("cartData", product);
          }
        );
      }
    },
    Home(path) {
      this.$router.push(path);
    },
    getImg(images, index) {
      ImagePreview({
        images: this.images,
        showIndex: true,
        loop: false,
        startPosition: index
      });
    },
  }
};
</script>
<style lang='stylus' scoped>
h6
    width 0.7rem
    height 0.7rem
    border-radius 50%
    background #E1DEDE
    padding-top 0.1rem
    position fixed
    top 1.1rem
    left 0.1rem
    text-align center
    line-height .7rem
    z-index 10
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
        width 4rem
        margin-left 2.9rem
h3
        margin 0.5rem 0 0.2rem 0.2rem
        color orangered 
        &:before
            content '价 格：'
            color #000
    .des
        color #aaa
        margin 0.1rem 0.2rem 0.5rem 0.2rem
        height 3.2rem
        position relative
        border-bottom 1px solid #abcdef
        border-top 1.5px solid #abcdef
        line-height 0.4rem
        padding-top 0.28rem
        text-indent 4em
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 7
        overflow hidden
        &:before
            content '详情描述：'
            font-size 0.28rem
            color #000
            position absolute
            top -0.5rem
            left 0
            text-indent 0
    .step       
        .join-cart
            float left
            height .8rem
            width 1.6rem
            line-height .8rem
            margin-left .2rem
            font-size .28rem
            color orangered 
            font-weight 600
        .btn
            float right
            margin-right .2rem
            height .8rem
            border-radius 7px
        .con
            float left
header
    width 100%
    height 4.8rem
    overflow hidden
    img 
        width 100%
        height 100%
</style>