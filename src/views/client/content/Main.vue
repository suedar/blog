<template>
    <Model fixedColor="#c11e4b" :hasRight="true" class="main">
        <template v-slot:content>
          <div
            class="content"
            v-for="item in articleList"
            :key="item.id"
            :title="item.title"
            @click="read(item.id)">
            <h2>{{item.title}}</h2>
            <div class="tip">
              <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
              Posted on {{item.created.slice(0, 19).replace(/T/, ' ')}}
              <span class="line">|</span>
              热度: {{item.temperature}}℃
              <span class="line">|</span>
              字数统计: {{item.wordCount}} 字
              <span class="line">|</span>
              阅读时长: {{item.readTime}} 分钟
            </div>
            <div class="label" v-if="item.labelList && item.labelList.length > 0">
              <span class="line">|</span>
              标签: {{item.labelList.join('、')}}
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
        </template>
        <template v-slot:sum-header>
          推荐
        </template>
        <template v-slot:sum-content>
          <a v-for="item in recommand" :key="item.id" :href="item.link" target="_blank">
            {{item.text}}
          </a>
        </template>
    </Model>
</template>

<script>
import _ from 'underscore';

import { getBrief } from '@/api/';

import getSRecommand from '@/common/js/getSRecommand';
import getArticleList from '@/common/js/getArticleList';

import Model from '../model/Model.vue';

export default {
    // TODO: 懒加载 还有 目录的bug修一下
    data() {
        return {
            article: [],
            recommand: [],
            pageNum: 0,
            hasMore: true
        }
    },
    components: {
      Model
    },
    mixins: [getSRecommand, getArticleList],
    created() {
      this.getArticle();
      this.getRecommand();
    },
    beforeRouteUpdate (to, from, next) {
      document.body.scrollTop = 0;
      next();
    },
    // inject: ['reload'],
    methods: {
      // 懒加载
      // async getArticle(pageNum = this.pageNum) {
      //   pageNum ++;
      //   const article = await getBrief({pageNum, pageSize: 10});
      //   this.article = article;
      //   this.pageNum = pageNum;
      // },
      getArticle() {
        this.initArticleList();
        // this.article = this.articleList;
        // this.reload();
      },
      async getRecommand() {
        const recommand = await this.getSRecommand();
        const sliceRecommand = recommand.slice(0, 10);
        this.recommand = sliceRecommand;
      },
      read(id) {
        this.$router.push({name: 'read', params: { id }});
        this.$parent.changeComponents();
      }
    }
}
</script>

<style lang="scss" scoped>
.main {
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
      @media screen and (max-width: 800px) {
        box-shadow: none;
      }
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
    a {
      padding: 5px 0;
      display: inline;
    }
  }
}
</style>
