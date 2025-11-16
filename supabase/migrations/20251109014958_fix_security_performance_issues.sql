/*
  # Fix Security and Performance Issues

  ## Changes

  1. **Add Missing Foreign Key Indexes**
     - Add index on `user_favorites.video_id`
     - Add index on `video_progress.video_id`

  2. **Optimize RLS Policies (Auth Function Initialization)**
     - Update all RLS policies to use `(select auth.uid())` instead of `auth.uid()`
     - This evaluates the function once per query instead of once per row
     - Applies to:
       - user_favorites: 3 policies
       - video_progress: 3 policies

  3. **Remove Unused Indexes**
     - Drop unused indexes that are not being utilized by queries
     - Keep only essential indexes for performance

  4. **Fix Function Search Path**
     - Add explicit search_path to functions to prevent security issues
     - Applies to:
       - update_updated_at_column
       - increment_view_count

  ## Security Notes
  - All changes maintain existing security model
  - RLS policies remain restrictive and secure
  - Performance optimizations only affect query execution
*/

-- =====================================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- =====================================================

-- Index for user_favorites.video_id foreign key
CREATE INDEX IF NOT EXISTS idx_user_favorites_video_id 
ON public.user_favorites(video_id);

-- Index for video_progress.video_id foreign key
CREATE INDEX IF NOT EXISTS idx_video_progress_video_id 
ON public.video_progress(video_id);

-- =====================================================
-- 2. OPTIMIZE RLS POLICIES - USER_FAVORITES
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own favorites" ON public.user_favorites;
DROP POLICY IF EXISTS "Users can add favorites" ON public.user_favorites;
DROP POLICY IF EXISTS "Users can remove own favorites" ON public.user_favorites;

-- Recreate with optimized auth function calls (with proper type casting)
CREATE POLICY "Users can view own favorites"
  ON public.user_favorites
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()::text));

CREATE POLICY "Users can add favorites"
  ON public.user_favorites
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()::text));

CREATE POLICY "Users can remove own favorites"
  ON public.user_favorites
  FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()::text));

-- =====================================================
-- 3. OPTIMIZE RLS POLICIES - VIDEO_PROGRESS
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own progress" ON public.video_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.video_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.video_progress;

-- Recreate with optimized auth function calls (with proper type casting)
CREATE POLICY "Users can view own progress"
  ON public.video_progress
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()::text));

CREATE POLICY "Users can insert own progress"
  ON public.video_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()::text));

CREATE POLICY "Users can update own progress"
  ON public.video_progress
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()::text))
  WITH CHECK (user_id = (select auth.uid()::text));

-- =====================================================
-- 4. REMOVE UNUSED INDEXES
-- =====================================================

-- Drop unused indexes on videos table
DROP INDEX IF EXISTS public.idx_videos_date;
DROP INDEX IF EXISTS public.idx_videos_featured;
DROP INDEX IF EXISTS public.idx_videos_speaker;
DROP INDEX IF EXISTS public.idx_videos_series;

-- Drop the old user_id indexes (we'll keep the ones we just created for video_id)
DROP INDEX IF EXISTS public.idx_user_favorites_user_id;
DROP INDEX IF EXISTS public.idx_video_progress_user_id;

-- =====================================================
-- 5. FIX FUNCTION SEARCH PATH
-- =====================================================

-- Recreate update_updated_at_column with explicit search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate increment_view_count with explicit search_path
CREATE OR REPLACE FUNCTION public.increment_view_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE public.videos
  SET view_count = view_count + 1
  WHERE id = NEW.video_id;
  RETURN NEW;
END;
$$;
