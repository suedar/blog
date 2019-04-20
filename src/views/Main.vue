<template>
  <section @scroll="mousemove" ref="container" class="container">
    <header ref="header" class="main-header" :class="{read: isReading}">
      <div class="name">
        suedar
      </div>
      <div class="motto">
        🍋 Welcome to my world! 🍋
      </div>
      <div class="bgIm">
        <img src="../assets/img/rick.svg" alt="">
      </div>
      <div
        class="menu"
        :class="{'shart-show': scrollMenu.isStart, 'on-show': scrollMenu.isRoll}"
        @click="changeContent">
        <div v-for="item in menu" :key="item.id" :data-path="item.path">
          <font-awesome-icon :icon="item.icon"></font-awesome-icon>
          {{item.text}}
        </div>
      </div>
    </header>
    <keep-alive exclude="read">
      <component :is="content"></component>
    </keep-alive>
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
import Main from './content/Main';
import Menu from './menu/Menu';
import Label from './label/Label';
import Link from './link/Link';
import About from './about/About';
import Read from './read/Read';

export default {
  components: {
    alipay
  },
  data() {
    return {
      menu: [{
          icon: 'home',
          text: '主页',
          path: ''
        }, {
          icon: 'align-left',
          text: '目录',
          path: 'menu'
        }, {
          icon: 'tags',
          text: '标签',
          path: 'label'
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
      headerTop: 0,
      content: Main,
      isReading: false
    }
  },
  mounted() {
    const footerHeight = this.$refs.footer.offsetHeight;
    this.CHANGE_FOOTER_HEIGHT(footerHeight);
  },
  created() {
    this.changeComponents();
    this.readAnimation(this.$route.name);
  },
  methods: {
    ...mapMutations([
      'CHANGE_FOOTER_HEIGHT',
      'CHANGE_FOOTER_TO_TOP'
    ]),
    mousemove: _.debounce(function() {
      if (this.$route.name !== 'read') {
        this.changeMenu();
      }
      this.getFooterToTop();
    }, 10),
    getFooterToTop() {
      const footerToTop = this.$refs.footer.getBoundingClientRect().top;
      this.CHANGE_FOOTER_TO_TOP(footerToTop);
    },
    changeMenu() {
      // FIXME: 上滑时因为自动调整而bug问题
      const top = this.$refs.header.getBoundingClientRect().top;
      const headerTop = this.headerTop;
      const isRollDown = top - headerTop;
      const isStart = top < -160 ? true : false;
      const isRoll = top < -160 && isRollDown <= 0 ? true : false;
      this.headerTop = top;
      this.scrollMenu.isStart = isStart;
      this.scrollMenu.isRoll = isRoll;
    },
    changeContent(e) {
      // 事件委托
      e.preventDefault();
      const target = e.target || e.srcElement;
      const path = target.dataset.path;
      const toPath = path ? path : {name: 'main'};
      this.$router.push(toPath);
      this.changeComponents(path);
    },
    changeComponents(path = this.$route.name) {
      let content = Main;
      if (path === '') {
        // this.content = Main;
      }
      else if (path === 'menu') {
        content = Menu;
      }
      else if (path === 'label') {
        content = Label;
      }
      else if (path === 'link') {
        content = Link;
      }
      else if (path === 'about') {
        content = About;
      }
      else if (path === 'read') {
        content = Read;
      }
      this.content = content;
    },
    readAnimation(name) {
      this.isReading = name === 'read' ? true : false;
    }
  },
  watch: {
    $route(route) {
      this.readAnimation(route.name);
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
    position: relative;
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    .main-header {
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
        // transform: translate(0);
        // font-family: 'Kaushan Script', cursive;
      }
      .motto {
        font-family: 'Gloria Hallelujah', cursive;
        padding-bottom: 8px;
      }
      .menu {
        // transform: translate(0);
      }
      .bgIm {
        position: absolute;
        right: 0px;
        bottom: 0px;
        @media screen and (max-width: 757px)  {
          display: none;
        }
        img {
          height: 160px;
          width: initial;
        }
      }
    }
    .read {
      transition: all .7s ease-in;
      > div {
        transition: all .7s ease-in;
      }
      height: 6vh;
      // display: flex;
      // padding: 0 13vw;
      // align-items: center;
      // justify-content: space-between;
      .name {
        padding: 0px;
        font-size: 20px;
        // transform: translate(-100%);
        // animation: name-move .1s linear forwards;
        transform: translate(-37%, 42%);
      }
      @keyframes name-move {
        from {
          transform: translate(0);
        }
        to {
          transform: translate(-50%, 38%);
        }
      }
      .motto {
        opacity: 0;
        // display: none;
      }
      .bgIm {
        opacity: 0;
        // display: none;
      }
      .menu {
        transform: translate(23%, -129%);
        font-size: 14px;
        color: $greyWhite;
        // animation: changeColor .1s linear forwards;
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
          transition: transform .8s;
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
      transition: transform 1s;
      transform: translateY(-100%);
      div::after {
        background-color: $blue;
      }
    }
    .on-show {
      transform: translateY(0);
    }
    footer {
      position: absolute;
      width: 100vw;
      bottom: 0px;
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
