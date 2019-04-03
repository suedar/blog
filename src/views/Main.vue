<template>
  <section @wheel="mousemove" ref="container" class="container">
    <header id="header">
      <div class="name">
        sueder
      </div>
      <div class="motto">
        🍋 Welcome to my world! 🍋
      </div>
      <div class="bgIm">
        <img src="../assets/img/rick.svg" alt="">
      </div>
      <div class="menu" :class="{'shart-show': scrollMenu.isStart, 'on-show': scrollMenu.isRoll}">
        <div v-for="item in menu" :key="item.id">
          <font-awesome-icon :icon="item.icon"></font-awesome-icon>
          {{item.text}}
        </div>
      </div>
    </header>
    <div id="article" ref="article">
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
    <footer ref="footer">
      <div class="footer-container">
        <div class="account">
          @ 2019 | <font-awesome-icon icon="user"></font-awesome-icon> &nbsp;suedar
        </div>
        <div class="footer-icon">
          <a href="https://github.com/suedar" target="_blank">
            <img class="icon" src="../assets/img/github.svg" alt="">
            Github
          </a>
          <a href="mailto:690372513@qq.com" target="_blank">
            <font-awesome-icon class="mail" icon="envelope"></font-awesome-icon>
            邮件
          </a>
          <a @click="showDialog = true">
            <img class="icon" src="../assets/img/alipay.svg" alt="">
            赞赏
          </a>
        </div>
      </div>
    </footer>
    <alipay v-if="showDialog" v-model="showDialog"></alipay>
  </section>
</template>
<script>
import _ from 'underscore';

import { getBrief, getRecommand } from '@/api/';
import alipay from './alipay';

export default {
  components: {
    alipay
  },
  data() {
    return {
      // menu: ['主页', '目录', '前端在线资源', '关于'],
      menu: [{
          icon: 'home',
          text: '主页'
        }, {
          icon: 'align-left',
          text: '目录'
        }, {
          icon: 'link',
          text: '前端在线资源'
        }, {
          icon: 'paper-plane',
          text: '关于'
      }],
      article: [],
      scrollMenu: {
        isStart: false,
        isRoll: false
      },
      articleTop: 190,
      showDialog: false,
      recommand: [],
      staticFixedTop: 0,
      fixedTop: 'calc(4vh + 240px)'
      // fixedTop: '200px'
      // isFixMenu: false
    }
  },
  created() {
    this.initConfig();
  },
  mounted() {
    this.staticFixedTop = this.$refs.fixed.offsetTop;
  },
  methods: {
    async initConfig() {
      const article = await getBrief({pageNum: 0, pageSie: 10});
      const recommand = await getRecommand({pageNum: 0, pageSie: 10});
      this.article = article;
      this.recommand = recommand;
    },
    mousemove: _.debounce(function() {
      this.changeMenu();
      this.changeRecommand();
    }, 10),
    changeMenu() {
      // FIXME: 上滑时因为自动调整而bug问题
      const top = this.$refs.article.getBoundingClientRect().top;
      const articleTop = this.articleTop;
      const isRollDown = top - articleTop;
      // console.log(isRollDown);
      const isStart = top < 30 ? true : false;
      const isRoll = top < 30 && isRollDown <= 0 ? true : false;
      // console.log(top, isRoll)
      this.articleTop = top;
      this.scrollMenu.isStart = isStart;
      this.scrollMenu.isRoll = isRoll;
    },
    changeRecommand() {
      // 好复杂 设置内部滑动
      // 限制不能滑太高
      const refs = this.$refs;
      const fixedTop = this.staticFixedTop;

      const fixedHeight = refs.fixed.offsetHeight;
      const viewHeight = refs.container.clientHeight;
      const footerHeight = refs.footer.offsetHeight;
      const footToTop = refs.footer.getBoundingClientRect().top;

      const isTooHeight = fixedHeight + fixedTop + footerHeight + 50 > viewHeight;
      const isButtom = footToTop < viewHeight + 1500; // 这个数值可以随机

      const buttomHeight = viewHeight - (footerHeight + 50 + fixedHeight);
      const curTop = isTooHeight && isButtom ? `${buttomHeight}px` : 'calc(4vh + 240px)';
      this.fixedTop = curTop;
    }
  }
}
</script>

<style lang="scss">
  img {
    width: 20px;
    height: 20px;
  }
  .container {
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    #header {
      height: 190px;
      box-shadow: 0px 3px 3px .3px $lightGrey;
      background: linear-gradient(135deg, $orange 5%, $lightBlue 100%);
      color: $white;
      font-family: "Verdana, Arial, Helvetica, sans-serif;";
      position: relative;
      text-align: center;
      // scroll-snap-align: center;
      .name {
        font-size: 35px;
        padding: 30px 0 20px;
        font-weight: bold;
        font-family: 'Maven Pro', sans-serif;
        // font-family: 'Kaushan Script', cursive;
      }
      .motto {
        font-family: 'Gloria Hallelujah', cursive;
        padding-bottom: 8px;
      }
      .bgIm {
        position: absolute;
        right: 0px;
        bottom: 0px;
        @media screen and (max-width: 480px)  {
          display: none;
        }
        img {
          height: 160px;
          width: initial;
        }
      }
    }
    .menu {
      height: 6vh;
      line-height: 6vh;
      color: $blue;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 3;
      div {
        white-space:nowrap;
        margin: 0 20px;
        font-family: 'Noto Sans SC', sans-serif;
        cursor: pointer;
        position: relative;
        @media screen and (max-width: 480px)  {
          margin: 0 10px;
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 0%;
          background-color: $litterWhite;
          width: 100%;
          height: 1px;
          margin: 0 auto;
          transform: scale(0);
          transition: all .8s;
        }
        &:hover::after {
          transform: scale(1);
        }
      }
    }
    .shart-show {
      box-shadow: 0px 3px 3px .3px $lightGrey;
      background-color: rgba($color: $white, $alpha: .8);
      position: fixed;
      top: 0px;
      width: 100%;
      transition: all 1s;
      transform: translateY(-100%);
      div::after {
        background-color: $blue;
      }
    }
    .on-show {
      transform: translateY(0);
    }
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
        // scroll-snap-align: center;
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
    footer {
      height: 13vh;
      background-color: $greyWhite;
      color: $otherGrey;
      .footer-container {
        height: 100%;
        width: $width;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin: 0 auto;
        .footer-icon {
          a {
            color: $otherGrey;
            &:not(:last-of-type) {
              padding-right: 20px;
            }
            &:nth-of-type(2) {
              .mail {
                color: $orange;
              }
            }
          }
        }
      }
    }
  }
</style>
