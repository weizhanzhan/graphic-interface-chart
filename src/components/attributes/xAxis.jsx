import React, { useState } from 'react'
import { Form, Input, Button} from 'antd'
import { RetweetOutlined } from '@ant-design/icons'
const XAxis = (props)=>{

  const [ xAxis,setXAxis] = useState({
    name:'',
    data:''
  })
  const handleNameChange = (e) =>{
    const value = e.target.value
    const newX = {...xAxis}
    newX.name = value
    setXAxis(newX)   
  }
  const handleDataChange = (e) =>{
    const value = e.target.value.split(',')
    const newX = {...xAxis}
    newX.data = value
    setXAxis(newX)   
  }

  
  const renderXxAixs = ()=>{
    const newState = {...props.state}
    newState.xAxis = {...xAxis}
    props.setState(newState)
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return(
    <div>
      <h3>xAxis:</h3>
      <Form name="xAxis"  {...layout}  size="small"  labelAlign="left">
        <div className="series-item">
            <Form.Item label="name：" >
              <Input type="text" value={xAxis.name} onChange={handleNameChange} placeholder="x轴名称"/>
            </Form.Item>
            <Form.Item label="data：" >
              <Input type="text" value={xAxis.data} onChange={handleDataChange} placeholder="逗号','区分数据的集合"/>
            </Form.Item>
            <Form.Item label="" >
              <Button type="primary"  onClick={renderXxAixs} icon={ <RetweetOutlined/> }>
                更新
              </Button>
            </Form.Item>
           
        </div> 
      </Form>
    </div>
  )
}
export default XAxis