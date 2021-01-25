<template>
<div>
    <div class="mouseClick" :ref="'mouseClick'+item.count" v-for="(item,index) in mouseList" :key="index">
        <div class="mouseClickInner outerTop"></div>
        <div class="mouseClickInner outerLeft"></div>
        <div class="mouseClickInner inner"></div>
        <div class="mouseClickInner outerRight"></div>
        <div class="mouseClickInner outerBottom"></div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
          mouseList:[],
          clickTimesOuter:-1,
        };
    },
    mounted() {
        this.clickShow();
    },
    methods: {
        clickShow() {
          var that = this;
          var clickTimes = -1;
            document.addEventListener("click", (e) => {
              clickTimes++;
              this.mouseList.push({count:clickTimes});
              this.$nextTick(()=>{
                that.$refs['mouseClick'+clickTimes][0].style.cssText =
                    "top:calc(" +
                    e.clientY +
                    "px - 0.75rem);left:calc(" +
                    e.clientX +
                    "px - 0.75rem)";
                    setTimeout(()=>{
                      that.clickTimesOuter++;
                      if(that.clickTimesOuter == clickTimes){
                        that.mouseList = []
                      }
                    },800)
              })
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "./mouseClick.less";
</style>