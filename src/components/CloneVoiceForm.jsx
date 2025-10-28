import React, { useState } from 'react';
import { Card, Upload, Button, Input, Progress, message, Space } from 'antd';
import { UploadOutlined, PlayCircleOutlined, SoundOutlined } from '@ant-design/icons';

const CloneVoiceForm = ({ onCloneSuccess }) => {
  const [fileList, setFileList] = useState([]);
  const [voiceName, setVoiceName] = useState('');
  const [cloning, setCloning] = useState(false);
  const [cloneProgress, setCloneProgress] = useState(0);
  const [cloned, setCloned] = useState(false);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
    return false;
  };

  const handleRemove = () => {
    setFileList([]);
  };

  const handleClone = () => {
    if (fileList.length === 0) {
      message.error('请先上传音频文件');
      return;
    }
    
    if (!voiceName.trim()) {
      message.error('请为音色命名');
      return;
    }

    setCloning(true);
    setCloneProgress(0);

    // 模拟音色克隆过程
    const interval = setInterval(() => {
      setCloneProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setCloning(false);
      setCloned(true);
      message.success('音色克隆成功！');
      
      if (onCloneSuccess) {
        onCloneSuccess({
          id: `custom-${Date.now()}`,
          name: voiceName,
          description: `基于上传音频克隆的自定义音色`,
          category: '自定义',
          is_custom: true
        });
      }
    }, 4000);
  };

  const handlePreview = () => {
    message.info('正在预览克隆音色...');
  };

  return (
    <Card className="card">
      <h3 className="card-title">音色克隆</h3>
      <p className="text-muted mb-4">
        上传一段清晰的音频（建议时长不少于30秒），系统将基于此音频克隆出新的音色。
      </p>
      
      <div className="section-title">上传音频</div>
      <Upload.Dragger
        name="audio"
        multiple={false}
        fileList={fileList}
        beforeUpload={() => false}
        onChange={handleUpload}
        onRemove={handleRemove}
        accept="audio/*"
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">
          {fileList.length > 0 ? fileList[0].name : '点击或拖拽音频文件到此区域上传'}
        </p>
        <p className="ant-upload-hint">
          支持MP3、WAV、FLAC等常见音频格式，建议时长不少于30秒
        </p>
      </Upload.Dragger>
      
      <div className="section-title mt-4">音色名称</div>
      <Input
        placeholder="为您的自定义音色命名"
        value={voiceName}
        onChange={e => setVoiceName(e.target.value)}
        disabled={cloning}
      />
      
      {cloning && (
        <div className="mt-4">
          <div className="mb-2">正在克隆音色...</div>
          <Progress percent={cloneProgress} />
        </div>
      )}
      
      {cloned && (
        <div className="mt-4 card" style={{ backgroundColor: '#f0f9ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <SoundOutlined style={{ fontSize: '24px', color: '#3b82f6' }} />
              <div>
                <div style={{ fontWeight: '500' }}>{voiceName}</div>
                <div className="text-muted text-sm">音色克隆成功</div>
              </div>
            </div>
            <Button icon={<PlayCircleOutlined />} onClick={handlePreview}>
              试听
            </Button>
          </div>
        </div>
      )}
      
      <Button
        type="primary"
        onClick={handleClone}
        loading={cloning}
        disabled={cloning || fileList.length === 0 || !voiceName.trim()}
        style={{ width: '100%', marginTop: '16px' }}
      >
        {cloning ? '克隆中...' : '开始克隆'}
      </Button>
    </Card>
  );
};

export default CloneVoiceForm;
