import React, { useState, useEffect } from 'react';
import { Button, message, Typography, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingOutlined, CheckCircleOutlined, SoundOutlined } from '@ant-design/icons';
import VoiceSelector from '../components/VoiceSelector';
import VoiceLibrary from '../components/VoiceLibrary';

const { Title, Paragraph } = Typography;

const VoiceAssignPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [voices, setVoices] = useState([]);
  const [voiceAssignments, setVoiceAssignments] = useState({});
  const [previewVoiceId, setPreviewVoiceId] = useState(null);

  // 模拟加载数据
  useEffect(() => {
    // 模拟加载角色数据
    setTimeout(() => {
      setCharacters([
        { id: '1', name: '李明', color: '#3b82f6' },
        { id: '2', name: '张华', color: '#10b981' },
        { id: '3', name: '王老板', color: '#8b5cf6' }
      ]);
      
      // 模拟加载音色数据
      setTimeout(() => {
        const sampleVoices = [
          { 
            id: '11111111-1111-1111-1111-111111111111', 
            name: '沉稳男声', 
            description: '成熟稳重的中年男性音色', 
            category: '情感化',
            is_custom: false
          },
          { 
            id: '22222222-2222-2222-2222-222222222222', 
            name: '活泼童声', 
            description: '天真可爱的儿童音色', 
            category: '情感化',
            is_custom: false
          },
          { 
            id: '33333333-3333-3333-3333-333333333333', 
            name: '温柔女声', 
            description: '温柔体贴的女性音色', 
            category: '情感化',
            is_custom: false
          },
          { 
            id: '44444444-4444-4444-4444-444444444444', 
            name: '激昂演讲', 
            description: '富有激情和感染力的演讲音色', 
            category: '情感化',
            is_custom: false
          },
          { 
            id: 'custom-12345', 
            name: '小明的声音', 
            description: '用户自定义音色', 
            category: '自定义',
            is_custom: true
          }
        ];
        
        setVoices(sampleVoices);
        
        // 设置默认音色分配
        const defaultAssignments = {};
        characters.forEach((char, index) => {
          defaultAssignments[char.id] = sampleVoices[index % sampleVoices.length].id;
        });
        setVoiceAssignments(defaultAssignments);
        
        setLoading(false);
      }, 1000);
    }, 1000);
  }, [id]);

  const handleVoiceChange = (characterId, voiceId) => {
    setVoiceAssignments(prev => ({
      ...prev,
      [characterId]: voiceId
    }));
  };

  const handlePreview = (voiceId) => {
    setPreviewVoiceId(voiceId);
    // 模拟试听
    message.info('正在试听音色...');
  };

  const handleVoiceSelect = (voiceId) => {
    // 在实际应用中，会应用到选中的角色
    message.success('音色已选择，可应用到角色上');
  };

  const handleUploadVoice = () => {
    navigate('/clone');
  };

  const handleGenerate = () => {
    // 检查是否所有角色都已分配音色
    const allAssigned = characters.every(char => voiceAssignments[char.id]);
    if (!allAssigned) {
      message.error('请为所有角色分配音色');
      return;
    }
    
    Modal.confirm({
      title: '确认生成有声书',
      content: '系统将根据您分配的音色生成有声书，预计需要2-3分钟，是否继续？',
      okText: '确认生成',
      cancelText: '取消',
      onOk: () => {
        message.success('开始生成有声书...');
        // 跳转到播放页面
        setTimeout(() => {
          navigate(`/player/${id}`);
        }, 2000);
      }
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">音色分配</h1>
      </div>
      
      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <LoadingOutlined style={{ fontSize: '32px', color: '#3b82f6' }} />
          <Paragraph className="mt-3">正在加载数据...</Paragraph>
        </div>
      ) : (
        <div>
          <div className="card">
            <Title level={4} className="card-title">为角色分配音色</Title>
            <Paragraph className="text-muted">
              为每个角色选择合适的音色，打造个性化的有声书体验
            </Paragraph>
          </div>
          
          {characters.map(character => (
            <VoiceSelector
              key={character.id}
              character={character}
              voices={voices}
              selectedVoiceId={voiceAssignments[character.id]}
              onVoiceChange={(voiceId) => handleVoiceChange(character.id, voiceId)}
              onPreview={handlePreview}
            />
          ))}
          
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={4} style={{ margin: 0 }}>音色库</Title>
                <Paragraph className="text-muted mt-2">
                  浏览更多音色或上传自定义音色
                </Paragraph>
              </div>
              <Button 
                type="primary" 
                icon={<SoundOutlined />}
                onClick={handleUploadVoice}
              >
                上传自定义音色
              </Button>
            </div>
            
            <VoiceLibrary
              voices={voices}
              onVoiceSelect={handleVoiceSelect}
              onPreview={handlePreview}
              onUpload={handleUploadVoice}
            />
          </div>
          
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                type="primary" 
                size="large" 
                onClick={handleGenerate}
                icon={<CheckCircleOutlined />}
              >
                生成有声书
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssignPage;
