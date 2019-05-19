<template>
    <div class="new-article">
        <header>
            <a-input :value="data.title" placeholder="请输入标题" />
            <div class="button">
                <div class="release" @click="release"><a-button>发布</a-button></div>
                <div class="cancel" @click="$router.push({name: 'article'})" ><a-button>取消</a-button></div>
            </div>
        </header>
        <div class="content">
            <a-textarea class="write" v-model="data.articleContent" @change="editContent"/>
            <div class="preview read-container" v-html="chapterContent"></div>
        </div>
        <a-modal
            title="发布文章"
            okText="发布"
            cancelText="取消"
            v-model="visible"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <div class="model-wrapper">
                <div class="word-count">
                    <label for="">文章字数: </label>
                    <a-input-number :min="0" v-model="data.wordCount" />
                </div>
                <div class="read-time">
                    <label for="">阅读时长: </label>
                    <a-input-number :min="0" v-model="data.readTime" />
                </div>
                <div class="label-list">
                    <label for="labelList">标签: </label>
                    <a-tag closable slot="prefix" @close="data.labelList.splice(index, 1)" v-for="(item, index) in data.labelList" :key="item.id">
                        {{item}}
                    </a-tag>
                    <a-input v-model="labelText" @change="makeTag" >
                    </a-input>
                </div>
                <div class="brief">
                    <label for="brief">摘要:</label>
                    <a-textarea v-model="data.content" :autosize="{ minRows: 5}"></a-textarea>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script>
import { alterArticle } from '@/api/';
import mdConfig from '@/common/js/mdConfig';

export default {
    mixins: [mdConfig],
    beforeCreate () {
        this.form = this.$form.createForm(this);
    },
    data() {
        return {
            data: {
                title: '',
                wordCount: 0,
                readTime: 0,
                labelList: [],
                content: '',
                articleContent: ''
            },
            chapterContent: '',
            labelText: '',
            visible: false
        }
    },
    methods: {
        editContent(e) {
            const rawContent = e.target.value;
            this.data.articleContent = rawContent;
            this.chapterContent = this.markdownit.render(rawContent);
        },
        release() {
            const articleContent = this.data.articleContent;
            this.data.content = articleContent && articleContent.slice(0, 200).replace(/\s+/g, '');
            this.visible = true;
        },
        makeTag(e) {
            const labelList = e.target.value.split('、');
            if (labelList.length > 1) {
                this.data.labelList.push(labelList[0]);
                this.labelText = labelList[1];
            }
        },
        async handleOk(e) {
            try {
                await alterArticle(this.data);
                this.$message.success('发布成功');
                this.$router.push({name: 'article'});
            } catch (error) {
                this.$message.error('发布失败');
            }
        },
        handleCancel() {
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/common/css/article.scss';
    .new-article {
        // overflow-y: scroll;
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            padding: 0 10px;
            border-bottom: 1px solid #ddd;
            .title {
                display: flex;
                margin-bottom: 0px;
                // flex: 1 1;
            }
            input {
                border: 0px;
                outline: none;
                width: 650px;
                font-size: 1.3rem;
                font-weight: 700;
                color: #000;
                &:focus {
                    box-shadow: none;
                }
            }
            .button {
                display: flex;
                div + div {
                    margin-left: 8px;
                }
            }
        }
        .content {
            display: flex;
            .write {
                flex: 1;
                height: calc(100vh - 50px);
                overflow-y: scroll;
                &:hover {
                    border: none;
                    box-shadow: none;
                }
                &:focus {
                    border: none;
                }
            }
            .preview {
                height: calc(100vh - 50px);
                overflow-y: scroll;
                border-left: 1px solid #ddd;
                padding: 20px;
                margin: 0;
                // border: 1px solid $grey;
                flex: 1;
            }
        }
    }
    .model-wrapper {
        >div {
            display: flex; 
            align-items: center;
            + div {
                margin-top: 10px;
            }
            label {
                display: inline-block;
                min-width: 70px;
                // flex: 1;
            }
        }
    }
</style>
