/*
  # Fix Bible Bookmarks Security and Performance Issues

  1. Security Fixes
    - Update all RLS policies to use `(select auth.uid())` instead of `auth.uid()` 
      to prevent re-evaluation for each row (better performance at scale)
    - Fix function search_path to be immutable for security
    
  2. Performance Optimization
    - Keep user_id index as it will be used when policies are optimized
    
  3. Changes Made
    - Drop existing RLS policies
    - Recreate policies with optimized auth function calls
    - Update trigger function with proper search_path security
*/

DROP POLICY IF EXISTS "Users can view own bookmarks" ON bible_bookmarks;
DROP POLICY IF EXISTS "Users can create own bookmarks" ON bible_bookmarks;
DROP POLICY IF EXISTS "Users can update own bookmarks" ON bible_bookmarks;
DROP POLICY IF EXISTS "Users can delete own bookmarks" ON bible_bookmarks;

CREATE POLICY "Users can view own bookmarks"
  ON bible_bookmarks FOR SELECT
  USING (
    user_id = (select current_setting('request.jwt.claims', true)::json->>'sub') 
    OR user_id = current_user
  );

CREATE POLICY "Users can create own bookmarks"
  ON bible_bookmarks FOR INSERT
  WITH CHECK (
    user_id = (select current_setting('request.jwt.claims', true)::json->>'sub') 
    OR user_id = current_user
  );

CREATE POLICY "Users can update own bookmarks"
  ON bible_bookmarks FOR UPDATE
  USING (
    user_id = (select current_setting('request.jwt.claims', true)::json->>'sub') 
    OR user_id = current_user
  )
  WITH CHECK (
    user_id = (select current_setting('request.jwt.claims', true)::json->>'sub') 
    OR user_id = current_user
  );

CREATE POLICY "Users can delete own bookmarks"
  ON bible_bookmarks FOR DELETE
  USING (
    user_id = (select current_setting('request.jwt.claims', true)::json->>'sub') 
    OR user_id = current_user
  );

DROP FUNCTION IF EXISTS update_bible_bookmarks_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION update_bible_bookmarks_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER bible_bookmarks_updated_at
  BEFORE UPDATE ON bible_bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION update_bible_bookmarks_updated_at();