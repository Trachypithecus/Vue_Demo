<template>
    <div>
        <span>转账成功啦！</span><br>
        <span>转账失败</span><br>
        <span>错误代码：4000</span><br>
        <span>错误信息：系统繁忙请稍后再试</span><br>
        <p>{{message}}</p>
    </div>
</template>

<script>
import { transfer } from "@/api/bank_transfer";
export default {
    name: "BankTransferResult",
    data() {
        return {
            status: "",
            message: ""
        };
    },
    created() {
        this.status = this.$route.query.status;
        //返回信息包含卡序列号和银行卡号
        transfer(status).then(res => {
            console.log(res);
            this.message = res.message;
        });
    }
};
</script>

