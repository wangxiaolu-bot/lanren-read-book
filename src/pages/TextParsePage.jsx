import React, { useState, useEffect } from 'react';
import { Button, message, Typography, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import CharacterList from '../components/CharacterList';

const { Title, Paragraph } = Typography;

const TextParsePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [textPreview, setTextPreview] = useState('');
  const [characters, setCharacters] = useState([]);

  // 模拟文本解析过程
  useEffect(() => {
    // 模拟加载文本内容
    setTimeout(() => {
      setTextPreview(`这是一段示例文本，用于展示文本解析功能。在这段文本中，有几个主要角色会出现。李明是一位年轻的程序员，他正在开发一款创新的AI应用。张华是他的同事，也是一位经验丰富的设计师。王老板是他们的上司，对这个项目寄予厚望。李明和张华经常讨论技术问题，而王老板则更关注项目的商业价值。在这个故事中，这些角色将展开精彩的互动。`);
      
      // 模拟识别角色
      setTimeout(() => {
        setCharacters([
          { 
            id: '1', 
            name: '李明', 
            appearanceCount: 12, 
            dialogueCount: 8, 
            importance: '主要',
            color: '#3b82f6'
          },
          { 
            id: '2', 
            name: '张华', 
            appearanceCount: 9, 
            dialogueCount: 6, 
            importance: '主要',
            color: '#10b981'
          },
          { 
            id: '3', 
            name: '王老板', 
            appearanceCount: 7, 
            dialogueCount: 4, 
            importance: '主要',
            color: '#8b5cf6'
          }
        ]);
        
        setLoading(false);
      }, 1500);
    }, 1000);
  }, [id]);

  const handleCharacterChange = (id, newName) => {
    setCharacters(prev => 
      prev.map(char => 
        char.id === id ? { ...char, name: newName } : char
      )
    );
  };

  const handleAddCharacter = () => {
    const newCharacter = {
      id: `${characters.length + 1}`,
      name: `角色${characters.length + 1}`,
      appearanceCount: 0,
      dialogueCount: 0,
      importance: '次要',
      color: '#f59e0b'
    };
    setCharacters(prev => [...prev, newCharacter]);
  };

  const handleRemoveCharacter = (id) => {
    setCharacters(prev => prev.filter(char => char.id !== id));
  };

  const handleNext = () => {
    if (characters.length === 0) {
      message.error('请至少保留一个角色');
      return;
    }
    navigate(`/voice/${id}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">文本解析</h1>
      </div>
      
      <div className="card">
        <Title level={4} className="card-title">文本预览</Title>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <LoadingOutlined style={{ fontSize: '24px', color: '#3b82f6' }} />
            <Paragraph className="mt-3">正在解析文本内容...</Paragraph>
          </div>
        ) : (
          <div>
            <Paragraph 
              style={{ 
                backgroundColor: '#f9fafb', 
                padding: '16px', 
                borderRadius: '4px',
                maxHeight: '200px',
                overflowY: 'auto'
              }}
            >
              {textPreview}
            </Paragraph>
            <div className="mt-3 text-muted">
              共识别出 {characters.length} 个角色
            </div>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <LoadingOutlined style={{ fontSize: '32px', color: '#3b82f6' }} />
          <Paragraph className="mt-3">正在识别文本中的主要角色...</Paragraph>
        </div>
      ) : (
        <div>
          <CharacterList 
            characters={characters}
            onCharacterChange={handleCharacterChange}
            onAddCharacter={handleAddCharacter}
            onRemoveCharacter={handleRemoveCharacter}
          />
          
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                type="primary" 
                size="large" 
                onClick={handleNext}
                icon={<CheckCircleOutlined />}
              >
                下一步：音色分配
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextParsePage;
