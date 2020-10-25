import React,{useState} from 'react'
import { Form, Input, Button,Radio } from 'antd'
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
    // const currentIndex = props.state.legend.data.indexOf(series.name)
    // if(currentIndex !== -1){
    //   newState.legend.data[currentIndex] = series.name
    //   newState.series[currentIndex] = {
    //     name:series.name,
    //     type:series.type,
    //     data:series.data
    //   }
    // }else{
    //   newState.legend.data.push(series.name)
    //   newState.series.push({
    //     name:series.name,
    //     type:series.type,
    //     data:series.data
    //   })
    // }
    props.setState(newState)
  }
  return (
    <Form.Item label="数据series：" >
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
              <Button type="primary"  onClick={()=>{renderSeries(serie,index)}}>
                更新到图表
              </Button>
              <Button type="danger" style={{marginLeft:12}}  onClick={()=>{deleteSeries(serie,index)}}>
                移除
              </Button>
            </div>
          )
        })
      }
      </div>
      <Button type="primary"  onClick={handleCreateSeries}>
        添加一条数据
      </Button>
      {/* <Button type="primary"  onClick={()=>{handleCreateSeries('bar')}} style={{marginLeft:12}}>
        添加一条柱状图
      </Button> */}
    </Form.Item>
  )
}
export default Series