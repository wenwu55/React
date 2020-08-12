import React, { useState, useEffect } from 'react'
import { Menu, Dropdown, Button, Tree } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons';
import { getKnowledge } from '@/services/sider';
import { v4 as uuidv4 } from 'uuid'
import styles from '../../index.less'

const { SubMenu } = Menu;

const PeriodList = [
    { period: '高中', subject: [
      {period: '高中', key: '数学'},
      {period: '高中', key: '语文'},
      {period: '高中', key: '英语'},
      {period: '高中', key: '物理'},
      {period: '高中', key: '化学'},
      {period: '高中', key: '生物'},
      {period: '高中', key: '政治'},
      {period: '高中', key: '历史'},
      {period: '高中', key: '地理'},
    ]},
    { period: '初中', subject: [
      {period: '初中', key: '数学'},
      {period: '初中', key: '语文'},
      {period: '初中', key: '英语'},
      {period: '初中', key: '物理'},
      {period: '初中', key: '化学'},
      {period: '初中', key: '生物'},
      {period: '初中', key: '政治'},
      {period: '初中', key: '历史'},
      {period: '初中', key: '地理'},
  ]},
    { period: '小学', subject: [
      {period: '小学', key: '数学'},
      {period: '小学', key: '语文'},
      {period: '小学', key: '英语'},
  ]}
]

const Sider: React.FC<any> = (props) => {
    
    const [period, setPeriod] = useState('高中')

    const {subject, setSubject} = props

    const [treeData, setTreeData] = useState([])
    
    function getKnow(param: string) {
      const c = getKnowledge({period: param.substring(0, 2), subjectName: param.substring(2, 4)})
      return c
    }

    function mapTree (org) {
      const haveChildren = Array.isArray(org.children) && org.children.length > 0;
      if (haveChildren) {
        return {
            title: org.knowledgeName,
            key: uuidv4(),
            // key: org.identification || 123,
            children: org.children.map(i => mapTree(i))
        }
      } 
      return {
        title: org.knowledgeName,
        key: org.identification
      }
    }

    useEffect(() => {
      const func = async () => {
        const res = await getKnow(subject)
        console.log(res.data[0])
        // res.data[0].map(item => {
        //   console.log(item)
        // })
        const c = res.data[0].map(item => mapTree(item))
        console.log(c)
        setTreeData(c)
      }
      func()
    }, [subject])
 

    function handlerClick (e:any) {
      setSubject(e.key)
    }

    const menu = (
      <Menu
        defaultOpenKeys={[period]}
        defaultSelectedKeys={[subject]}
        // triggerSubMenuAction='click'
      >
        {PeriodList.map((i) => (
          <SubMenu key={i.period} title={i.period} onTitleClick={e => setPeriod(e.key)}>
            {i.subject.map((j) => (
              <Menu.Item
                key={j.period + j.key}
                onClick={e => handlerClick(e)}
                className={styles.item}
              >
                {j.key}
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    )

    function onSelect (e: any) {
      console.log(e)
    }

    return (
      <div className={styles.sider}>
        <Dropdown
          overlay={menu}
          arrow
          placement="bottomCenter"
          className={styles.dropdown}
        >
          <Button
            className={styles.dropdownButton}
            icon={<UnorderedListOutlined />}
          >
            {subject}
          </Button>
        </Dropdown>

        <Tree
          defaultExpandAll
          treeData={treeData}
          onSelect={onSelect}
        />
      </div>
    )
  }
  
export default Sider