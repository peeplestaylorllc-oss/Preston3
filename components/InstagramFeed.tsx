import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Instagram, Heart, MessageCircle, Share2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface InstagramFeedProps {
  username?: string;
}

const feedCards = [
  {
    id: '1',
    icon: 'instagram',
    text: 'Follow us on Instagram',
    subtext: '@prestonhollowchurch',
  },
  {
    id: '2',
    icon: 'camera',
    text: 'See our latest posts',
    subtext: 'Daily Updates',
  },
  {
    id: '3',
    icon: 'heart',
    text: 'Connect with us',
    subtext: 'Join the Community',
  },
  {
    id: '4',
    icon: 'message',
    text: 'Share your story',
    subtext: 'We want to hear from you',
  },
];

export default function InstagramFeed({ username = 'prestonhollowchurch' }: InstagramFeedProps) {
  const handleCardPress = () => {
    Linking.openURL(`https://www.instagram.com/${username}/`);
  };

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'instagram':
        return <Instagram size={48} color="#FFFFFF" strokeWidth={2} />;
      case 'camera':
        return <Instagram size={48} color="#FFFFFF" strokeWidth={2} />;
      case 'heart':
        return <Heart size={48} color="#FFFFFF" strokeWidth={2} />;
      case 'message':
        return <MessageCircle size={48} color="#FFFFFF" strokeWidth={2} />;
      default:
        return <Instagram size={48} color="#FFFFFF" strokeWidth={2} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Instagram size={24} color={Colors.primary[500]} strokeWidth={2} />
        <Text style={styles.title}>FEED</Text>
        <TouchableOpacity onPress={handleCardPress} style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.feedContainer}
      >
        {feedCards.map((card) => (
          <TouchableOpacity
            key={card.id}
            onPress={handleCardPress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#405DE6', '#5851DB', '#833AB4', '#C13584', '#E1306C', '#FD1D1D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBorder}
            >
              <View style={styles.postCard}>
                <View style={styles.iconContainer}>
                  {renderIcon(card.icon)}
                </View>
                <Text style={styles.postText}>{card.text}</Text>
                <Text style={styles.subtextText}>{card.subtext}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.bg,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.primary,
    flex: 1,
  },
  followButton: {
    backgroundColor: Colors.primary[500],
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  feedContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  gradientBorder: {
    width: 140,
    height: 200,
    borderRadius: 12,
    padding: 2,
  },
  postCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  iconContainer: {
    marginBottom: 12,
  },
  postText: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
  subtextText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
  },
});
