import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Mail, MapPin, Heart, Users, Music, BookOpen, Hand, Gift } from 'lucide-react-native';
import { router } from 'expo-router';

export default function Ministries() {
  const ministries = [
    {
      id: 1,
      title: 'CONNECT Ministry Team',
      icon: Users,
      color: '#3B82F6',
      goal: 'Connect people from ALL walks of life to God\'s love with radical hospitality',
      opportunities: [
        'Greeters',
        'Welcome Center',
        'Fellowship after Worship',
        'Guest Follow-Up',
      ],
    },
    {
      id: 2,
      title: 'WORSHIP Ministry Team',
      icon: Music,
      color: '#8B5CF6',
      goal: 'Worship God passionately as a diverse community of Christ-followers',
      opportunities: [
        'Worship Team',
        'Usher',
        'Scripture Reading',
        'Leading Children\'s Time',
        'Choir Singing',
        'Playing Instruments',
      ],
    },
    {
      id: 3,
      title: 'GROW Ministry Team',
      icon: BookOpen,
      color: '#10B981',
      goal: 'Grow as Christians by intentionally developing faith and spirituality',
      opportunities: [
        'UMC Women',
        'New Dimensions Sunday School',
        'Leading Small Groups',
        'Starting New Small Groups',
      ],
    },
    {
      id: 4,
      title: 'SERVE Ministry Team',
      icon: Hand,
      color: '#F59E0B',
      goal: 'Serve local and global neighborhood in risk-taking mission',
      opportunities: [
        'North Dallas Shared Ministries volunteer',
        'Teacher Thanksgiving Luncheon',
        'Angel Tree Gifts',
        'Breakfast with Santa',
        'Undie Sunday',
        'Back-to-school Supplies',
        'Annual Pumpkin Patch',
      ],
      details: 'Supporting Preston Hollow Elementary School and the wider community',
    },
    {
      id: 5,
      title: 'GIVE Ministry Team',
      icon: Gift,
      color: '#EF4444',
      goal: 'Give of ourselves to God and others with extravagant generosity',
      opportunities: [
        'Stewardship Campaign',
        'Permanent Endowment',
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ministries</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Heart size={40} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.heroTitle}>Serve Your Church</Text>
            <Text style={styles.heroSubtitle}>Find Your Place in Ministry</Text>
          </View>
        </View>

        <View style={styles.introSection}>
          <Text style={styles.introText}>
            At Preston Hollow Church, we believe that every person has unique gifts and talents
            to share. Discover how you can use your gifts to make a difference in our church
            and community through our five ministry teams.
          </Text>
        </View>

        {ministries.map((ministry, index) => {
          const IconComponent = ministry.icon;
          return (
            <View key={ministry.id} style={styles.ministryCard}>
              <View style={styles.ministryHeader}>
                <View style={[styles.iconCircle, { backgroundColor: ministry.color }]}>
                  <IconComponent size={32} color="#FFFFFF" />
                </View>
                <Text style={styles.ministryTitle}>{ministry.title}</Text>
              </View>

              <View style={styles.goalSection}>
                <Text style={styles.goalLabel}>Our Goal:</Text>
                <Text style={styles.goalText}>{ministry.goal}</Text>
              </View>

              {ministry.details && (
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsText}>{ministry.details}</Text>
                </View>
              )}

              <View style={styles.opportunitiesSection}>
                <Text style={styles.opportunitiesLabel}>Volunteer Opportunities:</Text>
                <View style={styles.opportunitiesList}>
                  {ministry.opportunities.map((opportunity, idx) => (
                    <View key={idx} style={styles.opportunityItem}>
                      <View style={[styles.opportunityDot, { backgroundColor: ministry.color }]} />
                      <Text style={styles.opportunityText}>{opportunity}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {index < ministries.length - 1 && <View style={styles.divider} />}
            </View>
          );
        })}

        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ready to Get Involved?</Text>
            <Text style={styles.ctaDescription}>
              Contact us to learn more about volunteer opportunities and find the perfect
              ministry team for you.
            </Text>

            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => Linking.openURL('tel:214-363-4393')}
            >
              <Phone size={20} color="#FFFFFF" />
              <Text style={styles.contactButtonText}>Call (214) 363-4393</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactButtonSecondary}
              onPress={() => Linking.openURL('mailto:office@umcprestonhollow.com')}
            >
              <Mail size={20} color="#8B5CF6" />
              <Text style={styles.contactButtonSecondaryText}>Email Us</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.locationButton}
              onPress={() => Linking.openURL('https://maps.google.com/?q=6315+Walnut+Hill+Lane,+Dallas,+TX+75230')}
            >
              <MapPin size={20} color="#6B7280" />
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>6315 Walnut Hill Lane</Text>
                <Text style={styles.locationSubtext}>Dallas, TX 75230</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
    width: '100%',
    height: 240,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(139, 92, 246, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
  },
  introSection: {
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  introText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#4B5563',
    textAlign: 'center',
  },
  ministryCard: {
    padding: 20,
  },
  ministryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  ministryTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  goalSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  goalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1F2937',
    fontStyle: 'italic',
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailsText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
  },
  opportunitiesSection: {
    marginTop: 8,
  },
  opportunitiesLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  opportunitiesList: {
    marginLeft: 8,
  },
  opportunityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  opportunityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  opportunityText: {
    fontSize: 15,
    color: '#4B5563',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 24,
  },
  ctaSection: {
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  ctaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  contactButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    marginBottom: 16,
  },
  contactButtonSecondaryText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationInfo: {
    marginLeft: 12,
    flex: 1,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  locationSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  bottomSpacing: {
    height: 32,
  },
});
