import React from 'react';
import { message } from 'antd';
import CloneVoiceForm from '../components/CloneVoiceForm';

const CloneVoicePage = () => {
  const handleCloneSuccess = (voiceData) => {
    message.success(`音色"${voiceData.name}"克隆成功！`);
    // 在实际应用中，会将新音色添加到用户的音色库中
    setTimeout(() => {
      window.location.hash = '#/voices';
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">音色克隆</h1>
      </div>
      
      <CloneVoiceForm onCloneSuccess={handleCloneSuccess} />
    </div>
  );
};

export default CloneVoicePage;
