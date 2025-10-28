/*
  # 初始化AI有声书阅读器数据库

  1. 新增表
    - `texts_40698`：存储用户上传的文本文件信息
    - `characters_40698`：存储识别的角色信息
    - `voices_40698`：存储音色信息
    - `audiobooks_40698`：存储生成的有声书信息
    - `voice_assignments_40698`：存储角色与音色的关联关系
    - `playback_history_40698`：存储播放记录

  2. 修改
    - 无
*/

CREATE TABLE IF NOT EXISTS texts_40698 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  file_type text NOT NULL,
  status text DEFAULT 'processing',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS characters_40698 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text_id uuid NOT NULL REFERENCES texts_40698(id),
  name text NOT NULL,
  description text,
  appearance_count integer DEFAULT 0,
  dialogue_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS voices_40698 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  description text,
  category text,
  sample_url text,
  is_custom boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audiobooks_40698 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text_id uuid NOT NULL REFERENCES texts_40698(id),
  title text NOT NULL,
  status text DEFAULT 'processing',
  audio_url text,
  duration integer,
  chapter_count integer,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS voice_assignments_40698 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text_id uuid NOT NULL REFERENCES texts_40698(id),
  character_id uuid NOT NULL REFERENCES characters_40698(id),
  voice_id uuid NOT NULL REFERENCES voices_40698(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS playback_history_40698 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  audiobook_id uuid NOT NULL REFERENCES audiobooks_40698(id),
  position integer DEFAULT 0,
  playback_speed numeric(3,2) DEFAULT 1.00,
  last_played_at timestamptz DEFAULT now()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_characters_text_id ON characters_40698(text_id);
CREATE INDEX IF NOT EXISTS idx_voices_category ON voices_40698(category);
CREATE INDEX IF NOT EXISTS idx_audiobooks_text_id ON audiobooks_40698(text_id);
CREATE INDEX IF NOT EXISTS idx_voice_assignments_text_id ON voice_assignments_40698(text_id);
CREATE INDEX IF NOT EXISTS idx_playback_history_user_id ON playback_history_40698(user_id);
