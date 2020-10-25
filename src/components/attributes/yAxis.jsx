import React,{useState} from 'react'
import { Form, Input, Button} from 'antd'
const YAxis = (props)=>{

  const [ yAxis,setYAxis] = useState({
    name:'',
  })
  const handleNameChange = (e) =>{
    const value = e.target.value
    const newY = {...yAxis}
    newY.name = value
    setYAxis(newY)   
  }
 
  
  const renderYxAixs = ()=>{
    const newState = {...props.state}
    newState.yAxis = {...yAxis}
    props.setState(newState)
  }

  return(
    <Form.Item label="Y轴xAxis：" >
      <div className="series-item">
          <Form.Item label="name：" >
            <Input type="text" value={yAxis.name} onChange={handleNameChange} placeholder="y轴名称"/>
          </Form.Item>
         
          <Button type="primary"  onClick={renderYxAixs}>
            更新到图表
          </Button>
      </div>
    </Form.Item>
  )
}
export default YAxis