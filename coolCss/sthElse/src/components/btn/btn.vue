<template>
<div class="btns">
  <div class="btn">
    <div class="cn">{{cnText}}</div>
    <div class="en">{{enText}}</div>
  </div>
  <div class="btn flashing">
    <div class="cn">{{cnText}}</div>
    <div class="en">{{enText}}</div>
  </div>
</div>

</template>

<script>
export default {
  props:["cnText","enText"],
  data(){
    return{
    }
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
@import "./btn.less";
</style>