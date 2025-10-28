import React, { useState } from 'react';
import { Upload, message, Button, Card, Typography, Progress } from 'antd';
import { UploadOutlined, FileTextOutlined, FilePdfOutlined, FileWordOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const TextUploader = ({ onUploadSuccess }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error('请选择文件后再上传');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // 模拟上传进度
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    // 模拟上传完成
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setUploading(false);
        message.success('文件上传成功');
        
        // 模拟成功上传后的处理
        if (onUploadSuccess) {
          onUploadSuccess({
            id: '12345678-1234-1234-1234-123456789012',
            title: fileList[0].name,
            fileType: fileList[0].type.includes('pdf') ? 'PDF' : 
                     fileList[0].type.includes('word') ? 'Word' : 'TXT'
          });
        }
      }, 500);
    }, 3000);
  };

  const handleRemove = (file) => {
    setFileList(prev => prev.filter(item => item.uid !== file.uid));
  };

  const beforeUpload = (file) => {
    const isSupportedFormat = file.type === 'text/plain' || 
                              file.type === 'application/pdf' || 
                              file.type === 'application/msword' || 
                              file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    
    if (!isSupportedFormat) {
      message.error('请上传TXT、PDF或Word文档格式的文件');
      return false;
    }
    
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('文件大小不能超过5MB');
      return false;
    }
    
    setFileList([file]);
    return false;
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <FilePdfOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />;
    if (fileType.includes('word')) return <FileWordOutlined style={{ fontSize: '48px', color: '#1890ff' }} />;
    return <FileTextOutlined style={{ fontSize: '48px', color: '#52c41a' }} />;
  };

  return (
    <Card className="card">
      <Title level={4} className="card-title">上传文本文件</Title>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <Upload.Dragger
          name="file"
          multiple={false}
          fileList={fileList}
          beforeUpload={beforeUpload}
          onRemove={handleRemove}
          style={{ width: '100%' }}
        >
          <p className="ant-upload-drag-icon">
            {fileList.length > 0 ? 
              getFileIcon(fileList[0].type) : 
              <UploadOutlined style={{ fontSize: '48px' }} />}
          </p>
          <p className="ant-upload-text">
            {fileList.length > 0 ? 
              <Text strong>{fileList[0].name}</Text> : 
              '点击或拖拽文件到此区域上传'}
          </p>
          <p className="ant-upload-hint">
            支持TXT、PDF、Word文档格式，文件大小不超过5MB
          </p>
        </Upload.Dragger>
        
        {uploading && (
          <div style={{ width: '100%' }}>
            <Text>正在上传文件...</Text>
            <Progress percent={uploadProgress} />
          </div>
        )}
        
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0 || uploading}
          loading={uploading}
          style={{ width: '100%' }}
        >
          {uploading ? '上传中...' : '开始上传'}
        </Button>
      </div>
      
      <div className="section-title">产品优势</div>
      <ul style={{ paddingLeft: '20px' }}>
        <li className="mb-2">AI自动识别文本中的主要角色</li>
        <li className="mb-2">支持自定义音色克隆，打造专属声音</li>
        <li className="mb-2">分钟级有声书生成，云端分布式处理</li>
        <li>支持在线播放与离线下载</li>
      </ul>
    </Card>
  );
};

export default TextUploader;
