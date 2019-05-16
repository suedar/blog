<template>
    <div class="read-container">
        <div class="title">
            {{article.title}}
        </div>
        <div class="sub-title">
            <font-awesome-icon icon="calendar-week"></font-awesome-icon>
            {{article.created}}
            <span class="line">|</span>
                热度: {{article.temperature}}℃
                <span class="line">|</span>
                字数统计: {{article.wordCount}} 字
                <span class="line">|</span>
                阅读时长: {{article.readTime}} 分钟
        </div>
        <div class="label" v-if="article.labelList && article.labelList.length > 0">
            <span class="line">|</span>
            标签: {{article.labelList.join('、')}}
        </div>
        <div class="content" v-html="chapterContent"></div>
        <div class="pager">
            <div class="prev"
                v-if="Object.keys(pager.prev).length > 0"
                @click="changeId(pager.prev.id)">
                < {{pager.prev.title}}
            </div>
            <div v-else>
                没有上一页
            </div>
            <div class="next" v-if="Object.keys(pager.next).length > 0" @click="changeId(pager.next.id)">
                {{pager.next.title}} > 
            </div>
            <div v-else>
                没有下一页
            </div>
        </div>
    </div>
</template>

<script>
const hljs = require("highlight.js/lib/highlight.js");
const hlHtml = require("highlight.js/lib/languages/xml.js");
const hlCss = require("highlight.js/lib/languages/css.js");
const hlJavascript = require("highlight.js/lib/languages/javascript.js");
const hlJson = require("highlight.js/lib/languages/json.js");
const hlBash = require("highlight.js/lib/languages/bash.js");

import "highlight.js/styles/ocean.css";

import { mapState } from "vuex";
import markdownIt from "markdown-it";

import { getArticleDetail, test } from "@/api/";
import getArticleList from '@/common/js/getArticleList';

export default {
  title: "test",
  name: "read",
  data() {
    return {
      article: {},
      chapterContent: "",
      markdownit: {},
      vEmbed: {},
      pager: {
          prev: {},
          next: {}
      }
    };
  },
  mixins: [getArticleList],
  inject: ['reload'],
  created() {
    this.initHljs();
    this.queryArticle();
    this.initPager();
  },
  methods: {
    initHljs() {
      hljs.registerLanguage("html", hlHtml);
      hljs.registerLanguage("css", hlCss);
      hljs.registerLanguage("javascript", hlJavascript);
      hljs.registerLanguage("json", hlJson);
      hljs.registerLanguage("bash", hlBash);
      const options = {
        html: true,
        breaks: true,
        linkify: true,
        highlight(str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                "</code></pre>"
              );
            } catch (__) {}
          }
          return "";
        }
      };
      this.markdownit = markdownIt(options);
    },
    async queryArticle(id = this.$route.params.id) {
        const article = await getArticleDetail({id});
        this.article = article;
        this.chapterContent = this.markdownit.render(article.chapterContent);
    },
    initPager() {
        this.initArticleList();
        const id = this.id;
        const articleList = this.articleList;
        const curIndex = articleList.findIndex(item => item.id === id);
        const pager = {
            prev: curIndex > 0 ? articleList[curIndex - 1] : {},
            next: curIndex < articleList.length - 1 ? articleList[curIndex + 1] : {}
        };
        this.pager = pager;
    },
    changeId(id) {
        this.$router.push({name: 'read', params: { id }});
        this.reload();
    }
  }
};
</script>

<style lang="scss">
// @import url('@/common/css/article.scss');
@import '@/common/css/article.scss';
.read-container {
  min-height: 66vh;
  width: 800px;
  margin: 5vh auto 10vh;
  img {
    width: initial;
    height: initial;
  }
  .title, .sub-title, .label{
    text-align: center;
  }
  .title {
      font-size: 26px;
      font-weight: 400;
      margin: 20px 0 10px;
  }
    .label {
        margin: 5px 0 40px;
        .line {
        color: $orange;
        }
    }
  .sub-title {
      font-size: 12px;
      margin-top: 5px;
      color: $grey;
      .line {
        margin: 0 5px;
      }
  }
  .pager {
      margin-top: 40px;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
            cursor: pointer;
            padding-top: 10px;
            color: #555;
            text-decoration: none;
            outline: none;
            word-wrap: break-word;
            &:hover {
                color: #222;
                border-bottom-color: #222;
            }
      }
  }
}
</style>
