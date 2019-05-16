<template>
    <div class="alipay" @click="close">
        <div class="alipay-container">
            <div class="close" @click="close">x</div>
            <img src="../../assets/img/pocket_money.svg" alt="">
            <img src="../../assets/img/scan.svg" alt="">
        </div>
    </div>
</template>
<script>
export default {
    model: {
        prop: 'showDialog',
        event: 'changeDialog'
    },
    props: {
        showDialog: Boolean
    },
    methods: {
        close() {
            this.$emit('changeDialog', false);
        }
    }
}
</script>

<style lang="scss" scoped>
    .alipay {
        background-color: rgba(0, 0, 0, .8);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        .alipay-container {
            display: flex;
            justify-content: space-between;
            width: 50%;
            position: relative;
            .close {
                display: flex;
                align-items: center;
                justify-content: center;
                color: $blue;
                border: 1px solid $blue;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                position: absolute;
                cursor: pointer;
                right: -80px;
                top: -80px;
                &:hover {
                    color: $grey;
                    border-color: $grey;
                }
            }
            img {
                width: 270px;
                height: 270px;
            }
        }
    }
</style>
