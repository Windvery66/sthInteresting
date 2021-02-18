<template>
    <div class="innerWindow">
            <div class="tops">
                <div class="touchArea">
                  <div class="cntext">物品栏</div>
                  <div class="entext">Items</div>
                </div>
                <div class="closeBtn">X</div>
            </div>
            <div class="innerArea">
                <!-- 背包 -->
                <div class="knapsack">
                    <div
                        class="knapsackItem"
                        :class="item.src?'withItem':''"
                        v-for="(item, index) in knapsackItemList"
                        :key="index"
                    >
                        <img
                            src="../../assets/bbb.png"
                            alt=""
                            v-show="item.src"
                        />
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            knapsackItemList: [
                {},
                { src: "1" },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                { src: "1" },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
            ],
        };
    },
    methods: {},
};
</script>

<style lang="less" scoped>
@import "./innerWindow.less";
</style>