<template>
    <div id="skillTetris">
        <div class="tetrisArea">
            <div class="tetrisBgRows" v-for="(item,index) in tetrisData" :key="index">
                <div class="tetrisBgItem" :class="item2?wuxingArr[item2-1]:''" v-for="(item2,index2) in item" :key="index2"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            blockType: 0, //方块类型,每种形状对应五行阴阳中的一种(index+1)
            blockRotate: 0, //方块旋转,共4种形状
            blockRight: 0, //方块右偏移量
            blockDown: 0, //方块下偏移量
            activeBlock: [],
            wuxingArr: ["jin", "mu", "shui", "huo", "tu", "yin", "yang"],
            //实时方块区域
            tetrisData: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            //上一帧方块区域
            tetrisDataBefore: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            tetrisBlockData: [
                [
                    //口口口口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 2, y: 0 },
                        { x: 3, y: 0 },
                    ],
                    //口
                    //口
                    //口
                    //口
                    [
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: 0, y: 2 },
                        { x: 0, y: 3 },
                    ],
                    //口口口口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 2, y: 0 },
                        { x: 3, y: 0 },
                    ],
                    //口
                    //口
                    //口
                    //口
                    [
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: 0, y: 2 },
                        { x: 0, y: 3 },
                    ],
                ],
                [
                    //口
                    //口口口
                    [
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                        { x: 2, y: 1 },
                    ],
                    //口口
                    //口
                    //口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 0, y: 1 },
                        { x: 0, y: 2 },
                    ],
                    //口口口
                    //    口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 2, y: 0 },
                        { x: 2, y: 1 },
                    ],
                    //  口
                    //  口
                    //口口
                    [
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 1, y: 2 },
                        { x: 0, y: 2 },
                    ],
                ],
                [
                    //    口
                    //口口口
                    [
                        { x: 2, y: 0 },
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                        { x: 2, y: 1 },
                    ],
                    //口
                    //口
                    //口口
                    [
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: 0, y: 2 },
                        { x: 1, y: 2 },
                    ],
                    //口口口
                    //口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 2, y: 0 },
                        { x: 0, y: 1 },
                    ],
                    //口口
                    //  口
                    //  口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 1, y: 2 },
                    ],
                ],
                [
                    //口口
                    //口口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 0, y: 1 },
                    ],
                    //口口
                    //口口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 0, y: 1 },
                    ],
                    //口口
                    //口口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 0, y: 1 },
                    ],
                    //口口
                    //口口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 0, y: 1 },
                    ],
                ],
                [
                    //  口口
                    //口口
                    [
                        { x: 1, y: 0 },
                        { x: 2, y: 0 },
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                    ],
                    //口
                    //口口
                    //  口
                    [
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                        { x: 1, y: 2 },
                    ], //  口口
                    //口口
                    [
                        { x: 1, y: 0 },
                        { x: 2, y: 0 },
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                    ],
                    //口
                    //口口
                    //  口
                    [
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                        { x: 1, y: 2 },
                    ],
                ],
                [
                    //口口
                    //  口口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 2, y: 1 },
                    ],
                    //  口
                    //口口
                    //口
                    [
                        { x: 1, y: 0 },
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                        { x: 0, y: 2 },
                    ], //口口
                    //  口口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 2, y: 1 },
                    ],
                    //  口
                    //口口
                    //口
                    [
                        { x: 1, y: 0 },
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                        { x: 0, y: 2 },
                    ],
                ],
                [
                    //  口
                    //口口口
                    [
                        { x: 1, y: 0 },
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                        { x: 2, y: 1 },
                    ],
                    //口
                    //口口
                    //口
                    [
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: 0, y: 2 },
                        { x: 1, y: 1 },
                    ],
                    //口口口
                    //  口
                    [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 2, y: 0 },
                        { x: 1, y: 1 },
                    ],
                    //  口
                    //口口
                    //  口
                    [
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 1, y: 2 },
                        { x: 0, y: 1 },
                    ],
                ],
            ],
        };
    },
    created() {
        this.blockCreate();
        this.blockShow();
    },
    mounted() {
        document.addEventListener("keydown", this.blockMove);
    },
    methods: {
        //创造方块
        blockCreate() {
            this.blockType = Math.ceil(Math.random() * 7);
            this.activeBlock = JSON.parse(
                JSON.stringify(
                    this.tetrisBlockData[this.blockType - 1][this.blockRotate]
                )
            );
        },
        //移动方块
        blockMove(e) {
            switch (e.code) {
                case "ArrowLeft":
                    --this.blockRight;
                    break;
                case "ArrowRight":
                    ++this.blockRight;
                    break;
                case "ArrowDown":
                    ++this.blockDown;
                    break;
                case "ArrowUp":
                    if (this.blockRotate == 3) {
                        this.blockRotate = 0;
                    } else {
                        ++this.blockRotate;
                    }
                    break;
            }
            this.blockShow(e.code);
        },
        //渲染方块
        blockShow(code) {
          let crashFlag = false;//触碰flag
            this.tetrisData = JSON.parse(JSON.stringify(this.tetrisDataBefore));
            this.tetrisData.splice(0, 0);
            this.activeBlock.forEach((item, index) => {
                item.x = this.tetrisBlockData[this.blockType - 1][
                    this.blockRotate
                ][index].x;
                item.y = this.tetrisBlockData[this.blockType - 1][
                    this.blockRotate
                ][index].y;
                //边界
                if (item.y + this.blockDown >= 20) {
                    --this.blockDown;
                    crashFlag = true;
                }
                if (item.x + this.blockRight >= 10) {
                    --this.blockRight;
                } else if (item.x + this.blockRight < 0) {
                    ++this.blockRight;
                }
                //碰撞
                if(this.tetrisDataBefore[item.y + this.blockDown][item.x + this.blockRight]){
                  if(code == "ArrowRight"){
                    --this.blockRight;
                  }else if(code == "ArrowLeft"){
                    ++this.blockRight;
                  }else{
                    --this.blockDown;
                  }
                    crashFlag = true;
                }
            });
            //渲染
            this.activeBlock.forEach((item) => {
                this.tetrisData[item.y + this.blockDown][
                    item.x + this.blockRight
                ] = this.blockType;
            });
            //碰撞结束
            if(crashFlag){
              this.tetrisDataBefore = JSON.parse(JSON.stringify(this.tetrisData));
              this.blockRight = 0;
              this.blockDown = 0;
              this.blockCreate();
            }
        },
    },
};
</script>

<style lang="less">
@import "./skillTetris.less";
</style>