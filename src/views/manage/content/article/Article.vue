<template>
  <div class="article">
    <div class="top">
      <a-input-search
        placeholder="请输入搜索标题"
        style="width: 200px"
        @search="val => handleTableChange({current: 1, pageSize: 10}, val, 'search')"
      />
      <a-button @click="$router.push({name: 'new-article'})" class="add" type="primary">
        新增文章
      </a-button>
    </div>
    <a-table
      rowKey="id"
      :pagination="pagination"
      :columns="columns" :dataSource="data" bordered
      @change="handleTableChange">
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span>
            <a @click="editThis(record)">编辑</a>
            <a @click="deleteThis(record)">删除</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>

import { getBrief, delArticle } from "@/api/";
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      data: [],
      pagination: {},
      columns: [
      {
        title: "标题",
        dataIndex: "title",
        scopedSlots: { customRender: "title" }
      },
      {
        title: "创建时间",
        dataIndex: "created",
        scopedSlots: { customRender: "created" }
      },
      {
        title: "热度",
        dataIndex: "temperature",
        scopedSlots: { customRender: "temperature" }
      },
      {
        title: "字数统计",
        dataIndex: "wordCount",
        scopedSlots: { customRender: "wordCount" }
      },
      {
        title: "阅读时长",
        dataIndex: "readTime",
        scopedSlots: { customRender: "readTime" }
      },
      {
        title: "标签",
        dataIndex: "labelList",
        scopedSlots: { customRender: "labelList" }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }
    ]};
  },
  created() {
    this.handleTableChange({current: 1, pageSize: 10});
  },
  inject: ['reload'],
  methods: {
    ...mapMutations(['CHANGE_EDIT_ARTICLE']),
    async handleTableChange(pager, title, isSearch) {
      const { result: data, totalNum } = isSearch === 'search' ? await getBrief({pageNum: pager.current, pageSize: pager.pageSize, title}) : await getBrief({pageNum: pager.current, pageSize: pager.pageSize});
      data.map(item => {
        item.created = item.created.slice(0, 19).replace(/T/, ' ');
        item.created = item.created.toString();
        item.labelList = item.labelList && item.labelList.join('、') || [];
        return item;
      });
      this.$set(this.pagination, 'total', totalNum);
      this.data = data;
    },
    editThis(key) {
      this.CHANGE_EDIT_ARTICLE(key);
      this.$router.push({name: 'edit-article'});
    },
    async deleteThis(key) {
      try {
        await delArticle({id: key.id});
        this.$message.success('删除成功');
        this.reload();
      } catch (error) {
        this.$message.error('删除失败');
      }
    }
  }
};
</script>
<style scoped lang="scss">
.editable-row-operations a {
  color: $blue;
  margin-right: 8px;
}
.article {
  // height: 2000px;
  min-height: 80vh;
  overflow: auto;
  padding: 0 30px;
  // overflow-y: scroll;
  .top {
    display: flex;
    justify-content: space-between;
    margin: 30px 0 10px;
  }
  .zhanwei {
    height: 80vh;
  }
}
</style>
