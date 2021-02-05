<template>
    <div class="prizeBox">
        <div
            class="prizeBoxItem"
            :style="
                rolling
                    ? 'transform: rotateX(' +
                      degX +
                      'deg) rotateY(' +
                      degY +
                      'deg) rotateZ(' +
                      degZ +
                      'deg) translate3d(' +
                      index +
                      'rem,' +
                      index +
                      'rem,' +
                      index +
                      'rem)'
                    : 'transform: rotateX(110deg) rotateY(-30deg) rotateZ(-10deg) translate3d(' +
                      (index) +
                      'rem,' +
                      (-(4.5-Math.abs(4.5-index))/4) +
                      'rem,' +
                      (index) +
                      'rem)'
            "
            v-for="(item, index) in boxAmount"
            :key="index"
        >
            <div class="prizeBoxFace"><p>?</p></div>
            <div class="prizeBoxFace"><p>?</p></div>
            <div class="prizeBoxFace"><p>?</p></div>
            <div class="prizeBoxFace"><p>?</p></div>
            <div class="prizeBoxFace"><p>?</p></div>
            <div class="prizeBoxFace"><p>?</p></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["amount"],
    data() {
        return {
            degX: 0,
            degY: 0,
            degZ: 0,
            rolling: null,
        };
    },
    computed: {
        boxAmount() {
            let arr = [];
            arr.length = Number(this.amount);
            return arr;
        },
    },
    methods: {},
};
</script>


<style lang="less" scoped>
@import "./prizeBox.less";
</style>