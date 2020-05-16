<template>
  <div id="nav-main">
    <div class="top">
        <div class="left"><slot name="left"></slot></div>
        <div class="title"><slot name="title">甘优鲜</slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
  </div>
</template>
<style lang='stylus' scoped>
p
  position absolute 
  top .25rem
  left .15rem
  color #eeeeee
.top
    width 100%
    height 0.88rem
    background #07c160
    display flex
    align-items center
    position fixed
    top 0
    z-index 10
    .left
        width .8rem
        height 100%
        text-align center
        line-height .88rem
        position relative
    .title
        width calc(100% - .8rem * 2)
        height 100%
        font-size 0.28rem
        color #fff
        text-align center
        line-height 0.88rem
        font-weight bold
    .right
        width .8rem
        height 100%
</style>