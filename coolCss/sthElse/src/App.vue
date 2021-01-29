<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    mounted() {},
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    cursor: url("./assets/aaa.ico"), auto;
    animation: cursorFluctuate 0.5s linear infinite;
}
@keyframes cursorFluctuate {
    0% {
        cursor: url("./assets/cursor/ava1.png"), auto;
    }
    12.5% {
        cursor: url("./assets/cursor/ava2.png"), auto;
    }
    25% {
        cursor: url("./assets/cursor/ava3.png"), auto;
    }
    37.5% {
        cursor: url("./assets/cursor/ava4.png"), auto;
    }
    50% {
        cursor: url("./assets/cursor/ava5.png"), auto;
    }
    62.5% {
        cursor: url("./assets/cursor/ava6.png"), auto;
    }
    75% {
        cursor: url("./assets/cursor/ava7.png"), auto;
    }
    87.5% {
        cursor: url("./assets/cursor/ava8.png"), auto;
    }
    100% {
        cursor: url("./assets/cursor/ava1.png"), auto;
    }
}
</style>
<style >
@import url("./utils/animate.min.css");
@import url("./utils/common.css");
</style>