import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UploadOutlined,
  SoundOutlined,
  UserOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import TextParsePage from './pages/TextParsePage';
import VoiceAssignPage from './pages/VoiceAssignPage';
import PlayerPage from './pages/PlayerPage';
import VoiceLibraryPage from './pages/VoiceLibraryPage';
import CloneVoicePage from './pages/CloneVoicePage';
import DownloadCenterPage from './pages/DownloadCenterPage';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: '首页' },
    { key: '/upload', icon: <UploadOutlined />, label: '上传文本' },
    { key: '/voices', icon: <SoundOutlined />, label: '音色库' },
    { key: '/clone', icon: <UserOutlined />, label: '音色克隆' },
    { key: '/downloads', icon: <DownloadOutlined />, label: '下载中心' }
  ];

  return (
    <HashRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          theme="light"
          style={{
            background: '#ffffff',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="logo" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>
            AI有声书
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['/']}
            items={menuItems}
            onClick={({ key }) => {
              window.location.hash = `#${key}`;
            }}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: '#ffffff',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: '24px',
              paddingRight: '24px'
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontWeight: 600, color: '#1f2937' }}>AI角色化有声书阅读器</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  U
                </div>
                <span>用户</span>
              </div>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/parse/:id" element={<TextParsePage />} />
                <Route path="/voice/:id" element={<VoiceAssignPage />} />
                <Route path="/player/:id" element={<PlayerPage />} />
                <Route path="/voices" element={<VoiceLibraryPage />} />
                <Route path="/clone" element={<CloneVoicePage />} />
                <Route path="/downloads" element={<DownloadCenterPage />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor: '#ffffff' }}>
            AI有声书阅读器 ©{new Date().getFullYear()} - 让阅读更有声有色
          </Footer>
        </Layout>
      </Layout>
    </HashRouter>
  );
};

export default App;
