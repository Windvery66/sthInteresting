<template>
  <div id="fiveBall">
    <!-- 背景 -->
    <div class="bg"></div>
    <!-- 主球体 -->
    <div class="mainBall">
      <div class="mainBallCenter darkLightOuter">
        <div class="colorInner"></div>
      </div>
      <div class="mainBallCenter lightOuter">
        <div class="colorInner"></div>
      </div>
      <div class="mainBallCenter darkLightInner">
        <div class="colorInner"></div>
      </div>
      <div class="mainBallCenter lightInner">
        <div class="colorInner"></div>
      </div>
      <div class="mainBallCenter YinYang"></div>
    </div>
    <!-- 五行小球 -->
    <!-- <div class="ballItems">
      <div class="ballItem metal" >
        <div class="ballItemInner"></div>
      </div>
      <div class="ballItem wood" >
        <div class="ballItemInner"></div>
      </div>
      <div class="ballItem water" >
        <div class="ballItemInner"></div>
      </div>
      <div class="ballItem fire" >
        <div class="ballItemInner"></div>
      </div>
      <div class="ballItem earth" >
        <div class="ballItemInner"></div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import "./fiveBall.less";
</style>