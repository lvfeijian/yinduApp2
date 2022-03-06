import { request } from './request'

// 登陆接口
export function userLogin(data){
    return request({
        url: 'api/user/login',
        method: 'post',
        data
    })
}