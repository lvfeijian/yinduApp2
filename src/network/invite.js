import { request } from './request'

// 邀请接口
export function invitationApi(parmas){
    return request({
        url: 'api/index/invitation',
        method: 'get',
        parmas
    })
}