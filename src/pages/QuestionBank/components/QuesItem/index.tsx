
import React, { useMemo, useState }from 'react';
import { Button } from 'antd'
import { DownCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
// import IFace from '@/pages/quesLib/index.d'
import Style from './index.less'
import { MathJaxContent } from '../MathJaxContent/index'

/* —————————————————————————————————————题目项item————————————————————————————————————— */
const QuesItem: React.FC<IFace.QuesItemProps> = props => {
  const { data, index, onPush, hiddenFooter } = props
  const { description, stem, name, type, answers, difficulty, explanations, comment, options, solutions } = data
  const mainData = useMemo(() => [
    {
      label: "【考点】",
      value: name
    }, {
      label: "【解析】",
      value: solutions
    }, {
      label: "【解答】",
      value: explanations
    }, {
      label: "【答案】",
      value: answers
    }, {
      label: "【点评】",
      value: comment
    }
  ], [data])
  const list = useMemo(() => [description, stem, options].filter(i => i), [data])
  const [show, setShow] = useState(false)
  return <li className={Style.quesItem}>
    {list.map((i, idx) => {
      return i.split('<br/>').map((j, jdx) =>
        <MathJaxContent key={idx + jdx} value={idx === 0 && jdx === 0 ? `${index}.${j}` : j} />
      )
    }
    )}
    {!hiddenFooter && <footer className={Style.quesFooter}>
      <header className={Style.header}>
        <span>
          {`题型：${type}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`难度：${difficulty}`}
        </span>
        <section className={Style.tools}>
          <span className="cursor-pointer" onClick={() => setShow(s => !s)}>
            {show ? <DownCircleOutlined /> : <RightCircleOutlined />}&nbsp;查看解析
          </span>
          &nbsp;
          &nbsp;
          <span>
            <Button type="primary" className={Style.btn} onClick={() => onPush(data)}>加入试题栏</Button>
          </span>
        </section>
      </header>
      {show &&
        <main className={Style.main} >
          {mainData.map((i) => <section className={Style.mainData}>
            <header className={Style.header}>
              {i.label}
            </header>
            {(String(i.value) || '').split('<br/>').map((j, jdx) =>
              <section className={Style.item}>
                <MathJaxContent key={i.label + jdx} value={j} />
              </section>
            )}
            {/* <MathJaxContent key={i.label} value={i.value} /> */}
          </section>)}
        </main>
      }
    </footer>}
  </li>
}

export default QuesItem
