<template>
    <div id="index">
        <!-- 首屏菜单 -->
        <gameMenu v-if="false" />
        <!-- 鼠标点击特效 -->
        <mouseClick />
        <!-- 骰子 -->
        <dice style="top: 60%; right: 10%" @rollingDone="getRolling" />
        <!-- 标题 -->
        <showTitle title="开始" v-show="false" />
        <!-- 大地图 -->
        <div id="map">
            <img
                src="@/assets/123.png"
                alt=""
                :style="
                    'transform: rotateX(23deg) rotateY(8deg) rotateZ(-23deg) translate3d(' +
                    (stepX + 29) +
                    '%, ' +
                    (stepY - 87) +
                    '%, 3rem)'
                "
            />
        </div>
        <!-- 小地图 -->
        <div id="smallMap">
            <img
                class="map"
                src="@/assets/123.png"
                alt=""
                :style="
                    'transform: translate3d(' +
                    (stepX + 50) +
                    '%, ' +
                    (stepY - 50) +
                    '%,0)'
                "
            />
            <img class="player" src="@/assets/bbb.png" alt="" />
        </div>
        <!-- 玩家 -->
        <img id="player" src="@/assets/bbb.png" alt="" />
        <!-- 五行球(辅助菜单) -->
        <fiveBall />
        <!-- 玩家(战斗形象) -->
        <character />
        <!-- 物品栏 -->
        <div class="innerWindow" ref="innerWindow" style="top: 30%; left: 30%">
            <div class="tops">
                <div
                    class="touchArea"
                    @mousedown="dragMove"
                    :style="canIClose ? '' : 'pointer-events: none;'"
                >
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
                        :class="item.src ? 'withItem' : ''"
                        v-for="(item, index) in knapsackItemList"
                        :key="index"
                        @click="itemMove(item, index, $event)"
                    >
                        <img
                            :src="require('../../assets/' + item.src)"
                            alt=""
                            v-if="item.src"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- 手持的物品(物品栏/装备栏等) -->
        <div class="targetItem" ref="targetItem" v-if="targetItem.src">
            <img :src="require('../../assets/' + targetItem.src)" alt="" />
        </div>
        <btn cnText="开始" enText="START" />
        <btn cnText="结束" enText="OVER" style="top: 10%" />
    </div>
</template>

<script>
import { showLoading } from "@/utils/loading.js";
import showTitle from "@/components/showTitle/showTitle.vue";
import dice from "@/components/dice/dice.vue";
import mouseClick from "@/components/mouseClick/mouseClick.vue";
import gameMenu from "@/components/gameMenu/gameMenu.vue";
import fiveBall from "@/components/fiveBall/fiveBall.vue";
import character from "@/components/character/character.vue";
import btn from "@/components/btn/btn.vue";
export default {
    data() {
        return {
            stepNumber: 0, //步数
            stepX: 0, //x坐标
            stepY: 0, //y坐标
            secret: [
                //作弊码
                {
                    id: "1",
                    keyCodes: [
                        "ArrowUp",
                        "ArrowUp",
                        "ArrowDown",
                        "ArrowDown",
                        "ArrowLeft",
                        "ArrowRight",
                        "ArrowLeft",
                        "ArrowRight",
                        "KeyB",
                        "KeyA",
                        "KeyB",
                        "KeyA",
                    ],
                    effect: "作弊成功！**** +100",
                },
            ],
            keyList: [], //键盘记录
            keyTime: 0, //键盘延时计数
            targetItem: {}, //手持的物品
            canIClose: true, //如果手持物品状态则不允许关闭窗口
            knapsackItemList: [
                {},
                { src: "ava.png" },
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
                { src: "bbb.png" },
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
    created() {
        //鼠标右键事件
        document.oncontextmenu = (e) => {
            e.preventDefault();
        };
    },
    mounted() {
        showLoading();
        //监听键盘按下
        document.addEventListener("keydown", this.shortcutKey);
    },
    computed: {},
    methods: {
        //快捷键
        shortcutKey(e) {
            var that = this;
            if (e.code == "F12") {
                e.preventDefault();
            }
            this.keyList.push(e.code);
            setTimeout(() => {
                that.keyTime++;
                if (that.keyList.length == that.keyTime) {
                    //作弊码
                    that.secret.forEach((item) => {
                        if (
                            that.keyList.toString() == item.keyCodes.toString()
                        ) {
                            console.log(item.effect);
                        }
                    });
                    that.keyTime = 0;
                    that.keyList = [];
                }
            }, 800);
        },
        //掷骰子移动
        getRolling(number) {
            var that = this;
            setTimeout(() => {
                that.stepNumber = number;
                that.stepX -= number * 2;
                that.stepY += number * 2;
            }, 500);
        },
        //拖拽窗口
        dragMove(e) {
            let offsetx = e.offsetX;
            let offsety = e.offsetY;
            let indexEl = document.querySelector("#index");
            document.onmousemove = (e1) => {
                this.$refs.innerWindow.style.cssText =
                    "top:" +
                    ((e1.clientY -
                        indexEl.offsetTop -
                        offsety -
                        this.$refs.innerWindow.clientHeight * 0.01) *
                        100) /
                        indexEl.clientHeight +
                    "%;left:" +
                    ((e1.clientX -
                        indexEl.offsetLeft -
                        offsetx -
                        this.$refs.innerWindow.clientWidth * 0.3) *
                        100) /
                        indexEl.clientWidth +
                    "%";
            };
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        //点击移动物品(如果手持物品状态则不允许关闭窗口)
        itemMove(item, index, $event) {
            document.onmousemove = null;
            if (this.targetItem.src) {
                //如果之前是手持物品状态
                this.knapsackItemList.splice(index, 1, this.targetItem);
                if (item.src) {
                    //如果落下的格子有物品
                    this.targetItem = item;
                    document.onmousemove = (e) => {
                        this.$refs.targetItem.style.cssText =
                            "top:calc(" +
                            e.clientY +
                            "px - 0.25rem);left:calc(" +
                            e.clientX +
                            "px - 0.25rem);";
                    };
                } else {
                    this.targetItem = {};
                    document.onmousemove = null;
                }
            } else {
                //如果之前是空手状态
                if (item.src) {
                    this.targetItem = item;
                    this.knapsackItemList.splice(index, 1, {});
                    this.$nextTick(() => {
                        this.$refs.targetItem.style.cssText =
                            "top:calc(" +
                            $event.clientY +
                            "px - 0.25rem);left:calc(" +
                            $event.clientX +
                            "px - 0.25rem);";
                    });
                    document.onmousemove = (e) => {
                        this.$refs.targetItem.style.cssText =
                            "top:calc(" +
                            e.clientY +
                            "px - 0.25rem);left:calc(" +
                            e.clientX +
                            "px - 0.25rem);";
                    };
                }
            }
            //抓起物品不允许关闭/放下物品允许关闭
            this.canIClose = !this.targetItem.src;
        },
    },
    components: {
        showTitle,
        dice,
        mouseClick,
        gameMenu,
        fiveBall,
        character,
        btn,
    },
};
</script>

<style lang="css">
.index {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.index img {
    flex-shrink: 0;
    width: 600px;
}
</style>
<style lang="less" scoped>
@import "./index.less";
@import "./innerWindow.less";
</style>