<template>
    <div class="introduction">
        <div class="word-count">
            <label for="avatar">头像: </label>
            <a-input v-model="data.headPic" />
        </div>
        <div class="read-time">
            <label for="motto">座右铭: </label>
            <a-input v-model="data.introduction" />
        </div>
        <div class="submit">
            <a-button type="primary" @click="submit">提交</a-button>
        </div>
    </div>
</template>

<script>

import { getPersonalInfo, alterPersonalMsg } from '@/api/';

export default {
    beforeCreate () {
        this.form = this.$form.createForm(this);
    },
    data() {
        return {
            data: {}
        }
    },
    created() {
        this.initConfig();
    },
    methods: {
        async initConfig() {
            const data = await getPersonalInfo();
            this.data = data;
        },
        async submit() {
            try {
                await alterPersonalMsg(this.data);
                this.$message.success('修改成功');
            } catch (error) {
                this.$message.error('修改失败');                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.introduction {
    padding: 100px;
    > div {
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
    .submit {
        // display: flex;
        // justify-content: center;
    }
}
</style>
