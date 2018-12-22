//转出账号：调用接口getBankAccountList获取，返回信息包含卡序列号和银行卡号
export const getBankAccountList = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{
                accountNoSequence: '1',
                accountNo: '6217 2567 3219 2200 123',
            }, {
                accountNoSequence: '2',
                accountNo: '6418 9022 1456 2874 098',
            }])
        }, 300)
    })
}
//可用余额：调用接口getBankAccountBalance获取，传入卡序列号，返回余额
export const getBankAccountBalance = (accountNoSequence) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch (accountNoSequence) {
                case '1':
                    resolve(800)
                case '2':
                    resolve(100000000)
                default:
                    resolve(100000000)
            }
        }, 1000 + Math.random() * 1000)
    })
}
//收款银行：调用接口getBankList获取，返回银行编号和银行名称。
export const getBankList = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{
                bankNo: '28894021',
                bankName: '中国农业银行'
            }, {
                bankNo: '28764321',
                bankName: '中国工商银行'
            }, {
                bankNo: '26748242',
                bankName: '中国银行'
            }, {
                bankNo: '26738819',
                bankName: '中国建设银行'
            }])
        }, 500)
    })
}
//转账方式：实时转账，延时转账，次日转账，必选。
export const getTips = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('实时发起转账，具体到账时间以收款银行为准')
        }, 200)
    })
}

export const transfer = (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let r = Math.random()
            if (r < 0.4) {
                resolve({
                    status: 0,
                    message: '转账成功'
                })
            } else {
                if (r < 0.7) {
                    resolve({
                        status: 1000,
                        message: '转账失败，收款方不在服务时间'
                    })
                } else {
                    reject({
                        status: 4000,
                        message: '系统繁忙，请稍后再试'
                    })
                }
            }
        }, 2000)
    })
}