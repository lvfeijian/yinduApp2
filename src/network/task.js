import { request } from './request'

// vip任务列表
export function getTaskList(){
    return request({
        url: 'api/task/vipList',
        method: 'get'
    })
}

// 任务详细接口
export function taskDetailApi(params){
    return request({
        url: 'api/task/detail',
        method: 'get',
        params
    })
}

// 任务完成接口
export function taskFinishApi(data){
    return request({
        url: 'api/task/finish',
        method: 'post',
        data
    })
}



