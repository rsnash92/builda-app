-- Chat channels for clubs
CREATE TABLE IF NOT EXISTS channels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  type VARCHAR(20) DEFAULT 'text' CHECK (type IN ('text', 'voice', 'announcement', 'treasury')),
  position INTEGER DEFAULT 0,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES user_profiles(id),

  UNIQUE(club_id, name)
);

-- Chat messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
  reply_to_id UUID REFERENCES messages(id) ON DELETE SET NULL,
  edited_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Add indexes for performance
  CONSTRAINT content_length CHECK (char_length(content) <= 2000)
);

-- Message reactions (for later)
CREATE TABLE IF NOT EXISTS message_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  emoji VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(message_id, user_id, emoji)
);

-- Channel permissions (token-gated access)
CREATE TABLE IF NOT EXISTS channel_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'guest')),
  min_tokens DECIMAL(20,6) DEFAULT 0, -- Minimum tokens required
  can_read BOOLEAN DEFAULT true,
  can_write BOOLEAN DEFAULT true,
  can_manage BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(channel_id, role)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_channel_created_at ON messages(channel_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_channels_club_id ON channels(club_id, position);
CREATE INDEX IF NOT EXISTS idx_channel_permissions_channel_id ON channel_permissions(channel_id);

-- Add some default channels for existing clubs
INSERT INTO channels (club_id, name, type, position, description, created_at)
SELECT
  id,
  'general',
  'text',
  0,
  'General discussion for club members',
  NOW()
FROM clubs
WHERE NOT EXISTS (
  SELECT 1 FROM channels WHERE channels.club_id = clubs.id AND channels.name = 'general'
);

INSERT INTO channels (club_id, name, type, position, description, created_at)
SELECT
  id,
  'announcements',
  'announcement',
  1,
  'Important club announcements',
  NOW()
FROM clubs
WHERE NOT EXISTS (
  SELECT 1 FROM channels WHERE channels.club_id = clubs.id AND channels.name = 'announcements'
);

INSERT INTO channels (club_id, name, type, position, description, created_at)
SELECT
  id,
  'treasury',
  'treasury',
  2,
  'Treasury updates and financial discussions',
  NOW()
FROM clubs
WHERE NOT EXISTS (
  SELECT 1 FROM channels WHERE channels.club_id = clubs.id AND channels.name = 'treasury'
);

-- Set up default permissions for channels
INSERT INTO channel_permissions (channel_id, role, min_tokens, can_read, can_write, can_manage)
SELECT
  c.id,
  'member',
  0,
  true,
  true,
  false
FROM channels c
WHERE NOT EXISTS (
  SELECT 1 FROM channel_permissions cp WHERE cp.channel_id = c.id AND cp.role = 'member'
);

INSERT INTO channel_permissions (channel_id, role, min_tokens, can_read, can_write, can_manage)
SELECT
  c.id,
  'admin',
  0,
  true,
  true,
  true
FROM channels c
WHERE NOT EXISTS (
  SELECT 1 FROM channel_permissions cp WHERE cp.channel_id = c.id AND cp.role = 'admin'
);

-- Enable Row Level Security
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE channel_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for channels (members can read/write in their clubs)
CREATE POLICY "Members can view channels in their clubs" ON channels
  FOR SELECT USING (
    club_id IN (
      SELECT club_id FROM members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Club owners can manage channels" ON channels
  FOR ALL USING (
    club_id IN (
      SELECT id FROM clubs WHERE created_by = auth.uid()
    )
  );

-- RLS Policies for messages
CREATE POLICY "Members can view messages in accessible channels" ON messages
  FOR SELECT USING (
    channel_id IN (
      SELECT c.id FROM channels c
      JOIN members m ON c.club_id = m.club_id
      WHERE m.user_id = auth.uid()
    )
  );

CREATE POLICY "Members can send messages in accessible channels" ON messages
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    channel_id IN (
      SELECT c.id FROM channels c
      JOIN members m ON c.club_id = m.club_id
      WHERE m.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can edit their own messages" ON messages
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own messages" ON messages
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for reactions
CREATE POLICY "Members can view reactions in accessible channels" ON message_reactions
  FOR SELECT USING (
    message_id IN (
      SELECT m.id FROM messages m
      JOIN channels c ON m.channel_id = c.id
      JOIN members mem ON c.club_id = mem.club_id
      WHERE mem.user_id = auth.uid()
    )
  );

CREATE POLICY "Members can add reactions" ON message_reactions
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    message_id IN (
      SELECT m.id FROM messages m
      JOIN channels c ON m.channel_id = c.id
      JOIN members mem ON c.club_id = mem.club_id
      WHERE mem.user_id = auth.uid()
    )
  );

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE channels;