<template>
    <div id="uiMenu"></div>
</template>

<script>
import { dateWuXing } from "@/utils/dateWuXing.js";
export default {
    data() {
        return {
            dateInfos: {},
        };
    },
    created() {
        this.dateInfos = dateWuXing(new Date("1993-5-5 16:30").getTime())
        console.log(this.dateInfos)
    },
    computed:{

    }
};
</script>


<style lang="less" scoped>
@import "./uiMenu.less";
</style>