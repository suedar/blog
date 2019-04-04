<template>
    <div @wheel="mousemove" id="article" ref="article">
      <div id="fixed-left">
        &nbsp;
      </div>
      <div id="article-content">
        <div class="content" v-for="item in article" :key="item.id" :title="item.title">
          <h2>{{item.title}}</h2>
          <div class="tip">
            <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
            Posted on {{item.createTime}}
            <span class="line">|</span>
            热度: {{item.temperature}}℃
            <span class="line">|</span>
            字数统计: {{item.count}} 字
            <span class="line">|</span>
            阅读时长: {{item.readTime}} 分钟
          </div>
          <div class="label">
            <span class="line">|</span>
            标签: {{item.label.join('、')}}
          </div>
          <div class="brief">
            {{item.content}}
          </div>
          <div class="read-more">
            <a>
              Read more »
            </a>
          </div>
        </div>
      </div>
      <div id="fixed-right">
        <div class="recommand" ref="fixed" :style="{top: fixedTop}">
          <h3 class="recommand-header">推荐</h3>
          <div class="recommand-content">
            <a v-for="item in recommand" :key="item.id" :href="item.link" target="_blank">
              {{item.text}}
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import _ from 'underscore';

import { getBrief, getRecommand } from '@/api/';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            article: [],
            staticFixedTop: 0,
            fixedTop: 'calc(4vh + 240px)',
            recommand: [],
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
      ]),
      displayLabel(arr) {
        
      }
    },
    created() {
      this.initConfig();
    },
    updated() {
      if (!this.calcHeight.fixedTop) {
        const ref = this.$refs;
        const calcHeight = {
          fixedTop: ref.fixed.offsetTop,
          fixedHeight: ref.fixed.clientHeight,
          articleHeight: ref.article.clientHeight,
          footerHeight: this.footer.height,
          viewHeight: window.innerHeight || document.documentElement.clientHeight,
        }
        this.calcHeight = calcHeight;
      }
    },
    methods: {
        async initConfig() {
          const article = await getBrief({pageNum: 0, pageSie: 10});
          const recommand = await getRecommand({pageNum: 0, pageSie: 10});
          this.article = article;
          this.recommand = recommand;
        },
        changeRecommand() {
          // 好复杂 设置内部滑动
          // 限制不能滑太高
          const footToTop = this.footer.toTop;

          const {fixedTop, footerHeight, fixedHeight, articleHeight, viewHeight} = this.calcHeight;

          const isTooHeight = fixedHeight + fixedTop + footerHeight + 50 > viewHeight;
          const isButtom = footToTop < viewHeight + articleHeight / 2; // 这个数值可以随机
          // console.log(fixedHeight, fixedTop, footerHeight, viewHeight)
          // console.log(isTooHeight, isButtom);

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
#article {
  padding-top: 4vh;
  // width: $width;
  // margin: 0 auto;
  color: $grey;
  display: flex;
  justify-content: space-evenly;
  // position: relative;
  #fixed-left {
    flex: 1;
  }
  #article-content {
    flex: 3;
  }
  #fixed-right {
    flex: 1;
  }
  .content {
    padding: 30px;
    margin: 50px 0;
    @media screen and (max-width: 480px)  {
      margin: 10px 0;
    }
    cursor: pointer;
    scroll-snap-align: center;
    &:hover {
      box-shadow: 1px 2px 5px .4px $orange;
      .read-more a {
        color: $anotherGrey;
      }
    }
    h2 {
      // font-family: 'ZCOOL XiaoWei', serif;
      // font-family: 'ZCOOL KuaiLe', cursive;
      font-family: 'Noto Serif SC', serif;
      margin: 6px 0;
      color: $anotherGrey;
    }
    .tip {
      font-family: 'Noto Sans SC', sans-serif;
      margin: 10px 0;
      font-size: 10px;
      color: $lightGrey;
      .line {
        margin: 0 5px;
      }
    }
    .label {
      .line {
        color: $orange;
      }
    }
    .brief {
      line-height: 25px;
      margin: 10px 0 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .read-more {
      a {
        color: $otherGrey;
        height: 25px;
        border-bottom: .7px solid $otherGrey;
      }
    }
  }
  #fixed-right {
    .recommand {
      width: 13vw;
      margin: 0 auto;
      // top: 
      top: calc(4vh + 240px);
      transition: top 1s;
      // top: calc(4vh + 240px);
      // right: 4vw;
      // top: calc(4vh + 50px);
      // right: calc(-15vw - 3vw);
      // position: absolute;
      position: sticky;
      padding: 15px;
      // border-top: 1px solid $blue;
      box-shadow: 0px 0px 3px .1px $blue;
      .recommand-header {
        border-bottom: 1px solid $grey;
        padding-bottom: 5px;
        margin-bottom: 5px;
      }
      .recommand-content {
        display: flex;
        flex-direction: column;
      }
      a {
        padding: 5px 0;
        display: inline;
        // width: 100%;
      }
    }
  }
}
</style>
