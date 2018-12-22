<template>
    <div class="bank-transfer-step1-page">
        <div class="form-item">
            <div class="label">转出账号</div>
            <select
                class="selector input"
                placeholder="请选择转出账号"
                v-model="accountNoSequence"
                @change="selectAccountNo($event)"
            >
                <option
                    v-for="item in Accounts"
                    :key="item.id"
                    :value="item.accountNoSequence"
                >
                    {{item.accountNo}}
                </option>
            </select>
        </div>
        <div class="balance-tips">可用余额：<span class="balance">{{Balance}}</span></div>
        <div class="form-item">
            <div class="label">收款人</div>
            <input
                class="input"
                type="text"
                placeholder="请输入收款人姓名"
                v-model="Payee"
            >
        </div>
        <div class="form-item">
            <div class="label">转入账号</div>
            <input
                class="input"
                type="number"
                placeholder="请输入收款人的卡号"
                maxlength="23"
                v-model="PayeeAccount"
            >
        </div>
        <div class="form-item">
            <div class="label">收款银行</div>
            <select
                class="selector input"
                placeholder="请选择开户行"
                @change="selectBankName($event)"
            >
                <option
                    v-for="item in bankList"
                    :key="item.id"
                    :value="item.bankName"
                >
                    {{item.bankName}}
                </option>
            </select>
        </div>
        <div class="form-item mt10">
            <div class="label">转账金额</div>
            <input
                class="input"
                type="number"
                placeholder="请输入转账金额"
                v-model="TranMoney"
                @keydown="moneyKey"
            >
        </div>
        <div class="error-tips">{{error.errorName}}</div>
        <div class="form-item mt10">
            <div class="label">转账方式</div>
            <select
                class="selector input"
                @change="selectMethod($event)"
            >
                <option
                    v-for="item in TransferMethod"
                    :value="item.text"
                    :key="item.id"
                >
                    {{item.text}}
                </option>
            </select>
        </div>
        <div class="tips">{{tips}}</div>
        <div class="next-btn-container">
            <button
                @click="next"
                v-bind:class="{disabled:isDisabled}"
                class="btn"
            >下一步</button>
        </div>
    </div>
</template>

<script>
import {
    getBankAccountList,
    getBankAccountBalance,
    getBankList,
    getTips
} from "@/api/bank_transfer";
export default {
    name: "BankTransferStep1",
    data() {
        return {
            Payee: "", //转出收款人
            PayeeAccount: "", //收款人转出账户
            Accounts: [], //银行账户
            accountNoSequence: "", //账户序列，用于获取银行卡号和金额
            accountNo: "", //转出银行卡账号
            bankList: [], //银行列表
            BankName: "", //收款银行
            Balance: "", //可用余额
            TranMoney: "", //转账金额
            //错误弹窗提示
            error: {
                errorName: ""
            },
            //转账方式
            selectMethods: "",
            TransferMethod: [
                { text: "实时转账", value: "1" },
                { text: "延时转账", value: "2" },
                { text: "次日转账", value: "3" }
            ],
            //转账方式提示
            tips: ""
        };
    },
    created() {
        document.title = "银行卡转账";
        //返回信息包含卡序列号和银行卡号
        getBankAccountList().then(res => {
            console.log(res);
            this.Accounts = res;
        });
        //回银行编号和银行名称。
        getBankList().then(res => {
            console.log(res);
            this.bankList = res;
        });
        //转账方式提示
        getTips().then(res => {
            console.log(res);
            this.tips = res;
        });
    },
    computed: {
        //下一步高亮
        isDisabled: function() {
            if (
                this.Payee != "" &&
                this.PayeeAccount != "" &&
                this.accountNoSequence != "" &&
                this.TranMoney <= this.Balance &&
                this.TranMoney != ""
            ) {
                return false;
            } else {
                return true;
            }
        }
    },
    watch: {
        //通过监听accountNoSequence值的变化，改变余额
        accountNoSequence: function(newVal, oldVal) {
            getBankAccountBalance(newVal).then(res => {
                console.log(res);
                this.Balance = res;
            });
        },
        //通过监听TranMoney转账金额，判断输出
        TranMoney: function(newVal) {
            if (newVal > this.Balance) {
                this.error.errorName = "转账金额超出账号余额";
            } else {
                this.error.errorName = "";
            }
        },
        //限制输入卡号长度
        PayeeAccount(val){
            this.PayeeAccount = val.substr(0,19)
        }
    },
    methods: {
        //输入金额限制两位小数
        moneyKey(e) {
            e.target.value =
                e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null;
        },
        //获取转出账号
        selectAccountNo(event) {
            var accountNo = event.target.value;
            this.accountNo = accountNo;
            console.log("银行卡账户：", accountNo);
        },
        //获取转账方式
        selectMethod(event) {
            var selectMethod = event.target.value;
            this.selectMethods = selectMethod;
            console.log("转账方式：", selectMethod);
        },
        //获取收款银行
        selectBankName(event) {
            var selectBank = event.target.value;
            this.BankName = selectBank;
            console.log("收款银行：", selectBank);
        },
        //跳转到页面step2，并且传入参数
        next() {
            if (
                this.Payee != "" &&
                this.PayeeAccount != "" &&
                this.accountNoSequence != "" &&
                this.TranMoney <= this.Balance &&
                this.TranMoney != ""
            ) {
                this.$router.push({
                    name: "BankTransferStep2",
                    //向step2传入收款人、收款账号、转出金额、转出方式、转出银行卡账号、转出银行
                    params: {
                        Payee: this.Payee,
                        PayeeAccount: this.PayeeAccount,
                        TranMoney: this.TranMoney,
                        TransferMethod: this.selectMethods,
                        accountNo: this.accountNo,
                        BankName: this.BankName
                    }
                });
            } else {
                return false;
            }
        }
    }
};
</script>

<style lang="scss">
.bank-transfer-step1-page {
    background-color: #eee;
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
        .input {
            display: block;
            background-color: #fff;
            padding: 10px 10px 10px 0;
            border-bottom: 1px solid #eee;
            flex: 1;
            height: 40px;
            line-height: 20px;
            text-align: right;
        }
        .selector {
            option {
                text-align: right;
            }
        }
        &.mt10 {
            margin-top: 10px;
        }
    }
    .balance-tips {
        text-align: right;
        line-height: 40px;
        font-size: 14px;
        padding: 0 20px;
        .balance {
            color: #d04d4d;
        }
    }
    .error-tips {
        color: #d04d4d;
        text-align: right;
        line-height: 20px;
        font-size: 14px;
        margin: 10px 0;
    }
    .tips {
        color: #666;
        padding: 0 10px;
        line-height: 40px;
        font-size: 14px;
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
