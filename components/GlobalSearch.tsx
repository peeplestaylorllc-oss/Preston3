import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Search, X, Video as VideoIcon, Music, BookOpen } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { videoService, Video } from '@/utils/videoService';
import { Colors } from '@/constants/Colors';

interface GlobalSearchProps {
  visible: boolean;
  onClose: () => void;
  onVideoSelect?: (video: Video) => void;
}

export default function GlobalSearch({ visible, onClose, onVideoSelect }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Video[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      const timer = setTimeout(() => {
        performSearch();
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const videos = await videoService.searchVideos(query);
      setResults(videos);

      if (query && !recentSearches.includes(query)) {
        setRecentSearches([query, ...recentSearches.slice(0, 4)]);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
  };

  const handleVideoSelect = (video: Video) => {
    if (onVideoSelect) {
      onVideoSelect(video);
      onClose();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sermon':
        return <VideoIcon size={16} color={Colors.primary[500]} />;
      case 'worship':
        return <Music size={16} color={Colors.primary[500]} />;
      default:
        return <BookOpen size={16} color={Colors.primary[500]} />;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Search size={20} color={Colors.text.tertiary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search sermons, worship, and more..."
              value={query}
              onChangeText={setQuery}
              autoFocus
              placeholderTextColor={Colors.text.muted}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                <X size={20} color={Colors.text.tertiary} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {query.length === 0 && recentSearches.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentItem}
                  onPress={() => handleRecentSearchClick(search)}
                >
                  <Search size={16} color="#9CA3AF" />
                  <Text style={styles.recentText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary[500]} />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          )}

          {!loading && query.length > 2 && results.length === 0 && (
            <View style={styles.emptyState}>
              <Search size={48} color="#D1D5DB" />
              <Text style={styles.emptyText}>No results found</Text>
              <Text style={styles.emptySubtext}>Try different keywords</Text>
            </View>
          )}

          {!loading && results.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Videos ({results.length})</Text>
              {results.map((video) => (
                <TouchableOpacity
                  key={video.id}
                  style={styles.resultItem}
                  onPress={() => handleVideoSelect(video)}
                >
                  <Image
                    source={{ uri: `https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg` }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                  <View style={styles.resultInfo}>
                    <View style={styles.categoryBadge}>
                      {getCategoryIcon(video.category)}
                      <Text style={styles.categoryText}>
                        {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                      </Text>
                    </View>
                    <Text style={styles.resultTitle} numberOfLines={2}>
                      {video.title}
                    </Text>
                    {video.speaker && (
                      <Text style={styles.resultMeta}>{video.speaker}</Text>
                    )}
                    {video.date && (
                      <Text style={styles.resultMeta}>
                        {new Date(video.date).toLocaleDateString()}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.dark.bgElevated,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.bgCard,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.text.primary,
  },
  clearButton: {
    padding: 4,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.primary[500],
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  recentText: {
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.text.tertiary,
    marginTop: 8,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.bgCard,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  thumbnail: {
    width: 120,
    height: 90,
  },
  resultInfo: {
    flex: 1,
    padding: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 11,
    color: Colors.primary[500],
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  resultMeta: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginTop: 2,
  },
});
