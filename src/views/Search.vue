<template>
  <div id="search">
    <Navmain>
      <div slot="title">
        <van-search
          class="search"
          v-model="value"
          shape="round"
          background="#07c160"
          placeholder="请输入搜索关键词"
        />
      </div>
    </Navmain>
    <van-card
      v-for="(item,index) in search(value)"
      :key="index"
      :price="item.price"
      :desc="item.description"
      :title="item.shopname"
      :thumb="item.img"
    >
      <template #footer>
        <van-button type="info" size="mini" color="orangered" @click="Detail(item.id)">查看详情</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
import Navmain from "@/components/Navmain";
import { searchData } from "@/components/network/api";
export default {
  props: [""],
  data() {
    return {
      searchList: "",
      value: ""
    };
  },

  components: { Navmain },
  mounted() {
    searchData().then(res => {
      this.searchList = res.data.result;
    });
  },

  methods: {
    search(value) {
      if (value == "") {
        return;
      }
      var newList = [];
      return newList = this.searchList.reduce( (item,ele) => ele.shopname.includes(value) ? [...item,ele] : item, [])
    },
    Detail(id){
      this.$router.push('/detail?id=' + id)
    }
  }
};
</script>
<style lang='stylus' scoped>
.search
  height 0.88rem
  font-weight 100
</style>