import { Effect, Reducer } from 'umi';

import { getKnowledge } from '@/services/sider';

export interface QuestionModelState {
    period: string;
    subject: string;
    knowledgeList: []
}

export interface QuestionModelType {
    namespace: 'questionBank',
    state: QuestionModelState | undefined,
    reducers: {
        updatePeriodSubject: Reducer<QuestionModelState>
    }
}

const questionModel: QuestionModelType = {
    // 命名空间
    namespace: 'questionBank',

    // 初始化数据
    state: {
        period: '高中',
        subject: '数学',
        knowledgeList: []
    },
    reducers: {
        // 更新period, subject
        updatePeriodSubject(state: QuestionModelState, action) {
            return {
                ...state,
                subject: action.payload.subjcet,
                period: action.payload.period
            }
        }
    }
}

export default questionModel