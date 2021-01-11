<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  cursor: url("./assets/aaa.ico"), auto;
}
@font-face {
  font-family: "coke";
  src: url("./assets/Coca-Cola.ttf");
}
</style>
<style >
@import url("./utils/reset.css");
@import url("./utils/animate.min.css");
</style>