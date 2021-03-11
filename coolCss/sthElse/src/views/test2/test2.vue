<template>
    <div id="test2">
        <div class="battleArea">
            <!-- 顶部(血条蓝条等) -->
            <div class="battleAreaTops">
                <!-- 我方血蓝条 -->
                <div class="topBarsOuter player">
                    <div class="hpBarBorder">
                        <div class="hpBar" :style="'width:'+(Math.pow((playerCurrentHp/playerMaxHp),1.5))*100+'%'">
                        </div>
                        <div class="barShadow" :style="'width:'+(Math.pow((playerCurrentHp/playerMaxHp),1.5))*100+'%'"></div>
                    </div>
                    <div class="mpBarBorder">
                        <div class="mpBar" :style="'width:'+(Math.pow((playerCurrentMp/playerMaxMp),1.5))*100+'%'">
                        </div>
                        <div class="barShadow" :style="'width:'+(Math.pow((playerCurrentMp/playerMaxMp),1.5))*100+'%'"></div>
                    </div>
                </div>
                <!-- 我方血蓝数值 -->
                <div class="playerValue numberValue">
                    <div class="hpValue">HP:{{playerCurrentHp}}</div>
                    <div class="mpValue">MP:{{playerCurrentMp}}</div>
                </div>
                <!-- VS -->
                <div class="vs">VS</div>
                <!-- 敌方血蓝条 -->
                <div class="topBarsOuter enemy">
                    <div class="hpBarBorder">
                        <div class="hpBar" :style="'width:'+(Math.pow((enemyCurrentHp/enemyMaxHp),1.5))*100+'%'">
                        </div>
                        <div class="barShadow" :style="'width:'+(Math.pow((enemyCurrentHp/enemyMaxHp),1.5))*100+'%'"></div>
                    </div>
                    <div class="mpBarBorder">
                        <div class="mpBar" :style="'width:'+(Math.pow((enemyCurrentMp/enemyMaxMp),1.5))*100+'%'">
                        </div>
                        <div class="barShadow" :style="'width:'+(Math.pow((enemyCurrentMp/enemyMaxMp),1.5))*100+'%'"></div>
                    </div>
                </div>
                <!-- 敌方血蓝数值 -->
                <div class="enemyValue numberValue">
                    <div class="mpValue">MP:{{enemyCurrentMp}}</div>
                    <div class="hpValue">HP:{{enemyCurrentHp}}</div>
                </div>
            </div>
            <!-- 主要部分(双方人物,战斗动画) -->
            <div class="battleAreaMain"></div>
            <!-- 进度条(速度条) -->
            <div class="progressBars">
                <!-- 我方进度条 -->
                <div class="progressBar player">
                    <div class="progressBarBg"></div>
                    <div class="innerProgressBar">
                        <div class="progressBarItems" :style="'transform:translateX('+(runTime/10)+'rem)'">
                            <div class="progressBarItem" v-for="(item,index) in playerProgress" :key="index">
                                <div class="afterAnimation" v-show="item.afterAnimation" :style="'width:'+item.afterAnimation+'rem'"></div>
                                <img :src="item.img" alt="">
                                <div class="attackAnimation" v-show="item.attackAnimation" :style="'width:'+item.attackAnimation+'rem'"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 敌方进度条 -->
                <div class="progressBar enemy">
                    <div class="progressBarBg"></div>
                    <div class="innerProgressBar">
                        <div class="progressBarItems" :style="'transform:translateX(-'+(runTime/10)+'rem)'">
                            <div class="progressBarItem" v-for="(item,index) in enemyProgress" :key="index">
                                <div class="attackAnimation" v-show="item.attackAnimation" :style="'width:'+item.attackAnimation+'rem'"></div>
                                <img :src="item.img" alt="">
                                <div class="afterAnimation" v-show="item.afterAnimation" :style="'width:'+item.afterAnimation+'rem'"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 技能池 -->
            <div class="skillPool"></div>

            <button @click="fight">Fight!</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            runTime: 0,
            fightRun: null,
            playerCurrentHp: 1000,
            playerMaxHp: 1000,
            playerCurrentMp: 1000,
            playerMaxMp: 1000,
            enemyCurrentHp: 1000,
            enemyMaxHp: 1000,
            enemyCurrentMp: 1000,
            enemyMaxMp: 1000,
            playerProgress: [
                {
                    img: require("../../assets/ava.png"),
                    attackAnimation: 0.2,
                    afterAnimation: 0.455,
                },
                {
                    img: require("../../assets/ava.png"),
                    attackAnimation: 0.2,
                    afterAnimation: 0,
                },
                {
                    img: require("../../assets/ava.png"),
                    attackAnimation: 0.2,
                    afterAnimation: 0,
                },
                {
                    img: require("../../assets/ava.png"),
                    attackAnimation: 0.2,
                    afterAnimation: 0,
                },
                {
                    img: require("../../assets/ava.png"),
                    attackAnimation: 0.2,
                    afterAnimation: 0,
                },
                {
                    img: require("../../assets/ava.png"),
                    attackAnimation: 0.2,
                    afterAnimation: 0,
                },
                {
                    img: require("../../assets/ava.png"),
                    attackAnimation: 0.2,
                    afterAnimation: 0,
                },
            ],
            enemyProgress: [
                {
                    img: require("../../assets/ccc.png"),
                    attackAnimation: 0.1,
                    afterAnimation: 1,
                },
                {
                    img: require("../../assets/ccc.png"),
                    attackAnimation: 0.1,
                    afterAnimation: 0.1,
                },
                {
                    img: require("../../assets/ccc.png"),
                    attackAnimation: 0.1,
                    afterAnimation: 0.1,
                },
                {
                    img: require("../../assets/ccc.png"),
                    attackAnimation: 0.1,
                    afterAnimation: 0.1,
                },
                {
                    img: require("../../assets/ccc.png"),
                    attackAnimation: 0.1,
                    afterAnimation: 0.1,
                },
                {
                    img: require("../../assets/ccc.png"),
                    attackAnimation: 0.1,
                    afterAnimation: 0.1,
                },
            ],
            skillPool: [
                {
                    img: require("../../assets/ava.png"),
                    attackAnimation: 0.2,
                    afterAnimation: 0,
                },
                {
                    img: require("../../assets/bbb.png"),
                    attackAnimation: 0.3,
                    afterAnimation: 0.1,
                },
            ],
        };
    },
    created() {
        document.querySelector("#loading").style.cssText = "display:none";
        // this.fightRun = setInterval(() => {
        //     ++this.runTime;
        // }, 100);
    },
    methods: {
        fight() {
            this.playerCurrentHp -= 100;
            this.playerCurrentMp -= 100;
            this.enemyCurrentHp -= 100;
            this.enemyCurrentMp -= 50;
            if (this.playerCurrentHp < -1) {
                this.playerCurrentHp = 1000;
                this.playerCurrentMp = 1000;
                this.enemyCurrentHp = 1000;
                this.enemyCurrentMp = 1000;
            }
        },
    },
};
</script>

<style lang="less">
@import "./test2.less";
</style>