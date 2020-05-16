<template>
  <div id="tabbar">
    <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/type">分类</van-tabbar-item>
      <!-- <van-tabbar-item to="/find">
        <span>发现</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item> -->
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: [""],
  data() {
    return {
      active: 0,
      icon: {
        active: require("@/assets/img/find2.svg"),
        inactive: require("@/assets/img/find1.svg")
      }
    };
  },
  mounted() {},
};
</script>
<style lang='stylus' scoped></style>