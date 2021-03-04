<template>
  <div id="test1">
    <uiMenu/>
  </div>
</template>

<script>
import uiMenu from "@/components/uiMenu/uiMenu.vue";
export default {
data(){
  return{

  }
},
created(){
  document.querySelector("#loading").style.cssText = "display:none"
},
methods(){

},
components:{
  uiMenu
}
}
</script>

<style lang="less">
  @import "./test1.less";
</style>