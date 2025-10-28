import React, { useState } from 'react';
import { List, Avatar, Input, Button, Space, Tag } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const CharacterList = ({ characters, onCharacterChange, onAddCharacter, onRemoveCharacter }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (character) => {
    setEditingId(character.id);
    setEditValue(character.name);
  };

  const handleSave = (id) => {
    onCharacterChange(id, editValue);
    setEditingId(null);
    setEditValue('');
  };

  const handleAdd = () => {
    onAddCharacter();
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 className="card-title" style={{ margin: 0 }}>识别角色</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加角色
        </Button>
      </div>
      
      <List
        dataSource={characters}
        renderItem={(character) => (
          <List.Item
            key={character.id}
            actions={[
              editingId === character.id ? (
                <Button 
                  type="primary" 
                  size="small" 
                  onClick={() => handleSave(character.id)}
                >
                  保存
                </Button>
              ) : (
                <Button 
                  type="link" 
                  icon={<EditOutlined />} 
                  onClick={() => handleEdit(character)}
                >
                  编辑
                </Button>
              ),
              <Button 
                type="link" 
                danger 
                icon={<DeleteOutlined />} 
                onClick={() => onRemoveCharacter(character.id)}
              >
                删除
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar 
                  icon={<UserOutlined />} 
                  style={{ backgroundColor: character.color }} 
                />
              }
              title={
                editingId === character.id ? (
                  <Input 
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)} 
                    onPressEnter={() => handleSave(character.id)}
                    autoFocus
                  />
                ) : (
                  <Space>
                    <span>{character.name}</span>
                    <Tag color={character.importance === '主要' ? 'blue' : 'default'}>
                      {character.importance}
                    </Tag>
                  </Space>
                )
              }
              description={
                <div>
                  <div>出现次数: {character.appearanceCount}</div>
                  <div>对话次数: {character.dialogueCount}</div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CharacterList;
