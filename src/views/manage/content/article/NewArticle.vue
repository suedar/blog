<template>
    <div class="new-article">
        <header>
            <a-input placeholder="请输入标题" />
            <div class="release"><a-button>发布</a-button></div>
        </header>
        <div class="content">
            <a-textarea class="write" v-decorator="['content']"/>
            <div class="preview" v-html="chapterContent">
            </div>
        </div>
    </div>
</template>

<script>
import mdConfig from '@/common/js/mdConfig';
export default {
    mixins: [mdConfig],
    beforeCreate () {
        this.form = this.$form.createForm(this);
    },
    data() {
        return {
            chapterContent: ''
        }
    }
}
</script>

<style lang="scss" scoped>
    .new-article {
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
                &:focus {
                    box-shadow: none;
                }
            }
        }
        .content {
            display: flex;
            .write {
                flex: 1;
                min-height: calc(100vh - 50px);
                &:hover {
                    border: none;
                    box-shadow: none;
                }
                &:focus {
                    border: none;
                }
            }
            .preview {
                border-left: 1px solid #ddd;
                // border: 1px solid $grey;
                flex: 1;
            }
        }
    }
</style>
