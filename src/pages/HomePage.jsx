import React from 'react';
import { Button, Card, Typography, Space, Row, Col, List } from 'antd';
import { 
  BookOutlined, 
  SoundOutlined, 
  UserOutlined, 
  PlayCircleOutlined,
  FileTextOutlined,
  RobotOutlined,
  DownloadOutlined,
  UploadOutlined
} from '@ant-design/icons';
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const features = [
    {
      icon: <RobotOutlined style={{ fontSize: '32px', color: '#3b82f6' }} />,
      title: 'AI角色识别',
      description: '智能分析文本内容，自动识别主要角色及其特征'
    },
    {
      icon: <SoundOutlined style={{ fontSize: '32px', color: '#3b82f6' }} />,
      title: '角色化播报',
      description: '为每个角色分配专属音色，实现沉浸式音频体验'
    },
    {
      icon: <UserOutlined style={{ fontSize: '32px', color: '#3b82f6' }} />,
      title: '自定义音色',
      description: '上传音频克隆专属声音，打造个性化有声书'
    },
    {
      icon: <PlayCircleOutlined style={{ fontSize: '32px', color: '#3b82f6' }} />,
      title: '多端播放',
      description: '支持在线播放与离线下载，随时随地享受阅读'
    }
  ];

  const sampleBooks = [
    {
      id: '1',
      title: '《西游记》节选',
      description: '经典名著《西游记》中的精彩片段，包含孙悟空、猪八戒等角色',
      duration: '15:30',
      characters: ['孙悟空', '猪八戒', '唐僧'],
      coverColor: '#3b82f6'
    },
    {
      id: '2',
      title: '《三体》节选',
      description: '刘慈欣科幻巨作《三体》中的经典对话场景',
      duration: '18:45',
      characters: ['叶文洁', '汪淼', '史强'],
      coverColor: '#10b981'
    },
    {
      id: '3',
      title: '《哈利波特》节选',
      description: 'J.K.罗琳经典作品《哈利波特》魔法世界的奇妙冒险',
      duration: '22:15',
      characters: ['哈利', '赫敏', '罗恩'],
      coverColor: '#8b5cf6'
    }
  ];

  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={2} style={{ marginBottom: '16px' }}>
          AI角色化有声书阅读器
        </Title>
        <Paragraph style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto 32px' }}>
          让每一本小说都有声音，让每一个角色都有灵魂。体验AI技术带来的沉浸式阅读，
          或上传您的文本立即生成个性化有声书。
        </Paragraph>
        <Space size="large">
          <Button type="primary" size="large" href="#/upload">
            <UploadOutlined /> 上传文本生成有声书
          </Button>
          <Button size="large" href="#/voices">
            浏览音色库
          </Button>
        </Space>
      </div>

      {/* 现成的示例有声书 */}
      <div style={{ marginBottom: '48px' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '32px' }}>
          精选有声书试听
        </Title>
        <Row gutter={[24, 24]}>
          {sampleBooks.map((book) => (
            <Col xs={24} sm={12} md={8} key={book.id}>
              <Card 
                className="card" 
                style={{ height: '100%' }}
                actions={[
                  <Button type="link" href={`#/player/${book.id}`} key="play">
                    <PlayCircleOutlined /> 试听
                  </Button>,
                  <Button type="link" key="download">
                    <DownloadOutlined /> 下载
                  </Button>
                ]}
              >
                <div style={{ display: 'flex', marginBottom: '16px' }}>
                  <div 
                    style={{ 
                      width: '60px', 
                      height: '80px', 
                      backgroundColor: book.coverColor,
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      marginRight: '16px'
                    }}
                  >
                    书
                  </div>
                  <div>
                    <Title level={4} style={{ margin: '0 0 8px 0' }}>
                      {book.title}
                    </Title>
                    <Paragraph 
                      className="text-muted" 
                      style={{ margin: 0, fontSize: '12px' }}
                    >
                      {book.description}
                    </Paragraph>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>时长: {book.duration}</span>
                  <span>角色: {book.characters.join(', ')}</span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '32px' }}>
          产品核心功能
        </Title>
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card 
                className="card" 
                style={{ height: '100%', textAlign: 'center' }}
              >
                <div style={{ marginBottom: '16px' }}>{feature.icon}</div>
                <Title level={4} style={{ marginBottom: '12px' }}>
                  {feature.title}
                </Title>
                <Paragraph className="text-muted">
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Card className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <Title level={4} style={{ margin: '0 0 8px 0' }}>
              上传您的文本立即生成有声书
            </Title>
            <Paragraph style={{ margin: 0 }}>
              支持TXT、PDF、Word文档格式，AI将自动识别角色并为您生成个性化的有声书
            </Paragraph>
          </div>
          <Button type="primary" size="large" href="#/upload">
            <UploadOutlined /> 上传文本文件
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
