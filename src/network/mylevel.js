import { request } from './request'

// 会员接口
export function getMyPush(){
    return request({
        url: 'api/user/myPush',
        method: 'get',
    })
}