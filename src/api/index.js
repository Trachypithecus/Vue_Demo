let _before_fetch_handler = () => {}
let _after_fetch_handler = () => {}
let _error_fetch_handler = ({
    errcode,
    errmsg
}) => {}

const API = {
    define_bebore_fetch_handler(fn) {
        _before_fetch_handler = fn
    },
    define_after_fetch_handler(fn) {
        _after_fetch_handler = fn
    },
    define_error_fetch_handler(fn) {
        _error_fetch_handler = fn
    },
    fetch(...args) {
        _before_fetch_handler()
        return new Promise((resolve, reject) => {
            fetch.apply(window, args).then(res => {
                _after_fetch_handler()
                return res.json()
            }).then(json => {
                if (!json.errcode) {
                    resolve(json)
                } else {
                    let error_resp
                    if (json && json.errcode) {
                        error_resp = {
                            errcode: json.errcode,
                            errmsg: json.errmsg
                        }
                    } else {
                        error_resp = {
                            errcode: 500,
                            errmsg: JSON.stringify(json)
                        }
                    }
                    _error_fetch_handler(error_resp)
                    reject(error_resp)
                }
            }).catch(e => {
                let error_resp = {
                    errcode: 500,
                    errmsg: '网络出了点小错误，请稍后再试'
                }
                _error_fetch_handler(error_resp)
                reject(error_resp)
            })
        })
    },
    serialize(obj, prefix) {
        let str = []
        for (let p in obj) {
            let value = obj[p]
            if (obj.hasOwnProperty(p) && value !== null && value !== undefined) {
                let k = prefix ? `${prefix}[${p}]` : p
                str.push(typeof value == 'object' ? API.serialize(value, k) : encodeURIComponent(k) + "=" + encodeURIComponent(value))
            }
        }
        return str.join("&")
    },
    get(url, query = {}, opts = {}) {
        return this.fetch(`${url}?${this.serialize(query)}`, {
            headers: {
                'token': localStorage.getItem('token') || ''
            },
            ...opts
        })
    },
    post(url, form = {}, opts = {}) {
        return this.fetch(url, {
            method: 'POST',
            body: this.serialize(form),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'token': localStorage.getItem('token')
            },
            ...opts
        })
    },
    post_json(url, form = {}, opts = {}) {
        return this.fetch(url, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'token': localStorage.getItem('token') || ''
            },
            ...opts
        })
    },
    post_form_data(url, form = {}, opts = {}) {
        let data = new FormData()
        for (let key in form) {
            if (form[key] != null) {
                data.append(key, form[key])
            }
        }
        return this.fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'token': localStorage.getItem('token') || ''
            },
            ...opts
        })
    }
}
export default API