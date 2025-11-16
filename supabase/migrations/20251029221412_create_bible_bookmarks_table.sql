/*
  # Create Bible Bookmarks Table

  1. New Tables
    - `bible_bookmarks`
      - `id` (uuid, primary key) - Unique identifier for each bookmark
      - `user_id` (text, not null) - ID of the user who created the bookmark
      - `book` (text, not null) - Name of the Bible book (e.g., "John", "Genesis")
      - `chapter` (integer, not null) - Chapter number
      - `verse` (integer, not null) - Verse number
      - `verse_text` (text, not null) - The actual text of the verse
      - `note` (text, nullable) - Optional user note about the bookmark
      - `created_at` (timestamptz) - When the bookmark was created
      - `updated_at` (timestamptz) - When the bookmark was last updated

  2. Indexes
    - Index on `user_id` for fast lookup of user's bookmarks
    - Composite index on `user_id, book, chapter, verse` to prevent duplicate bookmarks

  3. Security
    - Enable RLS on `bible_bookmarks` table
    - Users can only read their own bookmarks
    - Users can only create their own bookmarks
    - Users can only update their own bookmarks
    - Users can only delete their own bookmarks

  4. Important Notes
    - The user_id is stored as text to work with the device-based identification system
    - Each user can have multiple bookmarks but cannot duplicate the same verse
    - The verse_text is stored to allow offline access to bookmarked verses
*/

CREATE TABLE IF NOT EXISTS bible_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  book text NOT NULL,
  chapter integer NOT NULL CHECK (chapter > 0),
  verse integer NOT NULL CHECK (verse > 0),
  verse_text text NOT NULL,
  note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bible_bookmarks_user_id 
  ON bible_bookmarks(user_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_bible_bookmarks_unique_verse 
  ON bible_bookmarks(user_id, book, chapter, verse);

ALTER TABLE bible_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookmarks"
  ON bible_bookmarks FOR SELECT
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub' OR user_id = current_user);

CREATE POLICY "Users can create own bookmarks"
  ON bible_bookmarks FOR INSERT
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub' OR user_id = current_user);

CREATE POLICY "Users can update own bookmarks"
  ON bible_bookmarks FOR UPDATE
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub' OR user_id = current_user)
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub' OR user_id = current_user);

CREATE POLICY "Users can delete own bookmarks"
  ON bible_bookmarks FOR DELETE
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub' OR user_id = current_user);

CREATE OR REPLACE FUNCTION update_bible_bookmarks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bible_bookmarks_updated_at
  BEFORE UPDATE ON bible_bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION update_bible_bookmarks_updated_at();