<template>
  <section @wheel="mousemove" class="container">
    <header id="header">
      <div class="name">
        sueder
      </div>
      <div class="motto">
        🍋 Welcome to my world! 🍋
      </div>
      <!-- <div class="bgIm">
        <img src="../assets/img/test.svg" alt="">
      </div> -->
      <div class="menu" :class="{'shart-show': scrollMenu.isStart, 'on-show': scrollMenu.isRoll}">
        <div v-for="item in menu" :key="item.id">
          <font-awesome-icon :icon="item.icon"></font-awesome-icon>
          {{item.text}}
        </div>
      </div>
    </header>
    <div id="article" ref="article">
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
    <footer>
      <div class="footer-container">
        <div class="account">
          @ &nbsp;2019&nbsp; |&nbsp; <font-awesome-icon icon="user"></font-awesome-icon> &nbsp;suedar
        </div>
        <div class="footer-icon">
          <a href="https://github.com/suedar">
            <font-awesome-icon icon="github"></font-awesome-icon>github
          </a>
          <a href="mailto:690372513@qq.com">
            <font-awesome-icon icon="mailbox"></font-awesome-icon>邮件
          </a>
          <a href="mailto:690372513@qq.com">
            <font-awesome-icon icon="alipay"></font-awesome-icon>邮件
          </a>
        </div>
      </div>
    </footer>
    <!-- <alipay></alipay> -->
  </section>
</template>
<script>
import _ from 'underscore';

import { getBrief } from '@/api/';
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
      articleTop: 190
      // isFixMenu: false
    }
  },
  created() {
    this.initConfig();
  },
  methods: {
    async initConfig() {
      const article = await getBrief({pageNum: 0, pageSie: 10});
      this.article = article;
    },
    mousemove: _.debounce(function() {
      // FIXME: 上滑时因为自动调整而bug问题
      const top = this.$refs.article.getBoundingClientRect().top;
      const articleTop = this.articleTop;
      const isRollDown = top - articleTop;
      // console.log(isRollDown);
      const isStart = top < 30 ? true : false;
      const isRoll = top < 30 && isRollDown < 0 ? true : false;
      // console.log(top, isRoll)
      this.articleTop = top;
      this.scrollMenu.isStart = isStart;
      this.scrollMenu.isRoll = isRoll;
    }, 10)
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
      text-align: center;
      scroll-snap-align: center;
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
    }
    .menu {
      height: 6vh;
      line-height: 6vh;
      color: $blue;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        margin: 0 20px;
        font-family: 'Noto Sans SC', sans-serif;
        cursor: pointer;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: 10px;
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
      background-color: rgba($color: $white, $alpha: .7);
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
      width: $width;
      margin: 0 auto;
      color: $grey;
      .content {
        padding: 30px;
        margin: 50px 0;
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
    }
    footer {
      height: 15vh;
      background-color: $greyWhite;
      .footer-container {
        width: $width;
        margin: 0 auto;
        .account {
          // padding
        }
      }
    }
  }
</style>
