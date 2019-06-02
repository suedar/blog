<template>
  <div class="recommand">
    <div class="top">
      <a-input-search
        placeholder="请输入搜索标题"
        style="width: 200px"
        @search="val => handleTableChange({current: 1, pageSize: 10}, val)"
      />
      <a-button @click="visible = true" class="add" type="primary">
        新增推荐
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
    <a-modal
        title="编辑推荐"
        okText="发布"
        cancelText="取消"
        v-model="visible"
        @ok="handleOk"
        @cancel="curRecommand = {}"
    >
        <div class="model-wrapper">
            <div class="word-count">
                <label for="text">标题: </label>
                <a-input v-model="curRecommand.text" />
            </div>
            <div class="read-time">
                <label for="link">链接: </label>
                <a-input v-model="curRecommand.link" />
            </div>
        </div>
    </a-modal>
  </div>
</template>
<script>

import { getRecommand, delRecommand, alterRecommand } from "@/api/";
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      data: [],
      pagination: {},
      columns: [{
        title: "标题",
        dataIndex: "text",
        scopedSlots: { customRender: "text" }
      },
      {
        title: "创建时间",
        dataIndex: "created",
        scopedSlots: { customRender: "created" }
      },
      {
        title: "链接",
        dataIndex: "link",
        scopedSlots: { customRender: "link" }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
      visible: false,
      curRecommand: {}
    };
  },
  created() {
    this.handleTableChange({current: 1, pageSize: 10});
  },
  inject: ['reload'],  
  methods: {
    async handleTableChange(pager, text) {
      const { result: data, totalNum } = text ? await getRecommand({pageNum: pager.current, pageSize: pager.pageSize, text}) : await getRecommand({pageNum: pager.current, pageSize: pager.pageSize});
      data.map(item => item.created = item.created.slice(0, 19).replace(/T/, ' '));
      this.$set(this.pagination, 'total', totalNum);
      this.data = data;
    },
    editThis(key) {
      this.curRecommand = key;
      this.visible = true;
    },
    async deleteThis(key) {
      try {
        await delRecommand({id: key.id});
        this.$message.success('删除成功');
        this.reload();
      } catch (error) {
        this.$message.error('删除失败');
      }
    },
    async handleOk(e) {
        try {
            await alterRecommand(this.curRecommand);
            this.$message.success('发布成功');
            this.reload();
            this.visible = false;
        } catch (error) {
            this.$message.error('发布失败');
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
.recommand {
  padding: 0 30px;
  .top {
    display: flex;
    justify-content: space-between;
    margin: 30px 0 10px;
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
