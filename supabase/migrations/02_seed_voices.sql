/*
  # 预设音色库数据

  1. 新增表
    - 无

  2. 修改
    - 向voices_40698表中插入预设音色数据
*/

INSERT INTO voices_40698 (id, name, description, category, sample_url, is_custom) VALUES
('11111111-1111-1111-1111-111111111111', '沉稳男声', '成熟稳重的中年男性音色', '情感化', 'https://example.com/samples/mature_male.mp3', false),
('22222222-2222-2222-2222-222222222222', '活泼童声', '天真可爱的儿童音色', '情感化', 'https://example.com/samples/child.mp3', false),
('33333333-3333-3333-3333-333333333333', '温柔女声', '温柔体贴的女性音色', '情感化', 'https://example.com/samples/gentle_female.mp3', false),
('44444444-4444-4444-4444-444444444444', '激昂演讲', '富有激情和感染力的演讲音色', '情感化', 'https://example.com/samples/inspiring.mp3', false),
('55555555-5555-5555-5555-555555555555', '神秘低语', '神秘感十足的低语音色', '情感化', 'https://example.com/samples/whisper.mp3', false),
('66666666-6666-6666-6666-666666666666', '英式绅士', '标准英式口音的绅士音色', '多语种', 'https://example.com/samples/british_gentleman.mp3', false),
('77777777-7777-7777-7777-777777777777', '法式优雅', '带有法式口音的优雅女性音色', '多语种', 'https://example.com/samples/french_elegant.mp3', false),
('88888888-8888-8888-8888-888888888888', '日系萌声', '带有日系风格的可爱音色', '动漫游戏', 'https://example.com/samples/japanese_cute.mp3', false),
('99999999-9999-9999-9999-999999999999', '战士怒吼', '充满力量的战士音色', '动漫游戏', 'https://example.com/samples/warrior.mp3', false),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '古风帝王', '古代帝王的威严音色', '历史人物', 'https://example.com/samples/emperor.mp3', false);
