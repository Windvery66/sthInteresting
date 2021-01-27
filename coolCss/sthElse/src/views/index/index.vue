<template>
  <div id="index">
    <!-- 首屏菜单 -->
    <gameMenu v-if="false"/>
    <!-- 鼠标点击特效 -->
    <mouseClick/>
    <!-- 骰子 -->
    <dice style="top:50%;right:30%" @rollingDone="getRolling" v-if="false"/>
    <!-- 标题 -->
    <showTitle title="开始" v-show="false"/>
    <!-- 大地图 -->
    <div id="map">
      <img src="@/assets/123.png" alt="" :style="'transform: rotateX(23deg) rotateY(8deg) rotateZ(-23deg) translate3d('+(stepX+29)+'%, '+(stepY-87)+'%, 3rem)'"/>
    </div>
    <!-- 小地图 -->
    <div id="smallMap">
      <img class="map" src="@/assets/123.png" alt="" :style="'transform: translate3d('+(stepX+50)+'%, '+(stepY-50)+'%,0)'"/>
      <img class="player" src="@/assets/bbb.png" alt="" />
    </div>
    <!-- 玩家 -->
    <img id="player" src="@/assets/bbb.png" alt="" />
    <!-- 五行球(辅助菜单) -->
    <fiveBall style="bottom:0.3rem;left:0.3rem" />
  </div>
</template>

<script>
import { showLoading } from "@/utils/loading.js";
import showTitle from "@/components/showTitle/showTitle.vue";
import dice from "@/components/dice/dice.vue";
import mouseClick from "@/components/mouseClick/mouseClick.vue";
import gameMenu from "@/components/gameMenu/gameMenu.vue";
import fiveBall from "@/components/fiveBall/fiveBall.vue";
export default {
  data() {
    return {
      stepNumber:0,//步数
      stepX:0,//x坐标
      stepY:0,//y坐标
    };
  },
  created() {},
  mounted() {
    showLoading();
  },
  computed: {},
  methods: {
    getRolling(number){
      var that = this;
      setTimeout(()=>{
      that.stepNumber = number;
      that.stepX-=number*2;
      that.stepY+=number*2;
      },500)
    }
  },
  components: {
    showTitle,
    dice,
    mouseClick,
    gameMenu,
    fiveBall
  },
};
</script>

<style lang="css">
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.index img {
  flex-shrink: 0;
  width: 600px;
}
</style>
<style lang="less" scoped>
@import "./index.less";
</style>