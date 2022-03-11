import axios from 'axios'
import Vue from 'vue';
import { Notify, Toast } from 'vant';
Vue.use(Notify);
Vue.use(Toast);
const Qs = require('qs')
if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = 'http://ydapp.cenvr.com';
} else {
    // http://api.globejcd.top
    axios.defaults.baseURL = 'http://vipcbagent.com/';
}
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求发送之前的拦截器
axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = token
        config.headers.common['token'] = token
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 请求响应拦截器
axios.interceptors.response.use(res => {
    return Promise.resolve(res)
}, error => {
    return Promise.reject(error)
})

export function request(config) {
    return new Promise((resolve, reject) => {
        axios.request(config).then(res => {
            Toast.clear();
            if (res.data.code == 1) {
                const resData = res.data
                resolve(res.data)
            } else if (res.data.code == 0) {
                Notify({ type: 'danger', message: res.data.msg });
            } else if (res.data.code == '10001') {
                window.localStorage.removeItem("token");
            } else {
                resolve(res.data)
            }
        }, error => {
            reject(error)
        })
    })
}
