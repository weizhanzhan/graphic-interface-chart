import React,{useState} from 'react'
import { Form, Input, Button,Radio } from 'antd'
import { RetweetOutlined } from '@ant-design/icons'
const Series = (props)=>{

  const [ series ,setSeries ] = useState([])

  // series改变
  const handleBarSeriesChange =(e,type,index)=>{
    const newBars = [...series]
    if(type === 1){
      newBars[index].name = e.target.value
    }else{
      newBars[index].data = e.target.value.split(',')
    }
    setSeries(newBars)
  }

  const deleteSeries = (serie,index) =>{
    const { state , setState } = props
    const newSeries = [...series]
    newSeries.splice(index,1)
   
    const currentIndexInSeries = state.series.findIndex(s=>s.name === serie.name)
    if(currentIndexInSeries !== -1){
      const newState = {...state}
      newState.series.splice(currentIndexInSeries,1)
      newState.legend.data.splice(currentIndexInSeries,1)
      setState(newState)
    }
    setSeries(newSeries)
  }

  const handleCreateSeries =()=>{
    const { state ,appenedStateAttribute} = props
    if(!state.legend && !state.series){
      appenedStateAttribute([
        { key:'legend',value:{data:[]}},
        { key:'series',value:[]}
      ])
    }


    const newSeries = [...series]
    newSeries.push(
       {
          name: '',
          type:'line',
          data: []
      }
    )
    setSeries(newSeries)
  }

  const onTypeChange =(e,i)=>{
    const newSeries = [...series]
    newSeries[i].type = e.target.value
    setSeries(newSeries)
  }

  const renderSeries =(serie,index)=>{
    const newState = {...props.state}

    if(props.state.legend.data[index]){
      newState.legend.data[index] = serie.name
      newState.series[index] = {
        name:serie.name,
        type:serie.type,
        data:serie.data
      }
    }else{
      newState.legend.data.push(serie.name)
      newState.series.push({
        name:serie.name,
        type:serie.type,
        data:serie.data
      })
    }
   
    props.setState(newState)
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
    <div>
      <h3>series：</h3>
      <Form {...layout} name="series" size="small" labelAlign="left">
        <div>
        {
          series.map((serie,index)=>{
            return (
              <div key={index} className="series-item">
                {/* 加key是为了 react 重绘时 这个节点不会更新为新的节点 ，如果不设置 输入框输入一次就会失去焦点 */}
                <Form.Item label="type"   >
                  <Radio.Group onChange={(e)=>{onTypeChange(e,index)}} value={serie.type}>
                    <Radio value="line">折线图</Radio>
                    <Radio value="bar">柱状图</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label='name' >
                  <Input type="text" value={serie.name} onChange={(e)=>{handleBarSeriesChange(e,1,index)}}/>
                </Form.Item>
                <Form.Item label='data' >
                  <Input type="text" value={serie.data} onChange={(e)=>{handleBarSeriesChange(e,2,index)}}/>
                </Form.Item>
                <Form.Item label='' >
                  <Button type="primary"  onClick={()=>{renderSeries(serie,index)}} icon={ <RetweetOutlined/>}>
                    更新
                  </Button>
                  <Button type="danger" style={{marginLeft:12}}  onClick={()=>{deleteSeries(serie,index)}}>
                    移除
                  </Button>
                </Form.Item>
               
              </div>
            )
          })
        }
        </div>
        <Button type="primary" style={{marginBottom:16}}  onClick={handleCreateSeries}>
          添加series
        </Button>
      </Form>
    </div>
  )
}
export default Series