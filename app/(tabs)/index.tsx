import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Dimensions, Animated, Linking, Modal, RefreshControl } from 'react-native';
import { Video, Heart, MessageCircle, Calendar, Bell, BookOpen, Users, ChevronRight, Music, Youtube, X, Search } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import NotificationBanner from '@/components/NotificationBanner';
import YoutubePlayer from 'react-native-youtube-iframe';
import GlobalSearch from '@/components/GlobalSearch';
import ContinueWatching from '@/components/ContinueWatching';
import VideoCard from '@/components/VideoCard';
import FeaturedVideoCard from '@/components/FeaturedVideoCard';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import WorshipStream from '@/components/WorshipStream';
import WorshipPlaylist from '@/components/WorshipPlaylist';
import { videoService, Video as VideoType } from '@/utils/videoService';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');


export default function HomeScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [sermons, setSermons] = useState<VideoType[]>([]);
  const [worshipVideos, setWorshipVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const praiseWorshipY = useRef<number>(0);
  const slideImages = [
    require('@/assets/images/Screen Shot 2025-10-17 at 8.04.30 PM.png'),
    require('@/assets/images/Screen Shot 2025-10-17 at 8.04.15 PM.png'),
    require('@/assets/images/Screen Shot 2025-10-17 at 8.04.21 PM.png'),
  ];

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadContent = async () => {
    try {
      setError(false);
      const [sermonsData, worshipData] = await Promise.all([
        videoService.getAllVideos('sermon'),
        videoService.getAllVideos('worship'),
      ]);
      setSermons(sermonsData.slice(0, 10));
      setWorshipVideos(worshipData.slice(0, 10));
    } catch (err) {
      console.error('Error loading content:', err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadContent();
  };

  const musicAndArts = [
    {
      id: 1,
      title: 'Singers of Praise',
      description: 'Read more',
      thumbnail: require('@/assets/images/112-SAM03161-scaled copy.jpg'),
      link: 'https://prestonhollowchurch.com/music-and-arts-ministry/'
    },
    {
      id: 2,
      title: 'Arts Ministry Team',
      description: 'Read more',
      thumbnail: { uri: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg' },
      link: 'https://prestonhollowchurch.com/music-and-arts-ministry/'
    },
    {
      id: 4,
      title: 'Virtual Choir',
      description: 'Read more',
      thumbnail: { uri: 'https://images.pexels.com/photos/7520390/pexels-photo-7520390.jpeg' },
      link: 'https://prestonhollowchurch.com/america-virtual-choir/choir/'
    },
  ];

  const handleVideoPress = (video: VideoType) => {
    setSelectedVideo(video);
    setSelectedVideoId(video.video_id);
    setIsVideoModalVisible(true);
    videoService.incrementViewCount(video.id);
  };

  const closeVideoModal = () => {
    setIsVideoModalVisible(false);
    setSelectedVideoId(null);
    setSelectedVideo(null);
  };

  const scrollToPraiseWorship = () => {
    scrollViewRef.current?.scrollTo({
      y: praiseWorshipY.current,
      animated: true,
    });
  };



  const liveServices = [
    {
      id: 0,
      title: "WEDNESDAY'S WORD",
      thumbnail: require('@/assets/images/Screen Shot 2025-11-13 at 10.20.17 AM.png')
    },
    {
      id: 1,
      title: 'Sunday Morning Worship',
      thumbnail: require('@/assets/images/112-SAM03161-scaled copy copy copy.jpg')
    },
  ];

  const cdcSections = [
    {
      id: 1,
      title: 'CDC Overview',
      description: 'Mission, philosophy & programs',
      thumbnail: { uri: 'https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg' },
      route: '/cdc-overview'
    },
    {
      id: 2,
      title: 'Age-Based Programs',
      description: 'Infant through Pre-K',
      thumbnail: { uri: 'https://images.pexels.com/photos/8364028/pexels-photo-8364028.jpeg' },
      route: '/cdc-programs'
    },
    {
      id: 3,
      title: 'Enrollment & Tuition',
      description: '2025-26 school year',
      thumbnail: { uri: 'https://images.pexels.com/photos/8422149/pexels-photo-8422149.jpeg' },
      route: '/cdc-enrollment'
    },
  ];

  const childrenPrograms = [
    {
      id: 1,
      title: "Children's Ministry",
      description: 'Read more',
      thumbnail: { uri: 'https://images.pexels.com/photos/8422149/pexels-photo-8422149.jpeg' }
    },
    {
      id: 2,
      title: "Children's Music Ministry",
      description: 'Read more',
      thumbnail: { uri: 'https://images.pexels.com/photos/8617842/pexels-photo-8617842.jpeg' }
    },
    {
      id: 4,
      title: 'Youth',
      description: 'Read more',
      thumbnail: require('@/assets/images/Screen Shot 2025-10-07 at 1.05.31 PM.png')
    },
    {
      id: 5,
      title: 'Family Ministry',
      description: 'Read more',
      thumbnail: require('@/assets/images/Screen Shot 2025-10-07 at 1.05.40 PM.png')
    },
  ];

  const serveMinistryTeams = [
    {
      id: 1,
      title: 'Connect Ministry Team',
      description: 'Read more',
      thumbnail: { uri: 'https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg' }
    },
    {
      id: 2,
      title: 'Worship Ministry Team',
      description: 'Read more',
      thumbnail: { uri: 'https://images.pexels.com/photos/7552296/pexels-photo-7552296.jpeg' }
    },
    {
      id: 3,
      title: 'Grow Ministry Team',
      description: 'Read more',
      thumbnail: { uri: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg' }
    },
    {
      id: 4,
      title: 'Serve Ministry Team',
      description: 'Read more',
      thumbnail: { uri: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg' }
    },
    {
      id: 5,
      title: 'Give Ministry Team',
      description: 'Read more',
      thumbnail: { uri: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg' }
    },
  ];

  const prestonHollowItems = [
    {
      id: 0,
      title: "WEDNESDAY'S WORD",
      description: 'Wednesday worship service',
      thumbnail: require('@/assets/images/Screen Shot 2025-11-13 at 10.20.17 AM.png')
    },
    {
      id: 0.5,
      title: 'Sunday Morning Worship',
      description: 'Sunday worship service',
      thumbnail: require('@/assets/images/112-SAM03161-scaled copy copy copy.jpg')
    },
    {
      id: 1,
      title: 'Meet the Pastor',
      description: 'Get to know Pastor Tom and his heart for ministry',
      thumbnail: require('@/assets/images/Screen Shot 2025-11-10 at 7.29.36 PM.png')
    },
    {
      id: 2,
      title: 'Meet the Team',
      description: 'Our dedicated staff and ministry leaders',
      thumbnail: require('@/assets/images/Screen Shot 2025-11-12 at 2.51.13 PM.png')
    },
    {
      id: 4,
      title: 'Weddings',
      description: 'Celebrate your special day with us',
      thumbnail: { uri: 'https://images.pexels.com/photos/2788488/pexels-photo-2788488.jpeg?auto=compress&cs=tinysrgb&w=400' }
    },
    {
      id: 5,
      title: 'Contact',
      description: 'Get in touch with Preston Hollow Church',
      thumbnail: require('@/assets/images/Screen Shot 2025-11-12 at 2.46.13 PM.png')
    },
  ];

  const recentPrayers = [
    {
      id: 1,
      request: 'Please pray for healing for my grandmother who is in the hospital.',
      author: 'Sarah M.',
      date: '2 hours ago',
      prayers: 12
    },
    {
      id: 2,
      request: 'Pray for wisdom as I make important career decisions.',
      author: 'Anonymous',
      date: '5 hours ago',
      prayers: 8
    },
  ];

  const ageGroups = [
    { id: 'all', label: 'All Ages' },
    { id: 'nursery', label: '0-3 years' },
    { id: 'preschool', label: '3-5 years' },
    { id: 'elementary', label: '6-12 years' },
  ];

  const programs = [
    {
      id: 1,
      name: 'KidZone (Ages 3-12)',
      time: 'Sunday 10:30 AM',
      ageGroup: 'elementary',
      description: 'Interactive Bible lessons, games, and activities designed for young minds to learn about God\'s love in a fun, engaging environment.',
      image: 'https://images.pexels.com/photos/8613059/pexels-photo-8613059.jpeg',
      features: ['Bible Stories', 'Crafts & Games', 'Music & Worship', 'Snack Time']
    },
    {
      id: 2,
      name: 'Nursery (0-3 years)',
      time: 'Sunday 10:30 AM',
      ageGroup: 'nursery',
      description: 'Safe, loving care for infants and toddlers during service with trained volunteers and age-appropriate activities.',
      image: 'https://images.pexels.com/photos/1620653/pexels-photo-1620653.jpeg',
      features: ['Safe Environment', 'Trained Caregivers', 'Age-Appropriate Toys', 'Diaper Changing']
    },
  ];




  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <LoadingState message="Loading content..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <ErrorState message="Failed to load content" onRetry={loadContent} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary[500]} />
        }
      >
        {/* Hero Slideshow */}
        <View style={styles.heroWrapper}>
          <View style={styles.heroContainer}>
            <Animated.Image
              source={slideImages[currentSlide]}
              style={[styles.heroImage, { opacity: fadeAnim }]}
              resizeMode="cover"
            />
            <View style={styles.slideDots}>
              {slideImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentSlide && styles.activeDot,
                  ]}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setSearchVisible(true)}
            >
              <Search size={20} color="#FFFFFF" />
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Watching */}
        <ContinueWatching onVideoPress={handleVideoPress} />

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>Welcome</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsScroll}
          >
            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => router.push('/(tabs)/worship')}
            >
              <View style={styles.quickActionCircle}>
                <Video size={28} color={Colors.primary[500]} strokeWidth={2} />
              </View>
              <Text style={styles.quickActionLabel}>Stream</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => router.push('/ministries')}
            >
              <View style={styles.quickActionCircle}>
                <Users size={28} color={Colors.primary[500]} strokeWidth={2} />
              </View>
              <Text style={styles.quickActionLabel}>Ministries</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => router.push('/prayer-request')}
            >
              <View style={styles.quickActionCircle}>
                <MessageCircle size={28} color={Colors.primary[500]} strokeWidth={2} />
              </View>
              <Text style={styles.quickActionLabel}>Prayer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => router.push('/(tabs)/kids')}
            >
              <View style={styles.quickActionCircle}>
                <Users size={28} color={Colors.primary[500]} strokeWidth={2} />
              </View>
              <Text style={styles.quickActionLabel}>Kids</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => router.push('/(tabs)/give')}
            >
              <View style={styles.quickActionCircle}>
                <Heart size={28} color={Colors.primary[500]} strokeWidth={2} />
              </View>
              <Text style={styles.quickActionLabel}>Give</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={scrollToPraiseWorship}
            >
              <View style={styles.quickActionCircle}>
                <Music size={28} color={Colors.primary[500]} strokeWidth={2} />
              </View>
              <Text style={styles.quickActionLabel}>Music</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => Linking.openURL('https://prestonhollowchurch.churchcenter.com/calendar?view=list')}
            >
              <View style={styles.quickActionCircle}>
                <Bell size={28} color={Colors.primary[500]} strokeWidth={2} />
              </View>
              <Text style={styles.quickActionLabel}>News</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Worship Stream Section */}
        <WorshipStream
          channelId="UCe4d8J7A4KnOt1tUhoYEkKg"
          title="WORSHIP STREAM"
          maxItems={12}
        />

        {/* Worship Playlist Section */}
        <View
          onLayout={(event) => {
            praiseWorshipY.current = event.nativeEvent.layout.y;
          }}
        >
          <WorshipPlaylist
            playlist="https://www.youtube.com/playlist?list=PLVtZOGy7kwSWeaa9O5-AKX3TIHEsjUslo"
            title="Praise & Worship"
            maxItems={12}
          />
        </View>

        {/* Morning Worship Section */}
        <View style={styles.prestonHollowSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>MORNING WORSHIP</Text>
            <ChevronRight size={20} color="#6B7280" />
          </View>
          <FlatList
            data={prestonHollowItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.carouselContent}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cdcCard}
                onPress={() => {
                  if (item.title === "WEDNESDAY'S WORD") {
                    Linking.openURL('https://prestonhollowchurch.com/category/sermons/wednesdays-word/');
                  } else if (item.title === 'Sunday Morning Worship') {
                    router.push('/(tabs)/worship');
                  } else if (item.title === 'Meet the Pastor') {
                    Linking.openURL('https://prestonhollowchurch.com/meet-the-pastor/');
                  } else if (item.title === 'Meet the Team') {
                    Linking.openURL('https://prestonhollowchurch.com/meet-the-team/');
                  } else if (item.title === 'Weddings') {
                    router.push('/weddings');
                  } else if (item.title === 'Contact') {
                    Linking.openURL('https://prestonhollowchurch.com/contact/');
                  }
                }}
              >
                <Image
                  source={item.thumbnail}
                  style={[
                    styles.cdcThumbnail,
                    item.title === 'Meet the Team' && { resizeMode: 'contain', backgroundColor: '#000' }
                  ]}
                />
                <View style={styles.cdcCardContent}>
                  <Text style={styles.cdcTitle}>{item.title}</Text>
                  <Text style={styles.cdcDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* CDC Section */}
        <View style={styles.cdcSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>CHILD DEVELOPMENT CENTER</Text>
            <ChevronRight size={20} color="#6B7280" />
          </View>
          <FlatList
            data={cdcSections}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.carouselContent}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cdcCard}
                onPress={() => router.push(item.route as any)}
              >
                <Image
                  source={item.thumbnail}
                  style={styles.cdcThumbnail}
                  resizeMode="cover"
                />
                <View style={styles.cdcCardContent}>
                  <Text style={styles.cdcTitle}>{item.title}</Text>
                  <Text style={styles.cdcDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Serve Section */}
        <View style={styles.serveSection}>
          <TouchableOpacity
            style={styles.sectionTitleRow}
            onPress={() => router.push('/ministries')}
          >
            <Text style={styles.sectionTitle}>SERVE</Text>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
          <FlatList
            data={serveMinistryTeams}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.carouselContent}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cdcCard}
                onPress={() => router.push('/ministries')}
              >
                <Image
                  source={item.thumbnail}
                  style={styles.cdcThumbnail}
                  resizeMode="cover"
                />
                <View style={styles.cdcCardContent}>
                  <Text style={styles.cdcTitle}>{item.title}</Text>
                  <Text style={styles.cdcDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

      </ScrollView>

      <Modal
        visible={isVideoModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeVideoModal}
      >
        <SafeAreaView style={styles.videoModalContainer}>
          <View style={styles.videoModalHeader}>
            <Text style={styles.videoModalTitle}>
              {selectedVideo?.title || 'Sermon Video'}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeVideoModal}
            >
              <X size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>

          {selectedVideoId && (
            <>
              <View style={styles.videoPlayerContainer}>
                <YoutubePlayer
                  height={250}
                  play={true}
                  videoId={selectedVideoId}
                  webViewProps={{
                    androidLayerType: 'hardware',
                  }}
                />
              </View>

              {selectedVideo && (
                <View style={styles.videoDetailsContainer}>
                  <Text style={styles.videoDetailsTitle}>
                    {selectedVideo.title}
                  </Text>
                  <Text style={styles.videoDetailsDescription}>
                    {selectedVideo.description}
                  </Text>
                </View>
              )}
            </>
          )}
        </SafeAreaView>
      </Modal>

      <GlobalSearch
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onVideoSelect={handleVideoPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.bg,
  },
  heroVideoContainer: {
    height: 250,
    backgroundColor: '#FFFFFF',
  },
  musicCarouselSection: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  carouselContent: {
    paddingLeft: 0,
    paddingRight: 8,
  },
  featuredCarouselContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  musicArtsCard: {
    width: 120,
    marginRight: 12,
  },
  musicArtsThumbnail: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  musicArtsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'left',
  },
  liveServicesSection: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  liveServiceCard: {
    width: 120,
    marginRight: 12,
  },
  liveServiceThumbnail: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  liveServiceTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'left',
  },
  cdcSection: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  cdcCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: Colors.dark.bgCard,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cdcThumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
  },
  cdcCardContent: {
    padding: 12,
  },
  cdcTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  cdcDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  childrenSection: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  childrenCard: {
    width: 120,
    marginRight: 12,
  },
  childrenThumbnail: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  childrenTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'left',
  },
  serveSection: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  quickActionsContainer: {
    backgroundColor: Colors.dark.bgElevated,
    paddingTop: 24,
    paddingBottom: 20,
    marginBottom: 8,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  quickActionsScroll: {
    paddingHorizontal: 16,
    gap: 20,
  },
  quickActionItem: {
    alignItems: 'center',
    width: 70,
  },
  quickActionCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.dark.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    letterSpacing: 0.5,
  },
  blogPreview: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  blogCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  blogImage: {
    width: '100%',
    height: 160,
  },
  blogContent: {
    padding: 16,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    fontFamily: 'CrimsonText-Bold',
  },
  blogAuthor: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  blogDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  blogExcerpt: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
  },
  wordsFromPastorSection: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  wordCarouselCard: {
    width: 140,
    height: 90,
    marginRight: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  wordThumbnail: {
    width: '100%',
    height: '100%',
  },
  wordOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
  },
  wordCarouselTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  wordCarouselDate: {
    fontSize: 10,
    color: Colors.dark.border,
  },
  heroWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: Colors.dark.bg,
  },
  heroContainer: {
    height: 180,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: Colors.dark.bgCard,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  slideDots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  searchButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  missionSection: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  prestonHollowSection: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  missionBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  missionOverlay: {
    backgroundColor: 'rgba(59, 130, 246, 0.85)',
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  missionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    justifyContent: 'center',
  },
  missionLine: {
    height: 2,
    backgroundColor: '#FFFFFF',
    width: 60,
    marginHorizontal: 16,
  },
  missionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 3,
    textAlign: 'center',
  },
  missionText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 26,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  contentTabs: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  tabScrollView: {
    paddingHorizontal: 16,
  },
  contentTab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeContentTab: {
    borderBottomColor: '#F59E0B',
  },
  contentTabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeContentTabText: {
    color: '#F59E0B',
    fontWeight: 'bold',
  },
  tabContent: {
    paddingHorizontal: 16,
  },
  liveInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  liveTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    fontFamily: 'CrimsonText-Bold',
  },
  liveDescription: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  watchLiveButton: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  watchLiveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  rsvpButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rsvpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    marginBottom: 16,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
    fontFamily: 'CrimsonText-Bold',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  submittingButton: {
    backgroundColor: '#D97706',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  recentSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    marginBottom: 16,
  },
  prayerCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  prayerRequest: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
    marginBottom: 12,
  },
  prayerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  prayerAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  prayerDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  prayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  prayButtonText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
    marginLeft: 4,
  },
  welcomeSection: {
    marginBottom: 16,
  },
  welcomeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#FEF3C7',
  },
  programCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  programImage: {
    width: '100%',
    height: 160,
  },
  programContent: {
    padding: 16,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  programName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    fontFamily: 'CrimsonText-Bold',
  },
  programTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  programDescription: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginLeft: 6,
  },
  registerButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  wednesdaysWordButton: {
    backgroundColor: Colors.primary[500],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  wednesdaysWordText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sermonCard: {
    width: 100,
    marginRight: 12,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  sermonThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  sermonOverlay: {
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
  sermonOverlayTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  videoModalContainer: {
    flex: 1,
    backgroundColor: Colors.dark.bg,
  },
  videoModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.dark.bgElevated,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  videoModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  closeButton: {
    padding: 8,
  },
  videoPlayerContainer: {
    backgroundColor: '#000000',
    marginTop: 20,
  },
  videoDetailsContainer: {
    padding: 20,
    backgroundColor: Colors.dark.bgCard,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  videoDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  videoDetailsDescription: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  worshipMusicSection: {
    marginBottom: 8,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: Colors.dark.bg,
  },
  musicVideoCard: {
    width: 100,
    marginRight: 12,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  musicVideoThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  musicVideoOverlay: {
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
  musicVideoOverlayTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'left',
  },
});