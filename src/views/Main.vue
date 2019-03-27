<template>
  <section class="container">
    <header id="header">
      <div class="name">
        sueder
      </div>
      <div class="motto">
        Welcome to my world!
      </div>
    </header>
    <div id="menu">
      <div v-for="item in menu" :key="item.id">
        {{item}}
      </div>
    </div>
    <div class="article">
      <div class="content">
        <h3></h3>
      </div>
    </div>
  </section>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  components: {
    // Logo
  },
  data() {
    return {
      menu: ['主页', '目录', '前端在线资源', '关于']
    }
  }
}
</script>

<style lang="scss">

  .container {
    #header {
      height: 20vh;
      background: linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%);
      color: #fff;
      font-family: "Verdana, Arial, Helvetica, sans-serif;";
      text-align: center;
      .name {
        font-size: 30px;
        padding: 30px 0 20px;
        font-weight: bold;
      }
    }
    #menu {
      height: 5vh;
      transition: opacity 1s;
      opacity: 1;
      color: #1EAEDB;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #1EAEDB;
      div {
        padding: 0 10px;
        height: 20px;
      }
    }
  }
</style>
