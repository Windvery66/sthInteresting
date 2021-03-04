<template>
    <div id="uiMenu">
        <!-- 人物状态栏(左上角) -->
        <!-- 时间栏/当前环境加成(右上角,紧贴小地图下方) -->
        <div class="timeArea">
            <div class="timeAreaDate"><span class="numberText">{{nowYear}}</span>年<span class="numberText">{{nowMonth}}</span>月<span class="numberText">{{nowDate}}</span>日 {{dateInfos.ncWeek}}</div>
            <div class="timeAreaDateFestival" v-show="dateInfos.festival || dateInfos.lunarFestival || dateInfos.Term">{{dateInfos.festival || ''}} {{dateInfos.lunarFestival || ''}} {{dateInfos.Term || ''}}</div>
            <div class="timeAreaTime numberText">{{nowHour}}:{{nowMinute}}</div>
        </div>
        <!-- 收起展开按钮 -->
        <div class="showBtn" :class="showMore?'showMore':''" @click="showMore = !showMore">
            <p>></p>
        </div>
        <!-- 具体时间及加成信息(右侧弹层) -->
        <div class="timeMoreArea" :class="[showMore?'showMore':'',(dateInfos.festival || dateInfos.lunarFestival || dateInfos.Term)?'festival':'']">
            <!-- 内容 -->
            <div class="timeMoreAreaItem main">{{dateInfos.gzYear}}{{dateInfos.Animal}}年 {{dateInfos.IMonthCn}} {{dateInfos.IDayCn}} {{dateInfos.gzHour[1]}}时</div>
            <div class="timeMoreAreaItem gz">{{dateInfos.gzYear}} {{dateInfos.gzMonth}} {{dateInfos.gzDay}} {{dateInfos.gzHour}}</div>
            <div class="timeMoreAreaItem">
                <div class="wuxingIcon" v-for="(item,index) in dateInfos.wuxingStr.replace(/\s*/g,'')" :key="index">
                    <div :class="'char'+dateInfos.wuxingStr.replace(/\s*/g,'')[index].charCodeAt(0).toString(16)"></div>
                </div>
            </div>
            <div class="timeMoreAreaItem">
                <div class="wuxingIcon" v-for="(item,index) in dateInfos.yinyangStr.replace(/\s*/g,'')" :key="index">
                    <div :class="'char'+dateInfos.yinyangStr.replace(/\s*/g,'')[index].charCodeAt(0).toString(16)"></div>
                </div>
            </div>
            <div class="timeMoreAreaItem">{{dateInfos.wuxingTotal}} {{dateInfos.yinyangTotal}}</div>
            <div class="timeAreaEnv">
                <div class="timeAreaEnvItem numberText" :class="item.classname" v-for="(item,index) in wuxingArr" :key="index">
                    <div class="wuxingIcon">
                        <div :class="'char'+item.wuxing.charCodeAt(0).toString(16)"></div>
                    </div>:+{{(dateInfos.wuxingCounts[index].count)*10}}%
                </div>
                <div class="timeAreaEnvItem numberText yang">
                    <div class="wuxingIcon">
                        <div class="char9633"></div>
                    </div>
                    :+{{(dateInfos.yinyangCounts[0].count)*2.5}}%
                </div>
                <div class="timeAreaEnvItem numberText yin">
                    <div class="wuxingIcon">
                        <div class="char9634"></div>
                    </div>
                    :+{{(dateInfos.yinyangCounts[1].count)*2.5}}%
                </div>
            </div>
        </div>
        <!-- 回合(正上方) -->
        <!-- <div class="turnArea">
            {{turn}}
        </div> -->
        <!-- 操作栏(正下方) -->
    </div>
</template>

<script>
import { dateWuXing } from "@/utils/dateWuXing.js";
export default {
    data() {
        return {
            showMore: false, //展示更多
            dateInfos: {},
            clock: null,
            nowHour: "00",
            nowMinute: "00",
            nowYear: "0000",
            nowMonth: "00",
            nowDate: "00",
            wuxingArr: [
                { wuxing: "金", classname: "jin" },
                { wuxing: "木", classname: "mu" },
                { wuxing: "水", classname: "shui" },
                { wuxing: "火", classname: "huo" },
                { wuxing: "土", classname: "tu" },
            ],
        };
    },
    created() {
        this.getGZandWX();
        this.clock = setInterval(() => {
            this.getGZandWX();
        }, 10000);
    },
    beforeDestroy() {
        clearInterval(this.clock);
    },
    methods: {
        getGZandWX() {
            let nowTime = new Date();
            this.nowHour =
                nowTime.getHours().toString().length == 2
                    ? nowTime.getHours().toString()
                    : "0" + nowTime.getHours().toString();
            this.nowMinute =
                nowTime.getMinutes().toString().length == 2
                    ? nowTime.getMinutes().toString()
                    : "0" + nowTime.getMinutes().toString();
            this.nowYear = nowTime.getFullYear().toString();
            this.nowMonth =
                (nowTime.getMonth() + 1).toString().length == 2
                    ? (nowTime.getMonth() + 1).toString()
                    : "0" + (nowTime.getMonth() + 1).toString();
            this.nowDate =
                nowTime.getDate().toString().length == 2
                    ? nowTime.getDate().toString()
                    : "0" + nowTime.getDate().toString();
            this.dateInfos = dateWuXing(nowTime.getTime());
        },
    },
    computed: {},
};
</script>


<style lang="less" scoped>
@import "./uiMenu.less";
</style>