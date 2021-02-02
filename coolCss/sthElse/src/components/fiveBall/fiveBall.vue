<template>
<div class="">
  <div id="fiveBall" ref="fiveBall">
    <!-- 背景 -->
    <div class="bg"></div>
    <!-- 主球体 -->
    <div class="mainBall" @click="drawCards">
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
  <div id="cards" ref="cards" v-show="showCards">
    <div class="cardItem" v-for="(item,index) in cardsList" :key="index">
      {{item}}
    </div>
    <button class="cardClose" @click="closeCards">close</button>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      showCards:false,
      cardsList:[0,1,2,3,4,5,6,7,8,9]
    }
  },
  methods:{
    drawCards(){
      this.$refs.fiveBall.style.cssText = "transform:scale(5) translateX(5rem) translateY(-3rem);filter: drop-shadow(0 0 0.5rem #fff8) blur(0.5rem);opacity:0;";
      this.showCards = true;
      setTimeout(()=>{
        this.$refs.cards.style.cssText = ""
      },500)
    },
    closeCards(){
      this.$refs.fiveBall.style.cssText = "";
      this.$refs.cards.style.cssText = "";
      // setTimeout(()=>{
        this.showCards = false;
      // },1000)
    }
  }
}
</script>

<style lang="less" scoped>
@import "./fiveBall.less";
@import "./cards.less";
</style>