import React from 'react';
import TextUploader from '../components/TextUploader';

const UploadPage = () => {
  const handleUploadSuccess = (fileInfo) => {
    // 跳转到文本解析页面
    window.location.hash = `#/parse/${fileInfo.id}`;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">上传文本文件</h1>
      </div>
      
      <TextUploader onUploadSuccess={handleUploadSuccess} />
    </div>
  );
};

export default UploadPage;
