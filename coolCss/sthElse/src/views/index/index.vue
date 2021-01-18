<template>
  <div id="index">
    <showTitle title="松果痰抖五连鞭" style="display:none"/>
    <div class="index">
      <img src="@/assets/123.png" alt=""  style="opacity:0">
    </div>
    <img id="player" src="@/assets/bbb.png" alt="">
  </div>
</template>

<script>
import {showLoading} from "@/utils/loading.js";
import showTitle from "@/components/showTitle/showTitle.vue";
export default {
  data() {
    return {};
  },
  created() {

  },
  mounted() {
    showLoading()
  },
  computed: {
    
  },
  methods: {},
  components:{
    showTitle
  }
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