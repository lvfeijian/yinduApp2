import { request } from './request'

// 轮播图接口
export function getSwiperList(){
    return request({
        url: 'api/ads/list',
        method: 'get'
    })
}

// 公告列表
export function noticeListApi(params){
    return request({
        url: 'api/Notice/list',
        method: 'get',
        params
    })
}
// 公告详情
export function noticeDetailApi(params){
    return request({
        url: 'api/notice/detail',
        method: 'get',
        params
    })
}

// vip会员列表接口
export function vipListApi(){
    return request({
        url: 'api/vip/list',
        method: 'get'
    })
}

// 开通vip发起支付口
export function vipPayApi(params){
    return request({
        url: 'api/vip/pay',
        method: 'get',
        params
    })
}

// 订单是否支付接口
export function vipOrderApi(params){
    return request({
        url: 'api/vip/order',
        method: 'get',
        params
    })
}

// 登录页弹窗提醒接口
export function loginRemindApi(){
    return request({
        url: 'api/index/loginRemind',
        method: 'get',
    })
}




