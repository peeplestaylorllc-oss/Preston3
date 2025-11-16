import { supabase } from './supabase';

export interface Video {
  id: string;
  video_id: string;
  title: string;
  description: string;
  category: 'sermon' | 'worship' | 'other';
  thumbnail_url?: string;
  speaker?: string;
  sermon_series?: string;
  date?: string;
  duration?: number;
  view_count: number;
  is_featured: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface VideoProgress {
  id: string;
  user_id: string;
  video_id: string;
  progress_seconds: number;
  completed: boolean;
  updated_at: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  video_id: string;
  created_at: string;
}

export const videoService = {
  async getAllVideos(category?: string) {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return [];
    }

    let query = supabase.from('videos').select('*').order('date', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching videos:', error);
      return [];
    }

    return data as Video[];
  },

  async getFeaturedVideos() {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('is_featured', true)
      .order('date', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching featured videos:', error);
      return [];
    }

    return data as Video[];
  },

  async getVideoById(id: string) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching video:', error);
      return null;
    }

    return data as Video | null;
  },

  async searchVideos(query: string) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,speaker.ilike.%${query}%,sermon_series.ilike.%${query}%`)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error searching videos:', error);
      return [];
    }

    return data as Video[];
  },

  async getVideosBySeries(series: string) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('sermon_series', series)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching videos by series:', error);
      return [];
    }

    return data as Video[];
  },

  async getVideosBySpeaker(speaker: string) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('speaker', speaker)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching videos by speaker:', error);
      return [];
    }

    return data as Video[];
  },

  async incrementViewCount(videoId: string) {
    const { error } = await supabase.rpc('increment_view_count', { video_id: videoId });

    if (error) {
      console.error('Error incrementing view count:', error);
    }
  },

  async getUserFavorites(userId: string) {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('*, videos(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user favorites:', error);
      return [];
    }

    return data;
  },

  async addToFavorites(userId: string, videoId: string) {
    const { data, error } = await supabase
      .from('user_favorites')
      .insert({ user_id: userId, video_id: videoId })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error adding to favorites:', error);
      return null;
    }

    return data;
  },

  async removeFromFavorites(userId: string, videoId: string) {
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('video_id', videoId);

    if (error) {
      console.error('Error removing from favorites:', error);
      return false;
    }

    return true;
  },

  async isFavorite(userId: string, videoId: string) {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('video_id', videoId)
      .maybeSingle();

    if (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }

    return !!data;
  },

  async getVideoProgress(userId: string, videoId: string) {
    const { data, error } = await supabase
      .from('video_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('video_id', videoId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching video progress:', error);
      return null;
    }

    return data as VideoProgress | null;
  },

  async updateVideoProgress(userId: string, videoId: string, progressSeconds: number, completed: boolean = false) {
    const { data, error } = await supabase
      .from('video_progress')
      .upsert({
        user_id: userId,
        video_id: videoId,
        progress_seconds: progressSeconds,
        completed,
        updated_at: new Date().toISOString(),
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating video progress:', error);
      return null;
    }

    return data;
  },

  async getContinueWatching(userId: string) {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return [];
    }

    const { data, error } = await supabase
      .from('video_progress')
      .select('*, videos(*)')
      .eq('user_id', userId)
      .eq('completed', false)
      .order('updated_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching continue watching:', error);
      return [];
    }

    return data;
  },
};
