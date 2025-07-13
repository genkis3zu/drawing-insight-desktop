import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { FileImageOutlined, TableOutlined, SettingOutlined } from '@ant-design/icons';
import FileUpload from './components/FileUpload';
import AnalysisProgress from './components/AnalysisProgress';
import ResultTable from './components/ResultTable';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('upload');
  const [collapsed, setCollapsed] = useState(false);

  const renderContent = () => {
    switch (selectedKey) {
      case 'upload':
        return (
          <>
            <FileUpload />
            <AnalysisProgress />
          </>
        );
      case 'results':
        return <ResultTable />;
      case 'settings':
        return <div>設定画面（実装予定）</div>;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={[
            {
              key: 'upload',
              icon: <FileImageOutlined />,
              label: '図面アップロード',
            },
            {
              key: 'results',
              icon: <TableOutlined />,
              label: '解析結果',
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: '設定',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Title level={3} style={{ margin: '16px 24px' }}>
            Drawing Insight Desktop
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;