<template>
  <div id="type">
    <Navmain>
      <div slot='left' class="left" @click="Left">
        <van-icon name="arrow-left" color="#eee" size=".6rem"/>
      </div>
    </Navmain>
    <div class="aside">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          :title="type.shopname"
          v-for="(type,index) in titList"
          :key="index"
          :class="{active:currentIndex==index}"
        />
      </van-sidebar>
    </div>
    <main>
      <van-grid :gutter="10" :icon-size="65">
        <van-grid-item
          :icon="main.img"
          v-for="(main,index) in mainList"
          :key="index"
          :text="main.shopname"
          :id="main.id"
          @click="Detail(main.id)"
        />
      </van-grid>
    </main>
  </div>
</template>

<script>
import Navmain from "@/components/Navmain";
import { Typedata, Navdata } from "@/components/network/api";
export default {
  props: [""],
  data() {
    return {
      activeKey: 0,
      currentIndex: 0,
      titList: "",
      mainList: ""
    };
  },

  components: {
    Navmain
  },

  computed: {},

  mounted() {
    Navdata().then(res => {
      this.titList = res.data.result;
    });
    Typedata(1).then(res => {
      this.mainList = res.data.result[0].showList;
    });
  },

  methods: {
    onChange(index) {
      this.currentIndex = index;
      let id = index + 1;
      Typedata(id).then(res => {
        this.mainList = res.data.result[0].showList;
      });
    },
    Detail(id) {
      this.$router.push("/detail?id=" + id);
    },
    Left(){
      this.$router.go(-1)
    }
  }
};
</script>
<style lang='stylus' scoped>
#type
    width 100%
    height calc(100vh - .88rem - .85rem)
.left
  padding-top .15rem
.aside
    width 1.71rem
    height 100%
    background #f7f8fa
    float left
.active
    color #07c160
    &:before
        content ''
        width 2px
        height 100%
        background #07c160
main
    height 100%
    overflow auto
</style>