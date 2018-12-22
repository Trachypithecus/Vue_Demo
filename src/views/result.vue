<template>
<div class="result-page">
    <p>转账成功啦！</p>
    <p>转账失败<br>错误代码：4000<br>错误信息：系统繁忙，请稍后再试</p>
</div>
</template>

<script>
export default {
    name: 'BankTransferResult',
    data() {
        return {

        }
    },
    created() {
        document.title = '转账结果'
    },
}
</script>

<style lang="scss">
.result-page {
    background-color: #fff;
    padding: 20px;
}
</style>
