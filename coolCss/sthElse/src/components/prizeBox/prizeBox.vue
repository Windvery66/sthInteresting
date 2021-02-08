<template>
    <div class="prizeBoxs">
        <!-- 十连按钮 -->
        <div class="selectAll" @click="getItem('all')" v-show="!selected">
            <div class="cnText">我全都要</div>
            <div class="enText">ALL MINE</div>
            <div class="off">-25% OFF</div>
        </div>
        <!-- 十连转盘 -->
        <div class="prizeBox" v-show="showBox">
            <div
                class="getTenTimes"
                :class="selected ? 'active' : ''"
                :style="paused ? 'animation-play-state:paused;' : ''"
            >
                <div
                    class="prizeBoxPosition"
                    :class="selected && selected != 'all' ? 'active' : ''"
                    v-for="(item, index) in boxAmount"
                    :key="index"
                    v-show="
                        !selected || selected == index + 1 || selected == 'all'
                    "
                    :style="'transform: rotateZ(' + index * 36 + 'deg)'"
                    @mouseover="paused = true"
                    @mouseleave="paused = false"
                    @click="getItem(index)"
                >
                    <div
                        class="prizeBoxItem"
                        :style="'animation-delay:' + index / 5 + 's;'"
                    >
                        <div class="prizeBoxFace"><p>?</p></div>
                        <div class="prizeBoxFace"><p>?</p></div>
                        <div class="prizeBoxFace"><p>?</p></div>
                        <div class="prizeBoxFace"><p>?</p></div>
                        <div class="prizeBoxFace"><p>?</p></div>
                        <div class="prizeBoxFace"><p>?</p></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 物品列表 -->
        <div class="itemList" v-show="showResult">
            <div class="prizeItemList">
                <div
                    class="prizeItem"
                    v-for="(item, index) in itemList"
                    :key="index"
                    :style="'animation-delay:' + index / 10 + 's;'"
                >
                    <div class="prizeItemBg">
                    </div>
                    <div class="prizeItemBorder">
                            <img class="itemIcon" src="../../assets/ava.png" alt="" />
                        </div>
                    <div class="cnText">屠龙宝刀</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            paused: false,
            boxAmount: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            itemList:[],
            selected: null,
            showBox: true,
            showResult: false,
        };
    },
    computed: {},
    methods: {
        getItem(index) {
            var that = this;
            if (index == "all") {
                this.selected = "all";
                this.itemList.length = 10;
            } else {
                this.selected = index + 1;
                this.itemList.length = 1;
            }
            this.showResult = true;
            setTimeout(() => {
                that.showBox = false;
            }, 1200);
        },
    },
};
</script>


<style lang="less" scoped>
@import "./prizeBox.less";
</style>