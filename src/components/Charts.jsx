import React,{useEffect,useRef} from 'react';
import echarts from 'echarts'
function Charts(props) {
  let chartInstance = null;
  const main = useRef(null);

  let renderChart = () =>{
    const myChart = echarts.getInstanceByDom(main.current) 
    if(myChart){
      chartInstance = myChart
    }else{
      chartInstance = echarts.init(main)
    }
    chartInstance.setOption(props.option,true)
 
  }

  let initChart = () => {
    let element = document.getElementById('main');
    let myChart = echarts.init(element);
 
    myChart.setOption({});
  };

  useEffect(() => {
    console.log('更新')
    initChart()
    renderChart()
  })
  return (
   <div>
      <div id="main" style={{width:600,height:400,margin:'0 auto'}} ref={main}>123</div>     
    
   </div>
  );
}

export default Charts;
