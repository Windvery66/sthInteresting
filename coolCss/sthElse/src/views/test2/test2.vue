<template>
    <div id="test2" @contextmenu.prevent="clearTargetSkill">
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
                    <div class="progressBarBg">
                        <!-- 当前正在进行的技能弹出提示 -->
                        <div class="progressBarItemCurrent" v-if="playerCurrent">
                            <img :src="playerCurrent.img" alt="">
                        </div>
                    </div>
                    <div class="innerProgressBar">
                        <div class="progressBarItems" :style="'width:calc(100% + '+(playerRunTime/10)+'rem);transition: all '+ playerSpeedCoefficient/10 +'s linear;'">
                            <div class="progressBarItem" v-for="(item,index) in playerProgress" :key="index" @click="putSkill(index)">
                                <div class="afterAnimation" v-show="item.afterAnimation" :style="'width:'+item.afterAnimation+'rem'"></div>
                                <img :src="item.img" alt="">
                                <div class="attackAnimation" v-show="item.attackAnimation" :style="'width:'+item.attackAnimation+'rem'"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 敌方进度条 -->
                <div class="progressBar enemy">
                    <div class="progressBarBg">
                        <!-- 当前正在进行的技能弹出提示 -->
                        <div class="progressBarItemCurrent" v-if="enemyCurrent">
                            <img :src="enemyCurrent.img" alt="">
                        </div>
                    </div>
                    <div class="innerProgressBar">
                        <div class="progressBarItems" :style="'width:calc(100% + '+(enemyRunTime/10)+'rem);transition: all '+ enemySpeedCoefficient/10 +'s linear;'">
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
            <div class="skillPool">
                <div class="skillPoolItem" v-for="(item,index) in skillPool" :key="index" @click="pickSkill(item,$event)">
                    <img :src="item.img" alt="">
                </div>
            </div>

            <button @click="changeSpeed(null)">暂停</button>
            <button @click="changeSpeed(1)">x1</button>
            <button @click="changeSpeed(2)">x2</button>
            <!-- 眩晕机制:每个眩晕独立计算时长,不叠加,当全局没有眩晕时长时结束眩晕,否则一直眩晕 -->
            <button v-show="wholeSpeedCoefficient" @click="dizz('enemy',5)">眩晕敌方5s</button>
            <button v-show="wholeSpeedCoefficient" @click="dizz('enemy',1)">眩晕敌方1s</button>
            <button v-show="wholeSpeedCoefficient" @click="speedCut('enemy',50)">减速敌方50%</button>
            <button v-show="wholeSpeedCoefficient" @click="speedCut('enemy',0)">恢复敌方速度</button>

        </div>

        <!-- 手持的技能 -->
        <div class="targetSkill" ref="targetSkill" v-if="targetSkill">
            <img :src="targetSkill.img" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dizzTime: 0, //眩晕时长(秒)
            playerRunTime: 0, //我方帧数(每帧=0.1rem)
            enemyRunTime: 0, //敌方帧数(每帧=0.1rem)
            playerFightRun: null, //我方时间循环函数
            enemyFightRun: null, //敌方时间循环函数
            playerSpeed: 100, //我方每帧间隔(毫秒)
            enemySpeed: 100, //敌方每帧间隔(毫秒)
            wholeSpeedCoefficient: 1, //全局速度系数(最小为1)
            playerSpeedCoefficient: 1, //我方速度系数
            enemySpeedCoefficient: 1, //敌方速度系数
            targetSkill: null, //手持的技能
            playerCurrentHp: 1000,
            playerMaxHp: 1000,
            playerCurrentMp: 1000,
            playerMaxMp: 1000,
            enemyCurrentHp: 1000,
            enemyMaxHp: 1000,
            enemyCurrentMp: 1000,
            enemyMaxMp: 1000,
            playerProgressIndex: 0,
            playerProgressLength: 0,
            playerCurrentProgressLength: 0,
            playerCurrent: null,
            playerProgress: [
                {
                    img: require("../../assets/ava.png"),
                    attackAnimation: 2,
                    afterAnimation: 0.1,
                },
                {
                    img: require("../../assets/bbb.png"),
                    attackAnimation: 0.3,
                    afterAnimation: 0.1,
                },
                {
                    img: require("../../assets/ava.png"),
                    attackAnimation: 0.1,
                    afterAnimation: 0.1,
                },
            ],
            skillPool: [
                {
                    img: require("../../assets/ava.png"),
                    attackAnimation: 0.1,
                    afterAnimation: 0.2,
                    damage: [1],
                },
                {
                    img: require("../../assets/bbb.png"),
                    attackAnimation: 0.3,
                    afterAnimation: 0.1,
                    damage: [0.2, 0.3, 0.75],
                },
            ], //所有技能前摇和后摇都至少为0.1s,不然会造成动画不消失的bug(因为每0.1s计算一帧)
            enemyProgressIndex: 0,
            enemyProgressLength: 0,
            enemyCurrentProgressLength: 0,
            enemyCurrent: null,
            enemyProgress: [
                {
                    img: require("../../assets/ccc.png"),
                    attackAnimation: 0.1,
                    afterAnimation: 0.5,
                },
            ],
            enemySkillPool: [
                {
                    img: require("../../assets/ccc.png"),
                    attackAnimation: 0.2,
                    afterAnimation: 0.1,
                },
            ],
        };
    },
    created() {
        document.querySelector("#loading").style.cssText = "display:none";
    },
    mounted() {
        this.playerProgress.forEach((item) => {
            this.playerProgressLength +=
                item.attackAnimation + item.afterAnimation + 0.5;
        });
        this.enemyProgress.forEach((item) => {
            this.enemyProgressLength +=
                item.attackAnimation + item.afterAnimation + 0.5;
        });
        this.enemyCurrentProgressLength += this.enemyProgress[0].attackAnimation;
        this.playerCurrentProgressLength += this.playerProgress[0].attackAnimation;
        this.playerFightRun = setInterval(() => {
            ++this.playerRunTime;
        }, this.playerSpeed * this.playerSpeedCoefficient * this.wholeSpeedCoefficient);
        this.enemyFightRun = setInterval(() => {
            ++this.enemyRunTime;
        }, this.enemySpeed * this.enemySpeedCoefficient * this.wholeSpeedCoefficient);
    },
    watch: {
        //我方进度条运行中
        playerRunTime(val) {
            // 我方自动补技能
            if (this.playerProgressLength * 10 < 80) {
                let autoPut = JSON.parse(
                    JSON.stringify(
                        this.skillPool[
                            Math.floor(Math.random() * this.skillPool.length)
                        ]
                    )
                );
                this.playerProgress.push(autoPut);
                this.playerProgressLength +=
                    autoPut.attackAnimation + autoPut.afterAnimation + 0.5;
            } else if (val > this.playerProgressLength * 10 - 80) {
                this.playerProgress.push(
                    JSON.parse(
                        JSON.stringify(
                            this.skillPool[
                                Math.floor(
                                    Math.random() * this.skillPool.length
                                )
                            ]
                        )
                    )
                );
                this.playerProgressLength +=
                    this.playerProgress[this.playerProgressIndex]
                        .attackAnimation +
                    this.playerProgress[this.playerProgressIndex]
                        .afterAnimation +
                    0.5;
            }

            //我方当前技能显示
            if (val >= Math.round(this.playerCurrentProgressLength * 10)) {
                if (
                    val >=
                    Math.round(this.playerCurrentProgressLength * 10) + 5
                ) {
                    this.playerCurrent = null;
                    this.playerCurrentProgressLength +=
                        this.playerProgress[this.playerProgressIndex + 1]
                            .attackAnimation +
                        this.playerProgress[this.playerProgressIndex]
                            .afterAnimation +
                        0.5;
                    this.playerProgressIndex++;
                } else if (this.playerCurrent == null) {
                    this.playerCurrent = JSON.parse(
                        JSON.stringify(
                            this.playerProgress[this.playerProgressIndex]
                        )
                    );
                    //进行战斗计算
                    this.fight("player", this.playerCurrent);
                }
            }
        },
        //敌方进度条运行中
        enemyRunTime(val) {
            // 敌方自动补技能
            if (this.enemyProgressLength * 10 < 80) {
                let autoPutEnemy = JSON.parse(
                    JSON.stringify(
                        this.enemySkillPool[
                            Math.floor(
                                Math.random() * this.enemySkillPool.length
                            )
                        ]
                    )
                );
                this.enemyProgress.push(autoPutEnemy);
                this.enemyProgressLength +=
                    autoPutEnemy.attackAnimation +
                    autoPutEnemy.afterAnimation +
                    0.5;
            } else if (val > this.enemyProgressLength * 10 - 80) {
                this.enemyProgress.push(
                    JSON.parse(
                        JSON.stringify(
                            this.enemySkillPool[
                                Math.floor(
                                    Math.random() * this.enemySkillPool.length
                                )
                            ]
                        )
                    )
                );
                this.enemyProgressLength +=
                    this.enemyProgress[this.enemyProgressIndex]
                        .attackAnimation +
                    this.enemyProgress[this.enemyProgressIndex].afterAnimation +
                    0.5;
            }

            //敌方当前技能显示
            if (val >= Math.round(this.enemyCurrentProgressLength * 10)) {
                if (
                    val >=
                    Math.round(this.enemyCurrentProgressLength * 10) + 5
                ) {
                    this.enemyCurrent = null;
                    this.enemyCurrentProgressLength +=
                        this.enemyProgress[this.enemyProgressIndex + 1]
                            .attackAnimation +
                        this.enemyProgress[this.enemyProgressIndex]
                            .afterAnimation +
                        0.5;
                    this.enemyProgressIndex++;
                } else if (this.enemyCurrent == null) {
                    this.enemyCurrent = JSON.parse(
                        JSON.stringify(
                            this.enemyProgress[this.enemyProgressIndex]
                        )
                    );
                    //进行战斗计算
                    this.fight("enemy", this.enemyCurrent);
                }
            }
        },
    },
    methods: {
        // 调整速度
        changeSpeed(speed) {
            clearInterval(this.playerFightRun);
            clearInterval(this.enemyFightRun);
            this.wholeSpeedCoefficient = null;
            if (speed) {
                this.wholeSpeedCoefficient = 1 / speed;
                this.playerFightRun = setInterval(() => {
                    ++this.playerRunTime;
                }, this.playerSpeed * this.playerSpeedCoefficient * this.wholeSpeedCoefficient);
                this.enemyFightRun = setInterval(() => {
                    ++this.enemyRunTime;
                }, this.enemySpeed * this.enemySpeedCoefficient * this.wholeSpeedCoefficient);
            }
        },
        //眩晕
        //params:敌/我,眩晕时长(s)
        dizz(identity, time) {
            var that = this;
            this.dizzTime += time;
            if (identity == "enemy") {
                clearInterval(this.enemyFightRun);
                setTimeout(() => {
                    that.dizzTime -= time;
                    if (that.dizzTime == 0) {
                        that.enemyFightRun = setInterval(() => {
                            ++that.enemyRunTime;
                        }, that.enemySpeed * that.enemySpeedCoefficient * that.wholeSpeedCoefficient);
                    }
                }, time * that.wholeSpeedCoefficient * 1000);
            } else {
                clearInterval(this.playerFightRun);
                setTimeout(() => {
                    that.dizzTime -= time;
                    if (that.dizzTime == 0) {
                        that.playerFightRun = setInterval(() => {
                            ++that.playerRunTime;
                        }, that.playerSpeed * that.playerSpeedCoefficient * that.wholeSpeedCoefficient);
                    }
                }, time * that.wholeSpeedCoefficient * 1000);
            }
        },
        //减速
        //params:敌/我,减速幅度(百分比,负数即为加速,0为恢复)
        //减速不叠加,以最后施加的减速为准
        speedCut(identity, percent) {
            if (identity == "enemy") {
                clearInterval(this.enemyFightRun);
                this.enemySpeedCoefficient = percent
                    ? 1 / (1 - percent / 100)
                    : 1;
                this.enemyFightRun = setInterval(() => {
                    ++this.enemyRunTime;
                }, this.enemySpeed * this.enemySpeedCoefficient * this.wholeSpeedCoefficient);
            } else {
                clearInterval(this.playerFightRun);
                this.playerSpeedCoefficient = percent
                    ? 1 / (1 - percent / 100)
                    : 1;
                this.playerFightRun = setInterval(() => {
                    ++this.playerRunTime;
                }, this.playerSpeed * this.playerSpeedCoefficient * this.wholeSpeedCoefficient);
            }
        },
        // 从技能池拿起技能
        pickSkill(item, $event) {
            this.targetSkill = JSON.parse(JSON.stringify(item));
            this.$nextTick(() => {
                this.$refs.targetSkill.style.cssText =
                    "top:calc(" +
                    $event.clientY +
                    "px - 0.5rem);left:calc(" +
                    $event.clientX +
                    "px - 0.5rem);";
            });
            document.onmousemove = (e) => {
                this.$refs.targetSkill.style.cssText =
                    "top:calc(" +
                    e.clientY +
                    "px - 0.5rem);left:calc(" +
                    e.clientX +
                    "px - 0.5rem);";
            };
        },
        // 把技能放到进度条上
        putSkill(index) {
            if (this.targetSkill) {
                this.playerProgress.splice(
                    index + 1,
                    0,
                    JSON.parse(JSON.stringify(this.targetSkill))
                );
                this.playerProgressLength +=
                    this.targetSkill.attackAnimation +
                    this.targetSkill.afterAnimation +
                    0.5;
                this.targetSkill = null;
                document.onmousemove = null;
            }
        },
        //拿着技能时,点击鼠标右键清除当前选中技能(全局)
        clearTargetSkill() {
            this.targetSkill = null;
            document.onmousemove = null;
        },
        //战斗
        fight(identity, skill) {
            if (identity == "player") {
                console.log(skill);
            }
        },
    },
};
</script>

<style lang="less">
@import "./test2.less";
</style>