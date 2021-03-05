<template>
  <div id="test1">
    <uiMenu/>
    <skillTetris/>
  </div>
</template>

<script>
import uiMenu from "@/components/uiMenu/uiMenu.vue";
import skillTetris from "@/components/skillTetris/skillTetris.vue";
export default {
data(){
  return{

  }
},
created(){
  document.querySelector("#loading").style.cssText = "display:none"
},
methods:{

},
components:{
  uiMenu,
  skillTetris
}
}
</script>

<style lang="less">
  @import "./test1.less";
</style>