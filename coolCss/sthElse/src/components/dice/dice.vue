<template>
    <div id="dice">
        <div
            class="dice"
            :class="'dice_' + number"
            :style="
                rolling
                    ? 'transform: rotateX(' +
                      degX +
                      'deg) rotateY(' +
                      degY +
                      'deg) rotateZ(' +
                      degZ +
                      'deg)'
                    : ''
            "
        >
            <div class="diceFace"><p>1</p></div>
            <div class="diceFace"><p>2</p></div>
            <div class="diceFace"><p>3</p></div>
            <div class="diceFace"><p>4</p></div>
            <div class="diceFace"><p>5</p></div>
            <div class="diceFace"><p>6</p></div>
        </div>

        <div class="rollBtns">
            <div class="rollBtn" @click="reset">
              <p class="cnText">重置</p>
              <p class="enText">RESET</p>
            </div>
            <div class="rollBtn" @click="roll">
              <p class="cnText">掷</p>
              <p class="enText">THROW</p>
            </div>
            <div class="rollBtn" @click="rollingDone(null)">
              <p class="cnText">定</p>
              <p class="enText">STOP</p>
            </div>
        </div>
        <div class="rollBtnsNumber">
          <div class="rollBtn" @click="rollingDone(1)">1</div>
          <div class="rollBtn" @click="rollingDone(2)">2</div>
          <div class="rollBtn" @click="rollingDone(3)">3</div>
          <div class="rollBtn" @click="rollingDone(4)">4</div>
          <div class="rollBtn" @click="rollingDone(5)">5</div>
          <div class="rollBtn" @click="rollingDone(6)">6</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            number: 0,
            degX: 0,
            degY: 0,
            degZ: 0,
            rolling: null,
        };
    },
    methods: {
        roll() {
            clearInterval(this.rolling);
            var that = this;
            this.degX = 360;
            this.degY = 360;
            this.rolling = setInterval(() => {
                that.degX += 360;
                that.degY += 360;
            }, 300);
        },
        rollingDone(num) {
          if(this.rolling){
            clearInterval(this.rolling);
            this.rolling = null;
            this.number = num || Math.floor(Math.random() * 6 + 1);
            this.$emit("rollingDone",this.number)
            }
        },
        reset() {
            clearInterval(this.rolling);
            this.rolling = null;
            this.number = 0;
        },
    },
};
</script>

<style lang="less" scoped>
@import "./dice.less";
</style>