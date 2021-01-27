<template>
  <div id="gameMenu" v-if="show">
    <button @click="go">go</button>

  </div>
</template>

<script>
export default {
  data(){
    return{
      show:true
    }
  },
  methods:{
    go(){
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "./gameMenu.less";
</style>