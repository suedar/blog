<template>
    <a-modal
        class="login"
        title="登陆"
        :visible.sync="isLogin"
        :footer="null"
        width="40%"
        @cancel="close">
        <a-form ref="form" label-position="left" :form="form" label-width="120px" @submit="handleSubmit">
            <a-form-item>
                <a-input autocomplete="on" v-decorator="[
                    'userName',
                    { rules: [{ required: true, message: '请输入用户名' }] }
                ]"
                placeholder="用户名">
                <a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0,0,0,.25)"
                /></a-input>
            </a-form-item>
            <a-form-item>
                <a-input v-decorator="[
                    'passowrd',
                    { rules: [{ required: true, message: '请输入密码' }] }
                    ]"
                    type="password"
                    placeholder="密码">
                    <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)"
                    /></a-input>
            </a-form-item>
            <a-form-item class="button">
                <a-button type="primary" @click="handleSubmit">提交</a-button>
                <a-button @click="close">取消</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import { userLogin } from '@/api/';

import { mapMutations } from 'vuex';

export default {
    model: {
        prop: 'isLogin',
        event: 'closeLogin'
    },
    props: ['isLogin'],
    data() {
        return {
        }
    },
    inject: ['reload'],
    beforeCreate () {
        this.form = this.$form.createForm(this);
    },
    methods: {
        ...mapMutations(['CHANGE_LOGIN_STATUS']),
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.loginUser(values);
                }
            });
        },
        async loginUser(values) {
            try {
                const userInfo = await userLogin({
                    userName: values.userName,
                    password: values.password
                });
                this.$message.success('登陆成功');
                this.CHANGE_LOGIN_STATUS(true);
                this.$router.push({name: 'article'});
                this.close();
            }
            catch(err) {
                this.$message.error('登陆失败');
            }
        },
        close() {
            this.form.resetFields();
            this.$emit('closeLogin', false);
        }
    }
}

</script>
<style lang="scss">
    .login {
        button + button {
            margin-left: 30px;
        }
    }
</style>
