import React, { useState } from 'react';
import { Card, Tabs, Button, Space, Tag, Input, message } from 'antd';
import { SoundOutlined, PlayCircleOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Search } = Input;

const VoiceLibrary = ({ voices, onVoiceSelect, onPreview, onUpload }) => {
  const [searchText, setSearchText] = useState('');
  
  const categories = [
    { key: 'all', label: '全部音色' },
    { key: '情感化', label: '情感化' },
    { key: '多语种', label: '多语种' },
    { key: '动漫游戏', label: '动漫游戏' },
    { key: '历史人物', label: '历史人物' },
    { key: '自定义', label: '自定义' }
  ];
  
  const filteredVoices = voices.filter(voice => {
    if (!searchText) return true;
    return voice.name.toLowerCase().includes(searchText.toLowerCase()) || 
           voice.description.toLowerCase().includes(searchText.toLowerCase());
  });
  
  const handlePreview = (voiceId) => {
    message.info('正在试听音色...');
    if (onPreview) onPreview(voiceId);
  };
  
  const handleSelect = (voiceId) => {
    if (onVoiceSelect) onVoiceSelect(voiceId);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Search
          placeholder="搜索音色名称或描述"
          enterButton={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={onUpload}>
          上传音色
        </Button>
      </div>
      
      <Tabs defaultActiveKey="all">
        {categories.map(category => (
          <TabPane tab={category.label} key={category.key}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {filteredVoices
                .filter(voice => category.key === 'all' || voice.category === category.key || (category.key === '自定义' && voice.is_custom))
                .map(voice => (
                  <Card 
                    key={voice.id}
                    className="card"
                    size="small"
                    actions={[
                      <Button 
                        type="link" 
                        icon={<PlayCircleOutlined />} 
                        onClick={() => handlePreview(voice.id)}
                      >
                        试听
                      </Button>,
                      <Button 
                        type="primary" 
                        size="small" 
                        onClick={() => handleSelect(voice.id)}
                      >
                        使用
                      </Button>
                    ]}
                  >
                    <Card.Meta
                      avatar={<SoundOutlined style={{ fontSize: '24px', color: '#3b82f6' }} />}
                      title={
                        <Space>
                          <span>{voice.name}</span>
                          <Tag color={voice.is_custom ? 'blue' : 'green'}>
                            {voice.category}
                          </Tag>
                        </Space>
                      }
                      description={voice.description}
                    />
                  </Card>
                ))
              }
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default VoiceLibrary;
