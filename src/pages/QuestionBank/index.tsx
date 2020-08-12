import React, { useState } from 'react';
import styles from './index.less'
import Content from './components/Content'
import Sider from './components/Sider'

const QuestionBank: React.FC<{}> = () => {

  const [subject, setSubject] = useState('高中数学')

  // console.log(subject, 'main')

  return (
    <div className={styles.main}>
      {/* <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout> */}
      <Sider subject={subject} setSubject={setSubject} />
      <Content subject={subject} />
    </div>
  )
};

export default QuestionBank;
