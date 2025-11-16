import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Video } from '@/utils/videoService';
import FavoriteButton from './FavoriteButton';

interface VideoCardProps {
  video: Video;
  onPress: (video: Video) => void;
  showFavorite?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function VideoCard({
  video,
  onPress,
  showFavorite = true,
  size = 'small',
}: VideoCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const dimensions = {
    small: { width: 100, height: 100 },
    medium: { width: 150, height: 100 },
    large: { width: 200, height: 150 },
  };

  const dim = dimensions[size];

  const getThumbnailUrl = () => {
    if (video.thumbnail_url) {
      return video.thumbnail_url;
    }
    if (imageError) {
      return `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`;
    }
    return `https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { width: dim.width, marginRight: 12 }]}
      onPress={() => onPress(video)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {imageLoading && (
          <View style={[styles.loadingContainer, { width: dim.width, height: dim.height }]}>
            <ActivityIndicator size="small" color="#0891B2" />
          </View>
        )}
        <Image
          source={{ uri: getThumbnailUrl() }}
          style={[styles.thumbnail, { width: dim.width, height: dim.height }]}
          resizeMode="cover"
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
        />
        {showFavorite && (
          <View style={styles.favoriteButton}>
            <FavoriteButton videoId={video.id} size={20} color="#FFFFFF" />
          </View>
        )}
      </View>
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2}>
          {video.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  thumbnail: {
    borderRadius: 12,
    backgroundColor: '#1F2937',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    zIndex: 1,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Inter-Bold',
    lineHeight: 12,
  },
});
