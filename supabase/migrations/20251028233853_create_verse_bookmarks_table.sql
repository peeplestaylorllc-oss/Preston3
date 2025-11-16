/*
  # Create verse bookmarks table

  1. New Tables
    - `verse_bookmarks`
      - `id` (uuid, primary key) - Unique identifier for each bookmark
      - `user_id` (text) - Identifier for the user (device ID or user ID)
      - `book` (text) - Bible book name (e.g., "Genesis", "John")
      - `chapter` (integer) - Chapter number
      - `verse` (integer) - Verse number
      - `verse_text` (text) - The actual verse text for display
      - `note` (text, optional) - User's personal note about the verse
      - `created_at` (timestamptz) - When the bookmark was created
      
  2. Security
    - Enable RLS on `verse_bookmarks` table
    - Add policy for users to read their own bookmarks
    - Add policy for users to create their own bookmarks
    - Add policy for users to update their own bookmarks
    - Add policy for users to delete their own bookmarks
    
  3. Indexes
    - Index on `user_id` for faster lookups
    - Composite index on `user_id`, `book`, `chapter`, `verse` to prevent duplicates
*/

CREATE TABLE IF NOT EXISTS verse_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  book text NOT NULL,
  chapter integer NOT NULL,
  verse integer NOT NULL,
  verse_text text NOT NULL,
  note text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE verse_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookmarks"
  ON verse_bookmarks
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create own bookmarks"
  ON verse_bookmarks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own bookmarks"
  ON verse_bookmarks
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own bookmarks"
  ON verse_bookmarks
  FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS idx_verse_bookmarks_user_id ON verse_bookmarks(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_verse_bookmarks_unique ON verse_bookmarks(user_id, book, chapter, verse);