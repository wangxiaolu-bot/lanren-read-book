import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://www.weavefox.cn/api/open/v1/supabase_proxy/332';
const supabaseAnonKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzYxMjg5MzE1LCJleHAiOjEzMjcxOTI5MzE1fQ.TfxZr_X-budcaePNdhaX14McGob-07KMj1cZRXFpCTM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
