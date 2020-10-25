import React, { useState } from 'react'
import { Form, Input, Button} from 'antd'
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

  return(
    <Form.Item label="X轴xAxis：" >
      <div className="series-item">
          <Form.Item label="name：" >
            <Input type="text" value={xAxis.name} onChange={handleNameChange} placeholder="x轴名称"/>
          </Form.Item>
          <Form.Item label="data：" >
            <Input type="text" value={xAxis.data} onChange={handleDataChange} placeholder="逗号','区分数据的集合"/>
          </Form.Item>
          <Button type="primary"  onClick={renderXxAixs}>
            更新到图表
          </Button>
      </div>
    </Form.Item>
  )
}
export default XAxis