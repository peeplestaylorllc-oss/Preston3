import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video as VideoType } from '@/utils/videoService';
import FavoriteButton from './FavoriteButton';
import { Colors } from '@/constants/Colors';

interface FeaturedVideoCardProps {
  video: VideoType;
  onPress: (video: VideoType) => void;
  rank?: number;
  width?: number;
  height?: number;
  showFavorite?: boolean;
}

export default function FeaturedVideoCard({
  video,
  onPress,
  rank,
  width = 200,
  height = 280,
  showFavorite = true,
}: FeaturedVideoCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

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
      style={[styles.container, { width, height }]}
      onPress={() => onPress(video)}
      activeOpacity={0.9}
    >
      {imageLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary[500]} />
        </View>
      )}
      <Image
        source={{ uri: getThumbnailUrl() }}
        style={styles.image}
        resizeMode="cover"
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
      />

      {rank && (
        <View style={styles.rankBadge}>
          <Text style={styles.rankNumber}>{rank}</Text>
        </View>
      )}

      {showFavorite && (
        <View style={styles.favoriteButton}>
          <FavoriteButton videoId={video.id} size={20} color="#FFFFFF" />
        </View>
      )}

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
          <View style={styles.metaContainer}>
            <Text style={styles.category}>
              {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
            </Text>
            {video.speaker && (
              <>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.speaker} numberOfLines={1}>
                  {video.speaker}
                </Text>
              </>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.dark.bgCard,
    marginRight: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.dark.bgCard,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.bgCard,
    zIndex: 1,
  },
  rankBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 48,
    height: 56,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rankNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    zIndex: 10,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Inter-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  category: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.primary[500],
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontFamily: 'Inter-SemiBold',
  },
  separator: {
    fontSize: 9,
    color: '#9CA3AF',
    marginHorizontal: 6,
  },
  speaker: {
    fontSize: 9,
    color: '#D1D5DB',
    flex: 1,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Inter-Regular',
  },
});
