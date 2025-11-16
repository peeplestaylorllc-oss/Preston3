import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Bell, X } from 'lucide-react-native';

interface NotificationBannerProps {
  message: string;
  type?: 'info' | 'success' | 'warning';
  onDismiss?: () => void;
}

export default function NotificationBanner({ 
  message, 
  type = 'info', 
  onDismiss 
}: NotificationBannerProps) {
  const [visible, setVisible] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleDismiss = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onDismiss?.();
    });
  };

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#ECFDF5';
      case 'warning':
        return '#FEF3C7';
      default:
        return '#EFF6FF';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return '#047857';
      case 'warning':
        return '#92400E';
      default:
        return '#1E40AF';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return '#D1FAE5';
      case 'warning':
        return '#FDE68A';
      default:
        return '#DBEAFE';
    }
  };

  return (
    <Animated.View 
      style={[
        styles.banner,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          opacity: fadeAnim,
        }
      ]}
    >
      <Bell size={20} color={getTextColor()} />
      <Text style={[styles.message, { color: getTextColor() }]}>{message}</Text>
      <TouchableOpacity onPress={handleDismiss} style={styles.dismissButton}>
        <X size={20} color={getTextColor()} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    marginRight: 8,
  },
  dismissButton: {
    padding: 4,
  },
});