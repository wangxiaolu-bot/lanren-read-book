import React, { useState, useEffect } from 'react';
import { List, Avatar, Button, Tag, message, Progress } from 'antd';
import { DownloadOutlined, SoundOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';

const DownloadCenterPage = () => {
  const [downloads, setDownloads] = useState([]);

  // 模拟加载下载任务数据
  useEffect(() => {
    // 模拟API调用
    setTimeout(() => {
      setDownloads([
        {
          id: '1',
          title: '《三体》有声书',
          status: 'completed',
          progress: 100,
          duration: '12:45:32',
          size: '256MB',
          createdAt: '2023-05-15 14:30'
        },
        {
          id: '2',
          title: '《银河系漫游指南》有声书',
          status: 'processing',
          progress: 65,
          duration: '8:22:15',
          size: '182MB',
          createdAt: '2023-05-16 09:15'
        },
        {
          id: '3',
          title: '《哈利波特与魔法石》有声书',
          status: 'completed',
          progress: 100,
          duration: '9:15:40',
          size: '210MB',
          createdAt: '2023-05-10 16:45'
        },
        {
          id: '4',
          title: '《红楼梦》有声书',
          status: 'failed',
          progress: 30,
          duration: '0:00:00',
          size: '0MB',
          createdAt: '2023-05-17 11:20'
        }
      ]);
    }, 500);
  }, []);

  const getStatusTag = (status) => {
    switch (status) {
      case 'completed':
        return <Tag icon={<CheckCircleOutlined />} color="success">已完成</Tag>;
      case 'processing':
        return <Tag icon={<SyncOutlined spin />} color="processing">生成中</Tag>;
      case 'failed':
        return <Tag icon={<CloseCircleOutlined />} color="error">失败</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'processing':
        return '生成中';
      case 'failed':
        return '生成失败';
      default:
        return '未知状态';
    }
  };

  const handleDownload = (id) => {
    const download = downloads.find(d => d.id === id);
    if (download.status === 'completed') {
      message.success(`开始下载"${download.title}"...`);
      // 实际应用中会触发下载
    } else {
      message.warning('该有声书尚未生成完成');
    }
  };

  const handleRetry = (id) => {
    message.info('正在重新生成有声书...');
    // 实际应用中会重新触发生成任务
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">下载中心</h1>
      </div>
      
      <div className="card">
        <h3 className="card-title">有声书下载任务</h3>
        <List
          itemLayout="horizontal"
          dataSource={downloads}
          renderItem={(item) => (
            <List.Item
              actions={[
                item.status === 'completed' ? (
                  <Button 
                    type="primary" 
                    icon={<DownloadOutlined />} 
                    onClick={() => handleDownload(item.id)}
                  >
                    下载
                  </Button>
                ) : item.status === 'failed' ? (
                  <Button 
                    onClick={() => handleRetry(item.id)}
                  >
                    重试
                  </Button>
                ) : null
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar 
                    icon={<SoundOutlined />} 
                    style={{ backgroundColor: '#3b82f6' }} 
                  />
                }
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span>{item.title}</span>
                    {getStatusTag(item.status)}
                  </div>
                }
                description={
                  <div>
                    <div>创建时间: {item.createdAt}</div>
                    <div>时长: {item.duration} | 大小: {item.size}</div>
                    {item.status === 'processing' && (
                      <div style={{ width: '200px', marginTop: '8px' }}>
                        <Progress percent={item.progress} size="small" />
                      </div>
                    )}
                  </div>
                }
              />
              <div>
                {item.status === 'processing' && (
                  <div className="text-muted">
                    预计剩余时间: {Math.round((100 - item.progress) * 2.5)}分钟
                  </div>
                )}
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default DownloadCenterPage;
