import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
}

export default function LoadingState({ message = 'Loading...', size = 'large' }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={Colors.primary[500]} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: Colors.dark.bg,
  },
  message: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 16,
  },
});
