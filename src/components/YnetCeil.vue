<template>
<div class="form-item">
    <div class="label">转账金额</div>
    <div class="value">xxxxxxxx</div>
</div>
</template>

<script>
export default {
    name: 'YnetCeil'
}
</script>

<style lang="scss">
.form-item {
    display: flex;
    background-color: #fff;
    padding-left: 10px;
    .label {
        width: 80px;
        font-size: 16px;
        color: #333;
        line-height: 40px;
        height: 40px;
        border-bottom: 1px solid #eee;
    }
    .value {
        display: block;
        background-color: #fff;
        padding: 10px 10px 10px 0;
        border-bottom: 1px solid #eee;
        flex: 1;
        height: 40px;
        line-height: 20px;
        text-align: right;
    }
}
</style>
