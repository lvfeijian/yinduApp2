<template>
  <div class="game-box">
    <div class="frulit-box">
      <div class="slot" v-for="(slot, index) in slots" ref="slots" :key="index">
        <div v-for="item in slot.items" class="slot__item">
          {{item}}
        </div>
        <!-- <img v-for="(opt, subindex) in slot.items" :key="opt + subindex" :src="opt" /> -->
      </div>
    </div>
    <div class="start-btn" @click="start">kaishi</div>
  </div>
</template>
<script>
  const next =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (cb) {
      window.setTimeout(cb, 10000 / 60);
    };
  export default {
    data() {
      return {
        slots: [
          {
            title: "When",
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
          {
            title: "Where",
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
          {
            title: "How",
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          }
        ],
        opts: null,
        startedAt: null,
        fontSize: null,
      };

    },

    mounted() {

      

    },

    methods: {

      

      

    },

  };

</script>



<style lang="less" scoped>
  .game-box {
    width: 100vw;
    height: 425px;
    background: url('../../assets/img/taskEnter/background.png') 100% 100% no-repeat;
    background-size: cover;
    overflow: hidden;
    position: relative;

    .frulit-box {
      width: 230px;
      height: 100px;
      position: absolute;
      top: 132px;
      left: 66px;
      display: flex;
      overflow: hidden;

      .slot {
        width: 76px;
        height: 100px;
        position: relative;

        .slot__item {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }

    .start-btn {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FF7219;
      text-shadow: 0px 1px 1px rgba(255, 114, 25, 0.59);
      margin-top: 307px;
      margin-left: 164px;
      position: absolute;
      width: 60px;
      height: 60px;
    }
  }

</style>
