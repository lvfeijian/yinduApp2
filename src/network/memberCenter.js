import { request } from './request'

// 登陆接口
export function vipListApi(){
  return request({
      url: 'api/vip/list',
      method: 'get',
  })
}