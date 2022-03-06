import { request } from './request'

// 企业介绍接口
export function getCompanyIntro(params){
    return request({
        url: 'api/index/company',
        method: 'get',
        params
    })
}