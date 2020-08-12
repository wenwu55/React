import request from '@/utils/request';

export interface KnowledgeType {
    period: string | '高中'
    subjectName: string | '数学'
  }

export interface InfoType {
    "category": string,
    "city": string,
    "code": string,
    "description": string,
    "difficulty": string,
    "grade": string,
    "knowledegeId": number,
    "pageIndex": number,
    "pageSize": number,
    "period": string,
    "referExampapers": string,
    "stem": string,
    "subjectName": string,
    "types": string,
    "year": number
}

export async function getKnowledge (param: KnowledgeType) {
    return request('/web/knowledge/findKnowledgeInfo', {
        method: 'get',
        params: param
    })
}

export async function getTitle () {
    return request('/web/subjectInfo/findSubjectTitle', {
        method: 'post'
    })
}

export async function getInfo (datas: InfoType) {
    return request('/web/subjectInfo/findSubjectInfo', {
        method: 'post',
        data: datas
    })
}