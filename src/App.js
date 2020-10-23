import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout} from 'antd'
import Charts from './components/Charts'
const { Content,Sider,Footer,Header } = Layout
function App() {
  return (
    <Layout>
      <Header className="layout-header">自定义Echarts</Header>
      <Layout>
        <Content className="layout-content">
          <Charts></Charts>
        </Content>
        <Sider width={400} theme="light">Sider</Sider>
      </Layout>
      <Footer className="layout-footer">create by weizhanzhan</Footer>
    </Layout>
  );
}

export default App;
