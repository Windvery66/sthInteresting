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
        this.dateInfos = dateWuXing(new Date().getTime())
        console.log(this.dateInfos)
    },
    computed:{

    }
};
</script>


<style lang="less" scoped>
@import "./uiMenu.less";
</style>