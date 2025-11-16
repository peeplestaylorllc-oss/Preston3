import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Heart } from 'lucide-react-native';
import { videoService } from '@/utils/videoService';
import { authService } from '@/utils/auth';

interface FavoriteButtonProps {
  videoId: string;
  size?: number;
  color?: string;
  onToggle?: (isFavorite: boolean) => void;
}

export default function FavoriteButton({
  videoId,
  size = 24,
  color = '#EF4444',
  onToggle,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    loadFavoriteStatus();
  }, [videoId]);

  const loadFavoriteStatus = async () => {
    try {
      const uid = await authService.getUserId();
      setUserId(uid);
      const favorite = await videoService.isFavorite(uid, videoId);
      setIsFavorite(favorite);
    } catch (error) {
      console.error('Error loading favorite status:', error);
    }
  };

  const handleToggle = async () => {
    if (loading) return;

    setLoading(true);
    try {
      if (isFavorite) {
        const success = await videoService.removeFromFavorites(userId, videoId);
        if (success) {
          setIsFavorite(false);
          if (onToggle) onToggle(false);
        }
      } else {
        const result = await videoService.addToFavorites(userId, videoId);
        if (result) {
          setIsFavorite(true);
          if (onToggle) onToggle(true);
        } else {
          Alert.alert('Error', 'Failed to add to favorites');
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleToggle}
      disabled={loading}
      style={styles.button}
      activeOpacity={0.7}
    >
      <Heart
        size={size}
        color={color}
        fill={isFavorite ? color : 'none'}
        strokeWidth={2}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
