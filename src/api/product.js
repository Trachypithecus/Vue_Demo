import API from './index'
const API_PREFIX = `${process.env.API_HOST}/product`

export const list_product = (data) => {
    return API.post_json(`${API_PREFIX}/list`, data)
}