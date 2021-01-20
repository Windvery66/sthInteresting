<template>
<div id="dice">
  <div class="dice" :class="'dice_'+number">
    <div class="diceFace"><p>1</p></div>
    <div class="diceFace"><p>2</p></div>
    <div class="diceFace"><p>3</p></div>
    <div class="diceFace"><p>4</p></div>
    <div class="diceFace"><p>5</p></div>
    <div class="diceFace"><p>6</p></div>
  </div>


  <button @click="number = 1">1</button>
  <button @click="number = 2">2</button>
  <button @click="number = 3">3</button>
  <button @click="number = 4">4</button>
  <button @click="number = 5">5</button>
  <button @click="number = 6">6</button>

  </div>
</template>

<script>
export default {
data(){
  return{
    number:1
  }
}
}
</script>

<style lang="less" scoped>
@import "./dice.less";
</style>