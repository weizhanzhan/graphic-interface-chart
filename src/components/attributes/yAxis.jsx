import React,{useState} from 'react'
import { Form, Input, Button} from 'antd'
import { RetweetOutlined } from '@ant-design/icons'
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

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return(
    <div>
      <h3>yAxis：</h3>
      <Form {...layout} size="small" name="yAxis" labelAlign="left">
          <div className="series-item">
            <Form.Item label="name：" >
              <Input type="text" value={yAxis.name} onChange={handleNameChange} placeholder="y轴名称"/>
            </Form.Item>
            <Form.Item label="" >
              <Button type="primary"  onClick={renderYxAixs} icon={ <RetweetOutlined/>}>
                更新
              </Button>
            </Form.Item>
           
        </div>
      </Form>
    </div>
  )
}
export default YAxis