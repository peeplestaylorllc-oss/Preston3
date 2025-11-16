import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, TextInput, Alert, Linking, Modal } from 'react-native';
import { Play, Clock, Calendar, Download, Search, Send, Heart, Users, Music, BookOpen, MapPin, Youtube, X } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import SermonCard from '@/components/SermonCard';
import LiveStreamPlayer from '@/components/LiveStreamPlayer';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

export default function WorshipScreen() {
  const [activeTab, setActiveTab] = useState('online');
  const [prayerName, setPrayerName] = useState('');
  const [prayerEmail, setPrayerEmail] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

  const tabs = [
    { id: 'online', label: 'Live' },
    { id: 'events', label: 'Events' },
    { id: 'prayer', label: 'Prayer' },
    { id: 'ministries', label: 'Ministries' },
  ];


  const pastSermons = [
    {
      id: 1,
      videoId: 'x-UCM5GVB-s',
      title: 'Past Sermon 1',
      description: 'Sunday worship service',
      category: 'Sermon',
    },
    {
      id: 2,
      videoId: 'VhYYITg_77U',
      title: 'Past Sermon 2',
      description: 'Sunday worship service',
      category: 'Sermon',
    },
    {
      id: 3,
      videoId: '6t9uhNaFjBY',
      title: 'Past Sermon 3',
      description: 'Sunday worship service',
      category: 'Sermon',
    },
    {
      id: 4,
      videoId: 'GMsnl2e68Pk',
      title: 'Past Sermon 4',
      description: 'Sunday worship service',
      category: 'Sermon',
    },
    {
      id: 5,
      videoId: 'dvy4QbVaT2M',
      title: 'Past Sermon 5',
      description: 'Sunday worship service',
      category: 'Sermon',
    },
    {
      id: 6,
      videoId: 'pRcmjzL6B5k',
      title: 'Past Sermon 6',
      description: 'Sunday worship service',
      category: 'Sermon',
    },
    {
      id: 7,
      videoId: 'lxkLguc_NoU',
      title: 'Past Sermon 7',
      description: 'Sunday worship service',
      category: 'Sermon',
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Rise Against Hunger Packing Day',
      date: 'November 20, 2025',
      time: '10:30 AM - 12:30 PM',
      location: 'Preston Hollow Church',
      description: 'Rise Against Hunger is an international hunger relief agency that seeks to end global hunger by engaging local volunteers. Join us to package meals for those in need around the world.',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
      registerUrl: 'http://events.riseagainsthunger.org/phumc22',
    },
    {
      id: 2,
      title: 'Annual Pumpkin Patch',
      date: 'September 26, 2025',
      time: 'Sun-Fri: 2-6 PM, Sat: 9-6 PM',
      location: 'Church Grounds',
      description: 'Pick out your favorites from our HUGE variety of pumpkins! Every Saturday, the Pudgy Pumpkin Gift Shop will be open. Special events include cooking demonstrations, wreath making, flower arranging, and more. All proceeds benefit local ministries.',
      image: 'https://images.pexels.com/photos/1402464/pexels-photo-1402464.jpeg',
      endDate: 'October 26, 2025',
    },
    {
      id: 3,
      title: 'Weddings at Preston Hollow Church',
      date: 'Year Round',
      time: 'By Appointment',
      location: 'Main Sanctuary',
      description: 'The wedding ceremony is one of the most sacred rituals of the church. We consider it a holy privilege to be part of the celebration of marriage. Contact us for a tour and to discuss your special day.',
      image: 'https://images.pexels.com/photos/2788488/pexels-photo-2788488.jpeg',
    },
  ];

  const ministries = [
    {
      id: 1,
      name: 'Connect Ministry Team',
      description: 'Welcome and connect people to our church community',
      image: 'https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg',
      icon: Users,
    },
    {
      id: 2,
      name: 'Worship Ministry Team',
      description: 'Lead and support our worship services through music and arts',
      image: 'https://images.pexels.com/photos/7552296/pexels-photo-7552296.jpeg',
      icon: Music,
    },
    {
      id: 3,
      name: 'Grow Ministry Team',
      description: 'Help others grow in their faith journey',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      icon: BookOpen,
    },
    {
      id: 4,
      name: 'Serve Ministry Team',
      description: 'Make a difference through acts of service in our community',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
      icon: Heart,
    },
    {
      id: 5,
      name: 'Give Ministry Team',
      description: 'Support and manage our church giving and stewardship',
      image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg',
      icon: Heart,
    },
    {
      id: 6,
      name: 'Music Ministry',
      description: 'Join our choir, orchestra, or praise team to lead worship through music',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      icon: Music,
    },
    {
      id: 7,
      name: 'Kids Ministry',
      description: 'Nurturing young hearts through engaging activities and Bible lessons',
      image: 'https://images.pexels.com/photos/8613059/pexels-photo-8613059.jpeg',
      icon: Users,
    },
  ];

  const youtubeVideos = [
    {
      id: 1,
      videoId: 'LeM-8yct15U',
      title: 'Worship Video 1',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 2,
      videoId: '4rgOvkkwRrM',
      title: 'Worship Video 2',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 3,
      videoId: 'QhUko7DGUto',
      title: 'Worship Video 3',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 4,
      videoId: 'kD2T1BEWDAo',
      title: 'Worship Video 4',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 5,
      videoId: '3Xi6sMMHZCw',
      title: 'Worship Video 5',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 6,
      videoId: 'W5owKn7mdrs',
      title: 'Worship Video 6',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 7,
      videoId: 'hjOCNNAP0Zo',
      title: 'Worship Video 7',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 8,
      videoId: 'YTVl5Tb-DnQ',
      title: 'Worship Video 8',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 9,
      videoId: '9PwwVgZ9r9I',
      title: 'Worship Video 9',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 10,
      videoId: 'mehMC0qRHtQ',
      title: 'Worship Video 10',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 11,
      videoId: 'aQL-wDZqJqw',
      title: 'Worship Video 11',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 12,
      videoId: 'dZ9sWXXCfjw',
      title: 'Worship Video 12',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 13,
      videoId: 'JE2NxDyCa8k',
      title: 'Worship Video 13',
      description: 'Sunday worship service',
      category: 'Music',
    },
    {
      id: 14,
      videoId: 'jt4mXWejwdg',
      title: 'Worship Video 14',
      description: 'Sunday worship service',
      category: 'Music',
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const handleVideoPlay = (video: any) => {
    setSelectedVideo(video);
    setSelectedVideoId(video.videoId);
    setIsVideoModalVisible(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalVisible(false);
    setSelectedVideoId(null);
    setSelectedVideo(null);
  };

  const handleSermonPlay = (sermon: any) => {
    Alert.alert('Playing Sermon', `Now playing: ${sermon.title}`);
  };

  const handleSermonDownload = (sermon: any) => {
    Alert.alert('Download Started', `Downloading: ${sermon.title}`);
  };

  const handlePrayerSubmit = async () => {
    if (!prayerRequest.trim()) {
      Alert.alert('Prayer Request Required', 'Please enter your prayer request.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setPrayerName('');
      setPrayerEmail('');
      setPrayerRequest('');
      setIsPrivate(false);
      Alert.alert('Prayer Submitted', 'Your prayer request has been submitted successfully. Our prayer team will be praying for you.');
    }, 1500);
  };

  const openURL = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open this URL');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    return { month: month.toUpperCase(), day: day.toString() };
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'online':
        return (
          <View style={styles.tabContent}>
            <LiveStreamPlayer
              isLive={true}
              title="Sunday Morning Service"
              viewers={127}
            />

            <View style={styles.streamingLinksSection}>
              <Text style={styles.streamingLinksTitle}>Watch Our Services</Text>
              <Text style={styles.onlineWelcomeText}>
                We live stream our church service on Sundays at 10:30 am. Join us for worship on Facebook or YouTube by clicking on the links below.
              </Text>

              <TouchableOpacity
                style={styles.streamingLinkButton}
                onPress={() => Linking.openURL('https://www.facebook.com/prestonhollowpresbyterian')}
              >
                <Heart size={20} color="#FFFFFF" />
                <Text style={styles.streamingLinkText}>Watch on Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.streamingLinkButton, styles.youtubeButton]}
                onPress={() => Linking.openURL('https://www.youtube.com/@prestonhollowpresbyterian')}
              >
                <Youtube size={20} color="#FFFFFF" />
                <Text style={styles.streamingLinkText}>Watch on YouTube</Text>
              </TouchableOpacity>
              <View style={styles.upcomingServices}>
                <Text style={styles.upcomingTitle}>Sunday Morning</Text>
                <Text style={styles.serviceTime}>Sunday Morning Worship Service - 10:30 AM</Text>
                <Text style={styles.serviceTime}>Sanctuary</Text>
              </View>

              <View style={styles.upcomingServices}>
                <Text style={styles.upcomingTitle}>Wednesday Evening</Text>
                <Text style={styles.serviceTime}>Choir Rehearsal - 7-8 PM</Text>
                <Text style={styles.serviceTime}>Sanctuary</Text>
              </View>

              <View style={styles.socialSection}>
                <Text style={styles.upcomingTitle}>Be Social With Us</Text>
                <TouchableOpacity
                  style={styles.socialLink}
                  onPress={() => openURL('https://www.facebook.com/PrestonHollowChurch')}
                >
                  <Text style={styles.socialLinkText}>Follow Us on Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialLink}
                  onPress={() => openURL('https://www.instagram.com/prestonhollowchurch')}
                >
                  <Text style={styles.socialLinkText}>Follow Us on Instagram</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialLink}
                  onPress={() => openURL('https://www.youtube.com/channel/UCe4d8J7A4KnOt1tUhoYEkKg')}
                >
                  <Text style={styles.socialLinkText}>Watch Our YouTube Page</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 'events':
        return (
          <View style={styles.tabContent}>
            {events.map((event) => {
              const dateInfo = formatDate(event.date);
              return (
                <View key={event.id} style={styles.eventCard}>
                  <View style={styles.eventDateBadge}>
                    <Text style={styles.eventMonth}>{dateInfo.month}</Text>
                    <Text style={styles.eventDay}>{dateInfo.day}</Text>
                  </View>

                  <Image
                    source={{ uri: event.image }}
                    style={styles.eventImage}
                    resizeMode="cover"
                  />

                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDescription}>{event.description}</Text>

                    <View style={styles.eventDetails}>
                      <View style={styles.eventDetailItem}>
                        <Clock size={16} color="#6B7280" />
                        <Text style={styles.eventDetailText}>{event.time}</Text>
                      </View>
                      <View style={styles.eventDetailItem}>
                        <MapPin size={16} color="#6B7280" />
                        <Text style={styles.eventDetailText}>{event.location}</Text>
                      </View>
                      {event.endDate && (
                        <View style={styles.eventDetailItem}>
                          <Calendar size={16} color="#6B7280" />
                          <Text style={styles.eventDetailText}>Until {event.endDate}</Text>
                        </View>
                      )}
                    </View>

                    {event.registerUrl ? (
                      <TouchableOpacity
                        style={styles.rsvpButton}
                        onPress={() => Linking.openURL(event.registerUrl)}
                      >
                        <Text style={styles.rsvpButtonText}>Register Here</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={styles.rsvpButton}>
                        <Text style={styles.rsvpButtonText}>Learn More</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        );

      case 'prayer':
        return (
          <View style={styles.tabContent}>
            <View style={styles.formSection}>
              <View style={styles.formHeader}>
                <Heart size={24} color={Colors.primary[500]} />
                <Text style={styles.formTitle}>Submit Prayer Request</Text>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name (Optional)</Text>
                <TextInput
                  style={styles.textInput}
                  value={prayerName}
                  onChangeText={setPrayerName}
                  placeholder="Your name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email (Optional)</Text>
                <TextInput
                  style={styles.textInput}
                  value={prayerEmail}
                  onChangeText={setPrayerEmail}
                  placeholder="your.email@example.com"
                  keyboardType="email-address"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Prayer Request *</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={prayerRequest}
                  onChangeText={setPrayerRequest}
                  placeholder="Share your prayer request here..."
                  multiline
                  numberOfLines={4}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              
              <TouchableOpacity 
                style={[styles.submitButton, isSubmitting && styles.submittingButton]}
                onPress={handlePrayerSubmit}
                disabled={isSubmitting}
              >
                <Send size={16} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>
                  {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'ministries':
        return (
          <View style={styles.tabContent}>
            {ministries.map((ministry) => (
              <View key={ministry.id} style={styles.ministryCard}>
                <Image
                  source={{ uri: ministry.image }}
                  style={styles.ministryImage}
                  resizeMode="cover"
                />
                <View style={styles.ministryContent}>
                  <View style={styles.ministryHeader}>
                    <ministry.icon size={24} color={Colors.primary[500]} />
                    <Text style={styles.ministryName}>{ministry.name}</Text>
                  </View>
                  <Text style={styles.ministryDescription}>{ministry.description}</Text>
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Learn More</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Worship & Ministry</Text>
        <Text style={styles.headerSubtitle}>Connect with God and community</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {renderTabContent()}
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
              {selectedVideo?.title || 'Worship Video'}
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
                  <Text style={styles.videoDetailsCategory}>
                    {selectedVideo.category}
                  </Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.bg,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.dark.bgElevated,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary[500],
    fontFamily: 'CrimsonText-Bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  tabsContainer: {
    backgroundColor: Colors.dark.bgElevated,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary[500],
  },
  tabText: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.primary[500],
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    color: Colors.text.primary,
  },
  onlineWelcomeSection: {
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  onlineWelcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'CrimsonText-Bold',
  },
  onlineWelcomeText: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  streamingLinksSection: {
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  streamingLinksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'CrimsonText-Bold',
  },
  streamingLinkButton: {
    backgroundColor: Colors.primary[500],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  socialSection: {
    backgroundColor: Colors.dark.bg,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  socialLink: {
    paddingVertical: 8,
  },
  socialLinkText: {
    fontSize: 14,
    color: Colors.primary[500],
    fontWeight: '600',
    textAlign: 'center',
  },
  youtubeButton: {
    backgroundColor: '#DC2626',
  },
  streamingLinkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  eventCard: {
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  eventDateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.primary[500],
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    zIndex: 1,
    minWidth: 50,
  },
  eventMonth: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  eventDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eventImage: {
    width: '100%',
    height: 140,
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
    fontFamily: 'CrimsonText-Bold',
  },
  eventDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventDetailText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 8,
  },
  rsvpButton: {
    borderWidth: 2,
    borderColor: Colors.primary[500],
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rsvpButtonText: {
    color: Colors.primary[500],
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  formSection: {
    backgroundColor: Colors.dark.bgElevated,
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
    color: Colors.text.primary,
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
    backgroundColor: Colors.dark.bg,
    borderWidth: 1,
    borderColor: Colors.dark.borderLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text.primary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.primary[500],
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
    backgroundColor: Colors.primary[500],
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  wednesdaysWordButton: {
    backgroundColor: Colors.primary[500],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  wednesdaysWordText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  ministryCard: {
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  ministryImage: {
    width: '100%',
    height: 120,
  },
  ministryContent: {
    padding: 16,
  },
  ministryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ministryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginLeft: 8,
    fontFamily: 'CrimsonText-Bold',
  },
  ministryDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  ministryDetails: {
    marginBottom: 16,
  },
  ministryLeader: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  ministryTime: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  joinButton: {
    borderWidth: 2,
    borderColor: Colors.primary[500],
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: Colors.primary[500],
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  musicTabContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  musicSectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginBottom: 8,
    fontFamily: 'CrimsonText-Bold',
  },
  musicSectionSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  musicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  musicVideoCard: {
    width: (width - 48) / 2,
    marginBottom: 20,
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  musicVideoImageContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  musicVideoImage: {
    width: '100%',
    height: '100%',
  },
  musicVideoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicPlayIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicVideoInfo: {
    padding: 12,
  },
  musicVideoCategory: {
    fontSize: 12,
    color: Colors.primary[500],
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  musicVideoTitle: {
    fontSize: 14,
    color: Colors.text.primary,
    fontWeight: '600',
    lineHeight: 18,
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
    fontFamily: 'CrimsonText-Bold',
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
    backgroundColor: Colors.dark.bgElevated,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  videoDetailsCategory: {
    fontSize: 12,
    color: Colors.primary[500],
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  videoDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 12,
    fontFamily: 'CrimsonText-Bold',
  },
  videoDetailsDescription: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  upcomingServices: {
    backgroundColor: Colors.dark.bg,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  serviceTime: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
    textAlign: 'center',
  },
});