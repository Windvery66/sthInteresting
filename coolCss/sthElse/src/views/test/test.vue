<template>
  <div class="test">
    <innerWindow style="position:absolute;top:20%;left:20%" />
  </div>
</template>

<script>
import innerWindow from "@/components/innerWindow/innerWindow";
export default {
  data(){
    return{

    }
  },
  created(){
    var loadingEl = document.getElementById("loading");
    loadingEl.style.cssText = "display:none";
  },
  methods:{

  },
  components:{
    innerWindow
  }
}
</script>

<style lang="less" scoped>
  @import "./test.css";
</style>