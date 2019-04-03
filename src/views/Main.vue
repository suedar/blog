<template>
  <section @scroll="mousemove" ref="container" class="container">
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
    <router-view></router-view>
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
import {mapMutations} from 'vuex';

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
          text: '主页',
          path: ''
        }, {
          icon: 'align-left',
          text: '目录',
          path: 'menu'
        }, {
          icon: 'link',
          text: '前端在线资源',
          path: 'link'
        }, {
          icon: 'paper-plane',
          text: '关于',
          path: 'about'
      }],
      scrollMenu: {
        isStart: false,
        isRoll: false
      },
      showDialog: false,
      // footer
      // footer: {
      //   height: 0,
      //   toTop: 0
      // }      
      // fixedTop: '200px'
      // isFixMenu: false
    }
  },
  mounted() {
    const footerHeight = this.$refs.footer.offsetHeight;
    this.CHANGE_FOOTER_HEIGHT(footerHeight);
  },
  methods: {
    ...mapMutations([
      'CHANGE_FOOTER_HEIGHT',
      'CHANGE_FOOTER_TO_TOP'
    ]),
    mousemove: _.debounce(function() {
      this.changeMenu();
      this.getFooterToTop();
      // this.changeRecommand();
    }, 10),
    getFooterToTop() {
      const footerToTop = this.$refs.footer.getBoundingClientRect().top;
      this.CHANGE_FOOTER_TO_TOP(footerToTop);
    },
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
