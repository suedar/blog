<template>
    <div :style="{background: bgColor}" @wheel="mousemove" id="model" ref="model">
      <div id="fixed-left">
        <slot name="header">&nbsp;</slot>
      </div>
      <div id="model-content">
        <slot name="content"></slot>
      </div>
      <div id="fixed-right">
        <template v-if="hasRight">
          <div  class="sum" ref="fixed" :style="{top: fixedTop}">
            <div class="tag" :style="{background: fixedColor}"></div>
            <h3 class="sum-header">
              <slot name="sum-header"></slot>
            </h3>
            <div class="sum-content">
              <slot name="sum-content"></slot>
            </div>
          </div>
        </template>
        <template v-else>

        </template>
      </div>
    </div>
</template>

<script>
import _ from 'underscore';

import { mapState } from 'vuex';

export default {
    props: {
      hasRight: Boolean,
      fixedColor: String,
      bgColor: String,
    },
    data() {
        return {
            fixedTop: 'calc(4vh + 240px)',
            calcHeight: {
              fixedTop: 0,
              fixedHeight: 0,
              articleHeight: 0,
              footerHeight: 0,
              viewHeight: 0
            }
        }
    },
    computed: {
      ...mapState([
        'footer'
      ])
    },
    updated() {
      if (!this.calcHeight.fixedTop && this.hasRight) {
        const ref = this.$refs;
        const calcHeight = {
          fixedTop: ref.fixed.offsetTop,
          fixedHeight: ref.fixed.clientHeight,
          modelHeight: ref.model.clientHeight,
          footerHeight: this.footer.height,
          viewHeight: window.innerHeight || document.documentElement.clientHeight,
        }
        this.calcHeight = calcHeight;
      }
    },
    methods: {
        changeRecommand() {
          // 好复杂 设置内部滑动
          // 限制不能滑太高
          // BUG: 浏览器先处理滑动 再处理位置移动 会造成卡顿
          const footToTop = this.footer.toTop;
          const {fixedTop, footerHeight, fixedHeight, modelHeight, viewHeight} = this.calcHeight;

          const isTooHeight = fixedHeight + fixedTop + footerHeight + 50 > viewHeight;
          const isButtom = footToTop < viewHeight + modelHeight / 2; // 这个数值可以随机
          const buttomHeight = viewHeight - (footerHeight + 50 + fixedHeight);
          const curTop = isTooHeight && isButtom ? `${buttomHeight}px` : 'calc(4vh + 240px)';
          this.fixedTop = curTop;
        },
        mousemove: _.debounce(function() {
          this.changeRecommand();
        }, 10),
    }
}
</script>

<style lang="scss" scoped>
#model {
  padding-top: 4vh;
  color: $grey;
  display: flex;
  justify-content: space-evenly;
  #fixed-left {
    flex: 1;
  }
  #model-content {
    flex: 3;
  }
  #fixed-right {
    flex: 1;
  }
  @media screen and (max-width: 800px) {
    #fixed-left {
      display: none;
    }
    #fixed-right {
      display: none;
    }
  }
  #fixed-right {
    .sum {
      width: 13vw;
      margin: 0 auto;
      top: calc(4vh + 240px);
      transition: all 1s; // this is not working
      position: sticky;
      padding: 15px;
      box-shadow: 0px 0px 3px .1px $lightGrey;
      --top-pos: calc(4vh + 240px);
      .change-top {
        animation: changePos 1s linear forwards;
      }
      @keyframes changePos {
        to {
          top: val(--top-pos);
        }
      }
      .tag {
        width: 10px;
        height: 45px;
        transform: rotate(145deg);
        // left: 20px;
        top: -25px;
        right: 50%;
        background-color: red;
        position: absolute;
      }
      .sum-header {
        border-bottom: 1px solid $grey;
        padding-bottom: 5px;
        margin-bottom: 5px;
      }
      .sum-content {
        display: flex;
        flex-direction: column;
        a {
          font-size: 14px;
          color: $otherGrey;
        }
        // a {
        //   color: $otherGrey;
        //   // height: 25px;
        //   // border-bottom: .7px solid $otherGrey;
        // }
      }
    }
  }
}
</style>
