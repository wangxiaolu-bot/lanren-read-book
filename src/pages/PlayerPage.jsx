import React, { useState, useEffect } from 'react';
import { Button, message, Typography, Progress, Space, List, Avatar } from 'antd';
import { useParams } from 'react-router-dom';
import { LoadingOutlined, PlayCircleOutlined, DownloadOutlined, UserOutlined } from '@ant-design/icons';
import AudioPlayer from '../components/AudioPlayer';

const { Title, Paragraph } = Typography;

const PlayerPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [bookInfo, setBookInfo] = useState({});

  // 模拟数据
  const sampleBooks = {
'1': {
  title: '《西游记》节选',
  description: '经典名著《西游记》中的精彩片段',
  duration: '15:30',
  characters: [
    { name: '孙悟空', voice: '激昂演讲', color: '#3b82f6' },
    { name: '猪八戒', voice: '活泼童声', color: '#10b981' },
    { name: '唐僧', voice: '沉稳男声', color: '#8b5cf6' }
  ]
},
'2': {
  title: '《三体》节选',
  description: '刘慈欣科幻巨作《三体》中的经典对话场景',
  duration: '18:45',
  characters: [
    { name: '叶文洁', voice: '温柔女声', color: '#3b82f6' },
    { name: '汪淼', voice: '沉稳男声', color: '#10b981' },
    { name: '史强', voice: '战士怒吼', color: '#8b5cf6' }
  ]
},
'3': {
  title: '《哈利波特》节选',
  description: 'J.K.罗琳经典作品《哈利波特》魔法世界的奇妙冒险',
  duration: '22:15',
  characters: [
    { name: '哈利', voice: '少年音色', color: '#3b82f6' },
    { name: '赫敏', voice: '温柔女声', color: '#10b981' },
    { name: '罗恩', voice: '活泼童声', color: '#8b5cf6' }
  ]
}
  };

  // 模拟生成进度
  useEffect(() => {
// 模拟加载数据
setTimeout(() => {
  const book = sampleBooks[id] || {
    title: '示例有声书',
    description: '基于您分配的音色生成的个性化有声书',
    duration: '20:00',
    characters: [
      { name: '角色1', voice: '沉稳男声', color: '#3b82f6' },
      { name: '角色2', voice: '温柔女声', color: '#10b981' }
    ]
  };
  
  setBookInfo(book);
  
  // 设置章节数据
  setChapters([
    { id: '1', title: '第一章：初遇', duration: 180 },
    { id: '2', title: '第二章：深入交流', duration: 240 },
    { id: '3', title: '第三章：面临挑战', duration: 300 },
    { id: '4', title: '第四章：携手合作', duration: 210 },
    { id: '5', title: '第五章：最终成功', duration: 270 }
  ]);
  
  // 模拟生成进度
  if (id && sampleBooks[id]) {
    // 现成的有声书，直接加载
    setLoading(false);
    setGenerating(false);
  } else {
    // 新生成的有声书，显示进度
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setLoading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }
}, 1000);
  }, [id]);

  const handleDownload = () => {
message.success('开始下载有声书...');
// 实际应用中会触发下载
  };

  return (
<div className="page-container">
  <div className="page-header">
    <h1 className="page-title">有声书播放</h1>
  </div>
  
  {loading ? (
    <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
      {generating ? (
        <>
          <LoadingOutlined style={{ fontSize: '32px', color: '#3b82f6' }} />
          <Title level={4} className="mt-3">正在加载有声书</Title>
          <Paragraph className="text-muted">
            正在为您准备个性化的有声书，请稍候...
          </Paragraph>
          <div style={{ width: '80%', margin: '24px auto 0' }}>
            <Progress percent={progress} />
          </div>
          <Paragraph className="text-muted mt-3">
            {progress}% 完成
          </Paragraph>
        </>
      ) : (
        <>
          <PlayCircleOutlined style={{ fontSize: '32px', color: '#10b981' }} />
          <Title level={4} className="mt-3">有声书加载完成</Title>
          <Button 
            type="primary" 
            size="large" 
            className="mt-4"
            onClick={() => setLoading(false)}
          >
            开始播放
          </Button>
        </>
      )}
    </div>
  ) : (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={4} style={{ margin: 0 }}>{bookInfo.title}</Title>
            <Paragraph className="text-muted mt-2">
              {bookInfo.description}
            </Paragraph>
          </div>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            下载MP3
          </Button>
        </div>
      </div>
      
      <AudioPlayer 
        audioUrl="https://example.com/sample-audiobook.mp3"
        chapters={chapters}
      />
      
      <div className="card">
        <Title level={4} className="card-title">角色音色</Title>
        <List
          dataSource={bookInfo.characters}
          renderItem={(character) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar 
                    icon={<UserOutlined />} 
                    style={{ backgroundColor: character.color }} 
                  />
                }
                title={character.name}
                description={`音色: ${character.voice}`}
              />
            </List.Item>
          )}
        />
      </div>
      
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            type="primary" 
            size="large" 
            href="#/upload"
          >
            上传文本生成新的有声书
          </Button>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default PlayerPage;
