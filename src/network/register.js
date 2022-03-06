import { request } from './request'

// 注册接口
export function userRegister(data){
    return request({
        url: 'api/user/register',
        method: 'post',
        data
    })
}