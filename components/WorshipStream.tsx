import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { X, Play } from 'lucide-react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface Video {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  url: string;
}

interface WorshipStreamProps {
  channelId?: string;
  apiKey?: string;
  title?: string;
  maxItems?: number;
  refreshIntervalMs?: number;
}

function getVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    return u.searchParams.get('v');
  } catch (e) {
    return null;
  }
}

export default function WorshipStream({
  channelId = 'UCe4d8J7A4KnOt1tUhoYEkKg',
  apiKey = '',
  title = 'WORSHIP STREAM',
  maxItems = 12,
  refreshIntervalMs = 5 * 60 * 1000,
}: WorshipStreamProps) {
  const [items, setItems] = useState<Video[]>([]);
  const [channelThumb, setChannelThumb] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const prevTopRef = useRef<string | null>(null);

  const rssUrl = useMemo(() => {
    const feed = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    return `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`;
  }, [channelId]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function fetchOnce() {
      try {
        const r = await fetch(rssUrl, { signal: controller.signal });
        if (!r.ok) throw new Error(`RSS request failed (${r.status})`);
        const data = await r.json();
        if (!data || !data.items) throw new Error('Unexpected RSS data');

        const vids: Video[] = data.items
          .filter((it: any) => getVideoId(it.link))
          .slice(0, maxItems)
          .map((it: any) => ({
            id: getVideoId(it.link)!,
            title: it.title,
            published: it.pubDate,
            thumbnail:
              (it.thumbnail && it.thumbnail.replace('mqdefault', 'hqdefault')) ||
              (getVideoId(it.link)
                ? `https://img.youtube.com/vi/${getVideoId(it.link)}/hqdefault.jpg`
                : ''),
            url: it.link,
          }));

        if (!cancelled) {
          setChannelThumb(data.feed?.image || '');
          const nextTop = vids?.[0]?.id;
          const prevTop = prevTopRef.current;
          if (prevTop && prevTop !== nextTop) {
            setHighlightId(nextTop);
            setTimeout(() => setHighlightId(null), 6000);
          }
          prevTopRef.current = nextTop;
          setItems((prev) => {
            const pTop = prev?.[0]?.id;
            const nTop = vids?.[0]?.id;
            if (pTop !== nTop || prev.length !== vids.length) return vids;
            const changed = prev.some((p, i) => p.id !== vids[i]?.id);
            return changed ? vids : prev;
          });
          setLoading(false);
          setError('');
        }
        return true;
      } catch (e) {
        console.warn('RSS load failed', e);
      }

      if (!apiKey) {
        if (!cancelled) {
          setError('Could not load feed.');
          setLoading(false);
        }
        return false;
      }

      try {
        const chResp = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`,
          { signal: controller.signal }
        );
        const chJson = await chResp.json();
        const avatar =
          chJson?.items?.[0]?.snippet?.thumbnails?.high?.url ||
          chJson?.items?.[0]?.snippet?.thumbnails?.default?.url ||
          '';

        const searchResp = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=${maxItems}&type=video&key=${apiKey}`,
          { signal: controller.signal }
        );
        const sJson = await searchResp.json();
        const vids: Video[] = (sJson.items || []).map((it: any) => ({
          id: it.id.videoId,
          title: it.snippet.title,
          published: it.snippet.publishedAt,
          thumbnail: it.snippet.thumbnails?.high?.url || it.snippet.thumbnails?.default?.url,
          url: `https://www.youtube.com/watch?v=${it.id.videoId}`,
        }));

        if (!cancelled) {
          setChannelThumb(avatar);
          const nextTop = vids?.[0]?.id;
          const prevTop = prevTopRef.current;
          if (prevTop && prevTop !== nextTop) {
            setHighlightId(nextTop);
            setTimeout(() => setHighlightId(null), 6000);
          }
          prevTopRef.current = nextTop;
          setItems((prev) => {
            const pTop = prev?.[0]?.id;
            const nTop = vids?.[0]?.id;
            if (pTop !== nTop || prev.length !== vids.length) return vids;
            const changed = prev.some((p, i) => p.id !== vids[i]?.id);
            return changed ? vids : prev;
          });
          setLoading(false);
          setError('');
        }
        return true;
      } catch (e) {
        if (!cancelled) {
          setError('YouTube API request failed.');
          setLoading(false);
        }
        return false;
      }
    }

    async function loadInitial() {
      setLoading(true);
      await fetchOnce();
    }

    loadInitial();

    let intervalId: NodeJS.Timeout | null = null;
    if (refreshIntervalMs && refreshIntervalMs > 0) {
      intervalId = setInterval(() => {
        fetchOnce();
      }, refreshIntervalMs);
    }

    return () => {
      cancelled = true;
      controller.abort();
      if (intervalId) clearInterval(intervalId);
    };
  }, [rssUrl, apiKey, channelId, maxItems, refreshIntervalMs]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.videoCount}>{items.length} videos</Text>
      </View>

      {loading && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.loadingContainer}>
          {[...Array(5)].map((_, i) => (
            <View key={i} style={styles.skeletonCard} />
          ))}
        </ScrollView>
      )}

      {!loading && error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          snapToInterval={196}
          decelerationRate="fast"
        >
          {items.map((v, idx) => (
            <TouchableOpacity
              key={v.id + idx}
              onPress={() => setActiveVideoId(v.id)}
              activeOpacity={0.8}
              style={[
                styles.videoCard,
                v.id === highlightId && styles.highlightCard,
              ]}
            >
              <Image source={{ uri: v.thumbnail }} style={styles.thumbnail} />
              <View style={styles.gradient}>
                <View style={styles.channelThumbContainer}>
                  {channelThumb ? (
                    <Image source={{ uri: channelThumb }} style={styles.channelThumb} />
                  ) : (
                    <View style={styles.channelThumbPlaceholder}>
                      <Text style={styles.channelThumbText}>PHC</Text>
                    </View>
                  )}
                </View>
                <View style={styles.playIconContainer}>
                  <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.videoTitle} numberOfLines={2}>
                    {v.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <Modal visible={!!activeVideoId} transparent animationType="fade" onRequestClose={() => setActiveVideoId(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.playerContainer}>
              {activeVideoId && (
                <YoutubePlayer
                  height={220}
                  videoId={activeVideoId}
                  play={true}
                />
              )}
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveVideoId(null)}>
              <X size={24} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  videoCount: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  loadingContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  skeletonCard: {
    width: 180,
    height: 280,
    borderRadius: 16,
    backgroundColor: '#1E293B',
  },
  errorContainer: {
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  errorText: {
    fontSize: 14,
    color: '#DC2626',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  videoCard: {
    width: 180,
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  highlightCard: {
    borderWidth: 4,
    borderColor: '#10B981',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  channelThumbContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  channelThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  channelThumbPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelThumbText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  playIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  playerContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  closeButton: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
});
