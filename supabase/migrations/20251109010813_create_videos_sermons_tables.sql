/*
  # Video and Sermon Management System

  1. New Tables
    - `videos`
      - `id` (uuid, primary key)
      - `video_id` (text, YouTube video ID)
      - `title` (text)
      - `description` (text)
      - `category` (text) - 'sermon', 'worship', 'other'
      - `thumbnail_url` (text)
      - `speaker` (text, nullable)
      - `sermon_series` (text, nullable)
      - `date` (date, nullable)
      - `duration` (integer, nullable) - in seconds
      - `view_count` (integer, default 0)
      - `is_featured` (boolean, default false)
      - `tags` (text array, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `user_favorites`
      - `id` (uuid, primary key)
      - `user_id` (text)
      - `video_id` (uuid, foreign key to videos)
      - `created_at` (timestamptz)
    
    - `video_progress`
      - `id` (uuid, primary key)
      - `user_id` (text)
      - `video_id` (uuid, foreign key to videos)
      - `progress_seconds` (integer)
      - `completed` (boolean, default false)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Videos are publicly readable
    - Users can manage their own favorites and progress
*/

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id text NOT NULL UNIQUE,
  title text NOT NULL,
  description text DEFAULT '',
  category text NOT NULL DEFAULT 'other',
  thumbnail_url text,
  speaker text,
  sermon_series text,
  date date,
  duration integer,
  view_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  tags text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  video_id uuid NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, video_id)
);

-- Create video_progress table
CREATE TABLE IF NOT EXISTS video_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  video_id uuid NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  progress_seconds integer DEFAULT 0,
  completed boolean DEFAULT false,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, video_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_videos_date ON videos(date DESC);
CREATE INDEX IF NOT EXISTS idx_videos_featured ON videos(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_videos_speaker ON videos(speaker);
CREATE INDEX IF NOT EXISTS idx_videos_series ON videos(sermon_series);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_video_progress_user_id ON video_progress(user_id);

-- Enable Row Level Security
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for videos (public read)
CREATE POLICY "Videos are publicly viewable"
  ON videos FOR SELECT
  TO public
  USING (true);

-- RLS Policies for user_favorites
CREATE POLICY "Users can view own favorites"
  ON user_favorites FOR SELECT
  TO public
  USING (user_id = current_setting('request.jwt.claim.sub', true)::text);

CREATE POLICY "Users can add favorites"
  ON user_favorites FOR INSERT
  TO public
  WITH CHECK (user_id = current_setting('request.jwt.claim.sub', true)::text);

CREATE POLICY "Users can remove own favorites"
  ON user_favorites FOR DELETE
  TO public
  USING (user_id = current_setting('request.jwt.claim.sub', true)::text);

-- RLS Policies for video_progress
CREATE POLICY "Users can view own progress"
  ON video_progress FOR SELECT
  TO public
  USING (user_id = current_setting('request.jwt.claim.sub', true)::text);

CREATE POLICY "Users can insert own progress"
  ON video_progress FOR INSERT
  TO public
  WITH CHECK (user_id = current_setting('request.jwt.claim.sub', true)::text);

CREATE POLICY "Users can update own progress"
  ON video_progress FOR UPDATE
  TO public
  USING (user_id = current_setting('request.jwt.claim.sub', true)::text)
  WITH CHECK (user_id = current_setting('request.jwt.claim.sub', true)::text);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_progress_updated_at BEFORE UPDATE ON video_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
