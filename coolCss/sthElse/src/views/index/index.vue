<template>
  <div id="index">
    <dice style="top:40%;left:45%"/>
    <showTitle title="开始" v-show="false"/>
    <div class="index">
      <img src="@/assets/123.png" alt="" style="opacity: 0" />
    </div>
    <img id="player" src="@/assets/bbb.png" style="opacity: 0" alt="" />
    <img style="position:fixed" src="https://thumbs.gfycat.com/PinkPiercingBull-size_restricted.gif" alt="">
    <img style="position:fixed" src="https://thumbs.gfycat.com/WhiteTangibleIndianspinyloach-size_restricted.gif" alt="">
    <img style="position:fixed" src="https://thumbs.gfycat.com/PinkPiercingBull-size_restricted.gif" alt="">
  </div>
</template>

<script>
import { showLoading } from "@/utils/loading.js";
import showTitle from "@/components/showTitle/showTitle.vue";
import dice from "@/components/dice/dice.vue";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    showLoading();
  },
  computed: {},
  methods: {},
  components: {
    showTitle,
    dice,
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