import React, { useState, useEffect, useMemo } from 'react'
import { getTitle } from '@/services/sider';
import styles from '../../index.less'
import { Radio } from 'antd'

interface ContentStates {
    subject: string
}

const Top: React.FC<ContentStates> = (props) => {

    const maplist = ['高中', '初中', '小学']

    const { subject } = props

    const [titleList, setTitleList] = useState([])

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
    }, [])

    const data = useMemo(() => {
        const func = async () => {
            const res = await getTitle()
            const title = JSON.parse(res.data[maplist.findIndex(item => item === subject.substring(0, 2))].title)
            const index = title.findIndex(item => item.subjectName === subject.substring(2, 4))
            setTitleList(title[index])
            return title[index]
        }
        func()
    }, [subject])

    function changeRadio (e: any) {
        console.log(e)
      }

    return (
        <div className={styles.top}>
            <div>
            <span>年级：</span>
            <Radio.Group defaultValue="全部" buttonStyle="solid" name="grade" onChange={e => changeRadio(e)}>
                <Radio.Button value="全部">全部</Radio.Button>
                {
                    titleList.grade?.map(item => <Radio.Button value={item}>{item}</Radio.Button>)
                }
            </Radio.Group>
            </div>
            <div style={{ marginTop: 5 }}>
            <span>类型：</span>
            <Radio.Group defaultValue="全部" buttonStyle="solid">
                <Radio.Button value="全部">全部</Radio.Button>
                {
                    titleList.category?.map(item => <Radio.Button value={item}>{item}</Radio.Button>)
                }
            </Radio.Group>
            </div>
            <div style={{ marginTop: 5 }}>
            <span>难度：</span>
            <Radio.Group defaultValue="全部" buttonStyle="solid">
                <Radio.Button value="全部">全部</Radio.Button>
                {
                    titleList.difficulty?.map(item => <Radio.Button value={item}>{item}</Radio.Button>)
                }
            </Radio.Group>
            </div>
            <div style={{ marginTop: 5 }}>
            <span>题型：</span>
            <Radio.Group defaultValue="全部" buttonStyle="solid">
                <Radio.Button value="全部">全部</Radio.Button>
                {
                    titleList.types?.map(item => <Radio.Button value={item}>{item}</Radio.Button>)
                }
            </Radio.Group>
            </div>
        </div>
    )
}

export default Top