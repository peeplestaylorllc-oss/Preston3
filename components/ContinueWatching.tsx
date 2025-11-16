import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Play } from 'lucide-react-native';
import { videoService } from '@/utils/videoService';
import { authService } from '@/utils/auth';
import LoadingState from './LoadingState';
import { Colors } from '@/constants/Colors';

interface ContinueWatchingProps {
  onVideoPress: (video: any) => void;
}

export default function ContinueWatching({ onVideoPress }: ContinueWatchingProps) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContinueWatching();
  }, []);

  const loadContinueWatching = async () => {
    try {
      const userId = await authService.getUserId();
      const data = await videoService.getContinueWatching(userId);
      setVideos(data);
    } catch (error) {
      console.error('Error loading continue watching:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading your videos..." size="small" />;
  }

  if (videos.length === 0) {
    return null;
  }

  const renderProgress = (progress: number, duration?: number) => {
    if (!duration) return 0;
    return (progress / duration) * 100;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Continue Watching</Text>
      <FlatList
        data={videos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoCard}
            onPress={() => onVideoPress(item.videos)}
          >
            <View style={styles.thumbnailContainer}>
              <Image
                source={{
                  uri: item.videos.thumbnail_url || `https://img.youtube.com/vi/${item.videos.video_id}/mqdefault.jpg`
                }}
                style={styles.thumbnail}
                resizeMode="cover"
                defaultSource={require('@/assets/images/favicon.png')}
              />
              <View style={styles.playOverlay}>
                <View style={styles.playButton}>
                  <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
                </View>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${renderProgress(item.progress_seconds, item.videos.duration)}%` },
                  ]}
                />
              </View>
            </View>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {item.videos.title}
            </Text>
            {item.videos.speaker && (
              <Text style={styles.videoMeta}>{item.videos.speaker}</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: Colors.dark.bg,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  videoCard: {
    width: 180,
    marginRight: 12,
  },
  thumbnailContainer: {
    position: 'relative',
    width: 180,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(245, 158, 11, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary[500],
  },
  videoTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Inter-Bold',
    lineHeight: 12,
  },
  videoMeta: {
    fontSize: 8,
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Inter-Regular',
  },
});
