<template>
  <div>
    <div class="swiper">
      <van-swipe :autoplay="3000" height=2rem>
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {
      images: [
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2044021018,1028918437&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=530868702,2950645574&fm=11&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1055334458,378201758&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4007020544,1759051147&fm=26&gp=0.jpg"
      ]
    };
  },
  mounted() {},
};
</script>
<style lang='stylus' scoped>
.swiper
    width 100%
    height 4rem
    img
        height 4rem
        width 100%
</style>