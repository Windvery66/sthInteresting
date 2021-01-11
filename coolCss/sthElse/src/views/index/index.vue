<template>
  <div id="index">
    <showTitle title="松果痰抖五连鞭"/>
    <div class="index" style="height:100vh;overflow:hidden">
      <img src="@/assets/bg.jpeg" alt="" style="width:100%;height:100%">
    </div>
  </div>
</template>

<script>
import {showLoading} from "@/utils/loading.js";
import showTitle from "@/components/showTitle/showTitle.vue";
export default {
  data() {
    return {};
  },
  created() {

  },
  mounted() {
    showLoading()
  },
  computed: {
    
  },
  methods: {},
  components:{
    showTitle
  }
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