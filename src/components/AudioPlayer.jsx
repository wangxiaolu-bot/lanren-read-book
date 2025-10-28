import React, { useState, useRef, useEffect } from 'react';
import { Slider, Button, Space, Typography, message } from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  SoundOutlined,
  DownloadOutlined,
  RetweetOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const AudioPlayer = ({ audioUrl, chapters, onChapterChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [currentChapter, setCurrentChapter] = useState(0);
  
  const audioRef = useRef(null);
  
  // 模拟音频时长（秒）
  const audioDuration = chapters.reduce((sum, chapter) => sum + chapter.duration, 0);
  
  useEffect(() => {
if (audioRef.current) {
  audioRef.current.volume = volume;
  audioRef.current.playbackRate = playbackRate;
}
  }, [volume, playbackRate]);
  
  const togglePlay = () => {
if (isPlaying) {
  audioRef.current.pause();
} else {
  audioRef.current.play();
}
setIsPlaying(!isPlaying);
  };
  
  const handleTimeUpdate = () => {
if (audioRef.current) {
  setCurrentTime(audioRef.current.currentTime);
  
  // 检查当前章节
  let accumulatedTime = 0;
  for (let i = 0; i < chapters.length; i++) {
    if (currentTime >= accumulatedTime && currentTime < accumulatedTime + chapters[i].duration) {
      if (currentChapter !== i) {
        setCurrentChapter(i);
        if (onChapterChange) onChapterChange(i);
      }
      break;
    }
    accumulatedTime += chapters[i].duration;
  }
}
  };
  
  const handleSeek = (value) => {
if (audioRef.current) {
  audioRef.current.currentTime = value;
  setCurrentTime(value);
}
  };
  
  const handleVolumeChange = (value) => {
setVolume(value);
if (audioRef.current) {
  audioRef.current.volume = value;
}
  };
  
  const handlePlaybackRateChange = () => {
const rates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
const currentIndex = rates.indexOf(playbackRate);
const nextIndex = (currentIndex + 1) % rates.length;
setPlaybackRate(rates[nextIndex]);
  };
  
  const handleChapterSelect = (index) => {
if (audioRef.current) {
  // 计算章节开始时间
  let startTime = 0;
  for (let i = 0; i < index; i++) {
    startTime += chapters[i].duration;
  }
  
  audioRef.current.currentTime = startTime;
  setCurrentTime(startTime);
  setCurrentChapter(index);
  if (onChapterChange) onChapterChange(index);
}
  };
  
  const formatTime = (seconds) => {
const mins = Math.floor(seconds / 60);
const secs = Math.floor(seconds % 60);
return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleDownload = () => {
message.success('开始下载有声书...');
// 实际应用中会触发下载
  };

  // 模拟音频元素
  return (
<div className="card">
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
    <h3 className="card-title" style={{ margin: 0 }}>有声书播放器</h3>
    <Button 
      type="primary" 
      icon={<DownloadOutlined />} 
      onClick={handleDownload}
    >
      下载MP3
    </Button>
  </div>
  
  {/* 章节列表 */}
  <div className="section-title">章节列表</div>
  <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '16px' }}>
    {chapters.map((chapter, index) => (
      <div
        key={index}
        onClick={() => handleChapterSelect(index)}
        style={{
          padding: '8px 12px',
          cursor: 'pointer',
          backgroundColor: currentChapter === index ? '#e6f4ff' : 'transparent',
          borderRadius: '4px',
          marginBottom: '4px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>{chapter.title}</span>
        <span className="text-muted">{formatTime(chapter.duration)}</span>
      </div>
    ))}
  </div>
  
  {/* 播放控制 */}
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
    <Button icon={<StepBackwardOutlined />} />
    <Button 
      type="primary" 
      shape="circle" 
      icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />} 
      onClick={togglePlay}
      style={{ width: '48px', height: '48px' }}
    />
    <Button icon={<StepForwardOutlined />} />
  </div>
  
  {/* 进度条 */}
  <div style={{ marginBottom: '16px' }}>
    <Slider 
      min={0} 
      max={audioDuration} 
      value={currentTime} 
      onChange={handleSeek} 
    />
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280' }}>
      <span>{formatTime(currentTime)}</span>
      <span>{formatTime(audioDuration)}</span>
    </div>
  </div>
  
  {/* 其他控制 */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Space>
      <Button 
        icon={<RetweetOutlined />} 
        onClick={handlePlaybackRateChange}
      >
        {playbackRate}x
      </Button>
    </Space>
    
    <Space>
      <SoundOutlined />
      <Slider 
        min={0} 
        max={1} 
        step={0.01} 
        value={volume} 
        onChange={handleVolumeChange} 
        style={{ width: '100px' }}
      />
    </Space>
  </div>
  
  {/* 隐藏的音频元素 */}
  <audio 
    ref={audioRef}
    src={audioUrl}
    onTimeUpdate={handleTimeUpdate}
    onLoadedMetadata={() => setDuration(audioDuration)}
    onEnded={() => setIsPlaying(false)}
  />
</div>
  );
};

export default AudioPlayer;
