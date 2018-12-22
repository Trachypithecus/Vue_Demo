<template>
    <div class="bank-transfer-step2-page">
        <p class="tips">请确认转账信息</p>
        <div class="form-item">
            <div class="label">转出账号</div>
            <div class="value">{{this.accountNo}}</div>
        </div>
        <div class="form-item">
            <div class="label">收款人</div>
            <div class="value">{{this.Payee}}</div>
        </div>
        <div class="form-item">
            <div class="label">转入账号</div>
            <div class="value">{{this.PayeeAccount | accountFilter}}</div>
        </div>
        <div class="form-item">
            <div class="label">收款银行</div>
            <div class="value">{{this.BankName}}</div>
        </div>
        <div class="form-item">
            <div class="label">转账金额</div>
            <div class="value">￥{{this.TranMoney | numFilter}}</div>
        </div>
        <div class="form-item">
            <div class="label">转账方式</div>
            <div class="value">{{this.TransferMethod}}</div>
        </div>
        <div class="next-btn-container">
            <button
                class="btn"
                @click="next"
            >确认</button>
        </div>
    </div>
</template>

<script>
import { transfer } from "@/api/bank_transfer";
import YnetCeil from "@/components/YnetCeil";

export default {
    name: "BankTransferStep2",
    data() {
        return {
            Payee: "", //收款人
            PayeeAccount: "", //收款人账户
            accountNo: "", //z账户
            TranMoney: "", //转账金额
            TransferMethod: "", //转账方式
            BankName: "", //转账银行
            status: '',     //状态码
        };
    },
    created() {
        document.title = "确认转账信息";
        this.Payee = this.$route.params.Payee;
        this.PayeeAccount = this.$route.params.PayeeAccount;
        this.accountNo = this.$route.params.accountNo;
        this.TranMoney = this.$route.params.TranMoney;
        this.TransferMethod = this.$route.params.TransferMethod;
        this.BankName = this.$route.params.BankName;
        //调用接口，返回状态码
        transfer(status).then(res => {
            console.log(res);
            this.status = res.status;
        });
    },
    filters: {
        //金额格式化
        numFilter(TranMoney) {
            if(!TranMoney) return '0.00';		
			/*原来用的是Number(value).toFixed(0)*/
			var intPart =  Number(TranMoney)|0; //获取整数部分
			var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
			var floatPart = ".00"; //预定义小数部分
			var value2Array = TranMoney.split(".");
			//=2表示数据有小数位
			if(value2Array.length == 2) {
				floatPart = value2Array[1].toString(); //拿到小数部分
				if(floatPart.length == 1) { 
					return intPartFormat + "." + floatPart + '0';
				} else {
					return intPartFormat + "." + floatPart;
				}
			} else {
				return intPartFormat + floatPart;
			}
        },
        //账户格式化
        accountFilter(PayeeAccount) {
            if (!PayeeAccount) return " ";
            var intPart = Number(PayeeAccount).toFixed(0); // 获取整数部分
            var intPartFormat = intPart
                .toString()
                .replace(/\s/g,'').replace(/(.{4})/g,"$1 "); 
            return intPartFormat;
        }
    },
    methods: {
        next() {
            this.$router.push({
                name: "BankTransferResult",
                query: {
                    status: this.status,
                    message: "转账成功"
                }
            });
        }
    }
};
</script>

<style lang="scss">
.bank-transfer-step2-page {
    background-color: #fff;
    .tips {
        color: #333;
        padding: 0 10px;
        line-height: 40px;
        font-size: 18px;
        text-align: center;
        background-color: #f6f6f6
    }
    .next-btn-container {
        padding: 10px;
        .btn {
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #fff;
            font-size: 16px;
            background-color: #d33b30;
            &.disabled {
                background-color: #b3afaf;
            }
        }
    }
}
</style>
