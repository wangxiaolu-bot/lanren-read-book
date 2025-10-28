import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { SoundOutlined, PlusOutlined } from '@ant-design/icons';
import VoiceLibrary from '../components/VoiceLibrary';

const VoiceLibraryPage = () => {
  const [voices, setVoices] = useState([]);

  // 模拟加载音色数据
  useEffect(() => {
    // 模拟API调用
    setTimeout(() => {
      setVoices([
        { 
          id: '11111111-1111-1111-1111-111111111111', 
          name: '沉稳男声', 
          description: '成熟稳重的中年男性音色，适合扮演权威角色', 
          category: '情感化',
          is_custom: false
        },
        { 
          id: '22222222-2222-2222-2222-222222222222', 
          name: '活泼童声', 
          description: '天真可爱的儿童音色，适合表现年轻角色', 
          category: '情感化',
          is_custom: false
        },
        { 
          id: '33333333-3333-3333-3333-333333333333', 
          name: '温柔女声', 
          description: '温柔体贴的女性音色，适合表现母亲、恋人等角色', 
          category: '情感化',
          is_custom: false
        },
        { 
          id: '44444444-4444-4444-4444-444444444444', 
          name: '激昂演讲', 
          description: '富有激情和感染力的演讲音色，适合表现领袖角色', 
          category: '情感化',
          is_custom: false
        },
        { 
          id: '55555555-5555-5555-5555-555555555555', 
          name: '神秘低语', 
          description: '神秘感十足的低语音色，适合表现神秘角色', 
          category: '情感化',
          is_custom: false
        },
        { 
          id: '66666666-6666-6666-6666-666666666666', 
          name: '英式绅士', 
          description: '标准英式口音的绅士音色，适合表现贵族角色', 
          category: '多语种',
          is_custom: false
        },
        { 
          id: '77777777-7777-7777-7777-777777777777', 
          name: '法式优雅', 
          description: '带有法式口音的优雅女性音色，适合表现浪漫角色', 
          category: '多语种',
          is_custom: false
        },
        { 
          id: '88888888-8888-8888-8888-888888888888', 
          name: '日系萌声', 
          description: '带有日系风格的可爱音色，适合表现动漫角色', 
          category: '动漫游戏',
          is_custom: false
        },
        { 
          id: '99999999-9999-9999-9999-999999999999', 
          name: '战士怒吼', 
          description: '充满力量的战士音色，适合表现勇猛角色', 
          category: '动漫游戏',
          is_custom: false
        },
        { 
          id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
          name: '古风帝王', 
          description: '古代帝王的威严音色，适合表现历史人物', 
          category: '历史人物',
          is_custom: false
        },
        { 
          id: 'custom-12345', 
          name: '小明的声音', 
          description: '用户自定义音色，基于上传音频克隆', 
          category: '自定义',
          is_custom: true
        }
      ]);
    }, 500);
  }, []);

  const handleVoiceSelect = (voiceId) => {
    message.success('音色已选择');
    // 在实际应用中，可以将音色应用到当前项目
  };

  const handlePreview = (voiceId) => {
    message.info('正在试听音色...');
  };

  const handleUpload = () => {
    window.location.hash = '#/clone';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">音色库</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleUpload}
        >
          上传音色
        </Button>
      </div>
      
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <SoundOutlined style={{ fontSize: '24px', color: '#3b82f6' }} />
          <h3 className="card-title" style={{ margin: 0 }}>系统音色</h3>
        </div>
        <p className="text-muted">
          选择系统提供的音色或上传自定义音色，为您的有声书增添个性化色彩
        </p>
      </div>
      
      <VoiceLibrary
        voices={voices}
        onVoiceSelect={handleVoiceSelect}
        onPreview={handlePreview}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default VoiceLibraryPage;
