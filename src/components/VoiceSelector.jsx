import React from 'react';
import { Card, Select, Button, Space, Avatar, Tag } from 'antd';
import { SoundOutlined, UserOutlined, PlayCircleOutlined } from '@ant-design/icons';

const VoiceSelector = ({ character, voices, selectedVoiceId, onVoiceChange, onPreview }) => {
  const selectedVoice = voices.find(v => v.id === selectedVoiceId);

  return (
    <Card 
      className="card" 
      style={{ marginBottom: '16px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            icon={<UserOutlined />} 
            style={{ backgroundColor: character.color }} 
          />
          <h3 style={{ margin: 0 }}>{character.name}</h3>
        </div>
        
        <Space>
          <Button 
            icon={<PlayCircleOutlined />} 
            onClick={() => onPreview(selectedVoiceId)}
          >
            试听
          </Button>
        </Space>
      </div>
      
      <div className="section-title">选择音色</div>
      <Select
        showSearch
        placeholder="请选择音色"
        optionFilterProp="children"
        value={selectedVoiceId}
        onChange={onVoiceChange}
        style={{ width: '100%' }}
      >
        {voices.map(voice => (
          <Select.Option key={voice.id} value={voice.id}>
            <Space>
              <SoundOutlined />
              <span>{voice.name}</span>
              <Tag color={voice.category === '自定义' ? 'blue' : 'green'}>
                {voice.category}
              </Tag>
            </Space>
          </Select.Option>
        ))}
      </Select>
      
      {selectedVoice && (
        <div className="mt-3">
          <p className="text-muted">{selectedVoice.description}</p>
        </div>
      )}
    </Card>
  );
};

export default VoiceSelector;
