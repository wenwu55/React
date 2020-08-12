import React, { useState, useEffect, useMemo } from 'react'
import { getTitle, getInfo } from '@/services/sider';
import styles from '../../index.less'
import { Radio } from 'antd'

interface ContentStates {
    subject: string
}

const Content: React.FC<ContentStates> = (props) => {

    const maplist = ['高中', '初中', '小学']

    const { subject } = props

    const [titleList, setTitleList] = useState([])

    const [grade, setGrade] = useState('')
    const [category, setCategory] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [types, setTypes] = useState('')

    useEffect(() => {
        const func = async () => {
            const res = await getTitle()
            console.log({res})
            //   const index = maplist.findIndex(item => item === subject.substring(0, 2))
            const title = JSON.parse(res.data[maplist.findIndex(item => item === subject.substring(0, 2))].title)
            // console.log(JSON.parse(res.data[index].title))
            const index = title.findIndex(item => item.subjectName === subject.substring(2, 4))
            console.log(title[index])
            setTitleList(title[index])
        }
        func()
    }, [subject])

    function changeRadio (e: any) {
        const param = {
            "category": category,
            "city": '',
            "code": '',
            "description": '',
            "difficulty": difficulty,
            "grade": grade,
            "knowledegeId": 2131623935,
            "pageIndex": 1,
            "pageSize": 10,
            "period": subject.substring(0, 2),
            "referExampapers": '',
            "stem": '',
            "subjectName": subject.substring(2, 4),
            "types": types,
            "year": 0
        }
        if(e.target.name === 'grade') {
            param.grade = e.target.value
            setGrade(e.target.value)
        } else if (e.target.name === 'category') {
            param.category = e.target.value
            setCategory(e.target.value)
        } else if (e.target.name === 'difficulty') {
            param.difficulty = e.target.value
            setDifficulty(e.target.value)
        } else {
            param.types = e.target.value
            setTypes(e.target.value)
        }
        console.log(e)
        console.log(param)
        getInfo(param).then(res => {
            console.log(res)
        })
    }

    return (
        <div className={styles.content}>
            <div className={styles.top}>
                <div>
                <span>年级：</span>
                <Radio.Group defaultValue={grade} buttonStyle="solid" name="grade" onChange={e => changeRadio(e)}>
                    <Radio.Button value="">全部</Radio.Button>
                    {
                        titleList.grade?.map(item => <Radio.Button value={item}>{item}</Radio.Button>)
                    }
                </Radio.Group>
                </div>
                <div style={{ marginTop: 5 }}>
                <span>类型：</span>
                <Radio.Group defaultValue={category} buttonStyle="solid" name="category" onChange={e => changeRadio(e)}>
                    <Radio.Button value="">全部</Radio.Button>
                    {
                        titleList.category?.map(item => <Radio.Button value={item}>{item}</Radio.Button>)
                    }
                </Radio.Group>
                </div>
                <div style={{ marginTop: 5 }}>
                <span>难度：</span>
                <Radio.Group defaultValue={difficulty} buttonStyle="solid" name="difficulty" onChange={e => changeRadio(e)}>
                    <Radio.Button value="">全部</Radio.Button>
                    {
                        titleList.difficulty?.map(item => <Radio.Button value={item}>{item}</Radio.Button>)
                    }
                </Radio.Group>
                </div>
                <div style={{ marginTop: 5 }}>
                <span>题型：</span>
                <Radio.Group defaultValue={types} buttonStyle="solid" name="types" onChange={e => changeRadio(e)}>
                    <Radio.Button value="">全部</Radio.Button>
                    {
                        titleList.types?.map(item => <Radio.Button value={item}>{item}</Radio.Button>)
                    }
                </Radio.Group>
                </div>
            </div>
        </div>
    )
}

// const Content: React.FC<ContentStates> = (props) => {

//     console.log(props.subject)

//     const { subject } = props

//     return (
//         <div className={styles.content}>
//         <Top subject={subject}/>
//             Content
//         </div>
//     )
// }

export default Content