import React from 'react';
import { Layout, Menu, Typography } from 'antd';
// Slyles
import 'antd/dist/antd.css';
import './assets/css/navigation.css';
// Components
import Notes from './Notes';

// Icons
import {
  FileSearchOutlined
} from '@ant-design/icons';
const { Title } = Typography;
const { Header, Sider, Content } = Layout;

class SiderMenu extends React.Component {
  state = {
      // collapsed: false,
      selected: 1
  };


  render() {
      return (
          <Layout>
          <Sider breakpoint="lg" collapsedWidth="0"
            onBreakpoint={broken => {
                // console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                // console.log(collapsed, type);
            }}
            >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
          <Menu.Item key="1" icon={<FileSearchOutlined />} onClick={() => this.setState({selected: 1})}>
          Notas
          </Menu.Item>
          <Menu.Item key="2" icon={<FileSearchOutlined />} onClick={() => this.setState({selected: 2})}>
          Archivos
          </Menu.Item>

      </Menu>
      </Sider>
      <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
      {/* eslint-disable-next-line react/jsx-no-undef */}
  <Title level={4} style={{paddingTop: "20px", paddingLeft:"20px", paddingBottom:"20px"}}>Utilidades Local</Title>
      </Header>
      <Content
      className="site-layout-background"
      style={{
          margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              flex: 'none',

      }}
  >
    {this.state.selected === 1 ? <Notes/> : null}
  </Content>
      </Layout>
      </Layout>
  );
  }
}

export default SiderMenu
