<template>
  <div id="app">
    <Tabbar />
    <router-view />
  </div>
</template>
<script>
import Tabbar from "@/components/Tabbar";
export default {
  data() {
    return {};
  },
  components: {
    Tabbar,
  }
};
</script>
<style lang="stylus">
@import './assets/css/public.css';
#app
  padding-top 0.88rem
  padding-bottom 0.85rem
</style>
