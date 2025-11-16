/*
  # Create Bible Bookmarks Table

  1. New Tables
    - `bible_bookmarks`
      - `id` (uuid, primary key) - Unique identifier for each bookmark
      - `user_id` (uuid) - Reference to the user who created the bookmark
      - `book` (text) - Bible book name (e.g., "Genesis", "John")
      - `chapter` (integer) - Chapter number
      - `verse` (integer) - Verse number
      - `verse_end` (integer, optional) - End verse for range bookmarks
      - `note` (text, optional) - User's personal note about the bookmark
      - `created_at` (timestamptz) - When the bookmark was created
      - `updated_at` (timestamptz) - When the bookmark was last updated

  2. Security
    - Enable RLS on `bible_bookmarks` table
    - Add policy for authenticated users to read their own bookmarks
    - Add policy for authenticated users to create their own bookmarks
    - Add policy for authenticated users to update their own bookmarks
    - Add policy for authenticated users to delete their own bookmarks
*/

CREATE TABLE IF NOT EXISTS bible_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  book text NOT NULL,
  chapter integer NOT NULL,
  verse integer NOT NULL,
  verse_end integer,
  note text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bible_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks"
  ON bible_bookmarks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
  ON bible_bookmarks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookmarks"
  ON bible_bookmarks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON bible_bookmarks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_bible_bookmarks_user_id ON bible_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bible_bookmarks_book ON bible_bookmarks(book);
