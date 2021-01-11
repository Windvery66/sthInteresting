<template>
  <div class="mask">
    <div
      class="titleOuter"
      :style="
        'animation-duration:0.5s;animation-delay:' + (title.length+2) / 2 + 's'
      "
    >
      <div
        class="title"
        v-for="(item, index) in title"
        :key="index"
        :style="
          'animation-duration:0.3s;animation-delay:' + (index+2) / 2  + 's'
        "
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import "./showTitle.less";
</style>