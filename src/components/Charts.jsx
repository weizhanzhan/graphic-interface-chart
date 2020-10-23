import React,{useEffect, useState,useRef} from 'react';
import echarts from 'echarts'
function Charts() {
  const [ count ,setCount ] = useState(12)
  let chartInstance = null;
  const main = useRef(null);

  let renderChart = () =>{
    console.log(main.current);
    const myChart = echarts.getInstanceByDom(main.current) 
    if(myChart){
      chartInstance = myChart
    }else{
      chartInstance = echarts.init(main)
    }
    chartInstance.setOption({
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }]
    })
  }

  let initChart = () => {
    let element = document.getElementById('main');
    let myChart = echarts.init(element);
    let option = {
        title: {
            text: 'ECharts 入门示例',
        },
        tooltip: {
        },
        legend: {
            data:['销量', '利润', '比率']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {
        },
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            },
            {
                name: '利润',
                type: 'bar',
                data: [30, 25, 15, 20, 20, 35]
            },
            {
                name: '比率',
                type: 'line',
                data: [35, 30, 20, 25, 25, 40]
            }]
    };
    myChart.setOption(option);
  };

  useEffect(() => {
    console.log(1234);
    initChart()
    renderChart()
  })
  return (
   <div>
      <div id="main" style={{width:400,height:400}} ref={main}>123</div>     
      <div>{ count }</div>
      <button onClick={()=>{
        setCount(count+1)
      }}>increase</button>
   </div>
  );
}

export default Charts;
