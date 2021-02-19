<template>
    <div id="character">
        <div class="character" v-for="(item, index) in characterShadows" :key="index" :style="
                'animation-delay:' +
                (index * index) / 30 +
                's;opacity:' +
                (1 - index / 5) +
                ';z-index:' +
                (6 - index)
            ">
            <div class="legRightBehind" :style="'animation-delay:0.' + index + 's;'">
                <div class="legRightFront" :style="'animation-delay:0.' + index + 's;'"></div>
                <div class="legLeftBehind" :style="'animation-delay:0.' + index + 's;'">
                    <div class="legLeftFront" :style="'animation-delay:0.' + index + 's;'"></div>
                </div>
                <div class="bodyBottom" :style="'animation-delay:0.' + index + 's;'">
                    <div class="bodyTop" :style="'animation-delay:0.' + index + 's;'">
                        <div class="armRightBehind" :style="'animation-delay:0.' + index + 's;'">
                            <div class="armRightFront" :style="'animation-delay:0.' + index + 's;'"></div>
                        </div>
                        <div class="armLeftBehind" :style="'animation-delay:0.' + index + 's;'">
                            <div class="armLeftFront" :style="'animation-delay:0.' + index + 's;'"></div>
                        </div>
                        <div class="head" :style="'animation-delay:0.' + index + 's;'"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            characterShadows: [1, 2, 3, 4, 5],
        };
    },
};
</script>

<style lang="less" scoped>
@import "./character.less";
</style>