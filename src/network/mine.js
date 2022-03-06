import { request } from './request'

// 个人信息接口
export function getUserInfo(){
    return request({
        url: 'api/user/info',
        method: 'get'
    })
}

// 修改密码接口
export function changePassword(data){
    return request({
        url: 'api/user/changePassword',
        method: 'post',
        data
    })
}

// 绑定银行卡接口
export function bindBankCard(data){
    return request({
        url: 'api/user/bindBankCard',
        method: 'post',
        data
    })
}

// 银行卡信息接口
export function getBankCard(params){
    return request({
        url: 'api/user/bankCard',
        method: 'get',
        params
    })
}
// 获取客服链接
export function getChatUrl(){
    return request({
        url: 'api/index/chatUrl',
        method: 'get',
    })
}

// 我的团队接口
export function userTeam(data){
    return request({
        url: 'api/user/team',
        method: 'post',
        data
    })
}

// 广告收益
export function taskEaningsApi(params){
    return request({
        url: 'api/task/eanings',
        method: 'get',
        params
    })
}

// 提现接口
export function userCashApi(data){
    return request({
        url: 'api/user/cash',
        method: 'post',
        data
    })
}

// 分销收益
export function userRetailApi(params){
    return request({
        url: 'api/user/retail',
        method: 'get',
        params
    })
}

export function downloadApi(){
    return request({
        url: 'api/index/download',
        method: 'post',
    })
}










