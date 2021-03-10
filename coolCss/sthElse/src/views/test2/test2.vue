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
                  <div class="mpValue">MP:{{playerCurrentMp}}</div>
                  <div class="hpValue">HP:{{playerCurrentHp}}</div>
                </div>
            </div>
            <!-- 主要部分(双方人物,战斗动画) -->
            <div class="battleAreaMain"></div>
            <!-- 进度条(速度条) -->
            <div class="progressBar"></div>
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
            playerCurrentHp: 1000,
            playerMaxHp: 1000,
            playerCurrentMp: 1000,
            playerMaxMp: 1000,
            enemyCurrentHp: 1000,
            enemyMaxHp: 1000,
            enemyCurrentMp: 1000,
            enemyMaxMp: 1000,
        };
    },
    created() {
        document.querySelector("#loading").style.cssText = "display:none";
    },
    methods: {
        fight() {
            this.playerCurrentHp -= 100;
            this.playerCurrentMp -= 100;
            this.enemyCurrentHp -= 100;
            this.enemyCurrentMp -= 50;
            if (this.playerCurrentHp < 100) {
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