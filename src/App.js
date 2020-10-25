import React,{useState,useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout} from 'antd'
import Charts from './components/Charts'
import { Form, Input, Button, Select  } from 'antd';
import { toJSON } from './utils/toJSON'
import Series from './components/attributes/series';
import XAxis from './components/attributes/xAxis';
import YAxis from './components/attributes/yAxis';
const { Content,Sider,Footer,Header } = Layout

const OPTIONS = ['xAxis', 'yAxis', 'series'];
const option = {
 
  xAxis: {
      data: []
  },
  yAxis: {
  },
};





function App() {
  
  const [ state, setState] = useState(option)
  const [ selectedAttrs,setSelectedAttrs] = useState(['xAxis','yAxis'])
  const filteredAttrs = OPTIONS.filter(o => !selectedAttrs.includes(o));


  const handleSelectAttr = (select) =>{
    console.log(select[select.length-1])
    if(select.indexOf('xAxis') === -1){
      select.push('xAxis')
    }
    if(select.indexOf('yAxis') === -1){
      select.push('yAxis')
    }
    setSelectedAttrs(select)
  }
  useEffect(() => {
    // console.log('更新')
  }, [])

 
 

  const onFinish = values => {
    console.log('Success:', values);
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }

  const appenedStateAttribute = (attrs)=>{
    const newState = {...state}
    attrs.forEach(item=>{
      newState[item.key] = item.value
    })
    setState(newState)
  }

 

  const handleTitleChange = (newtitle) => {
    const newState = {...state}
    newState.title.text = newtitle.target.value
    setState(newState)
  }

  


  return (
    <Layout>
      <Header className="layout-header">自定义Echarts</Header>
      <Layout>
        <Content className="layout-content">
          <Charts option={ state }></Charts>
         <textarea value={toJSON(state)} readOnly style={{width:'100%'}} rows={12}></textarea>
        </Content>
        <Sider width={600} theme="light" style={{padding:20,overflow:'auto'}}>
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          value={selectedAttrs}
          onChange={handleSelectAttr}
          style={{ width: '100%',marginBottom:20 }}
        >
          {filteredAttrs.map(item => (
            <Select.Option key={item} value={item} >
              {item}
            </Select.Option>
          ))}
        </Select>
        <Form
          layout="vertical"
          name="basic"
          size="small"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          { state.title && <Form.Item  label="标题"  name="title" >
            <Input type="text" value={state.title.text} onChange={handleTitleChange}/>
          </Form.Item>}
          
          <XAxis state={state} setState={setState}></XAxis>
          <YAxis state={state} setState={setState}></YAxis>
          <Series appenedStateAttribute={appenedStateAttribute} state={state} setState={setState}></Series>
        </Form>
        </Sider>
      </Layout>
      <Footer className="layout-footer">create by weizhanzhan</Footer>
    </Layout>
  );
}

export default App;
