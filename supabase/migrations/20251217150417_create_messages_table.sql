-- Create messages table with foreign key to profiles
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX messages_created_at_idx ON messages(created_at DESC);
CREATE INDEX messages_user_id_idx ON messages(user_id);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Authenticated users can view all messages
CREATE POLICY "Messages are viewable by authenticated users"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policy: Authenticated users can insert messages with their own user_id
CREATE POLICY "Users can insert own messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can delete only their own messages
CREATE POLICY "Users can delete own messages"
  ON messages FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);