import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { Baby, Calendar, Clock, MapPin, Star, Heart, Users, BookOpen, Gamepad2, Sparkles, Shield, Target } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.bg,
  },
  header: {
    backgroundColor: Colors.primary[500],
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#BFDBFE',
  },
  welcomeSection: {
    position: 'relative',
    height: 200,
    marginBottom: 12,
  },
  welcomeImage: {
    width: '100%',
    height: '100%',
  },
  welcomeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: Colors.dark.border,
    textAlign: 'center',
  },
  ageGroupTabs: {
    marginVertical: 20,
  },
  ageGroupTabsContent: {
    paddingHorizontal: 20,
  },
  ageGroupTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    backgroundColor: Colors.dark.border,
    borderRadius: 20,
  },
  activeAgeGroupTab: {
    backgroundColor: Colors.primary[500],
  },
  ageGroupTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  activeAgeGroupTabText: {
    color: '#FFFFFF',
  },
  programsSection: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 2,
  },
  programCard: {
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  programImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
    color: '#D4A574',
    flex: 1,
  },
  programTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.bgCard,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  programTime: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  programDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  registerButton: {
    borderWidth: 2,
    borderColor: Colors.primary[500],
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: Colors.primary[500],
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  eventsSection: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 12,
  },
  eventCard: {
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  eventDateBadge: {
    backgroundColor: Colors.primary[500],
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  eventMonth: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#BFDBFE',
    textTransform: 'uppercase',
  },
  eventDay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eventImage: {
    width: 80,
    height: 80,
  },
  eventContent: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4A574',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  eventDetails: {
    marginBottom: 8,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  eventDetailText: {
    fontSize: 11,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  rsvpButton: {
    backgroundColor: '#059669',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  rsvpButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  safetySection: {
    backgroundColor: Colors.dark.border,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  safetyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginLeft: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  safetyDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  safetyFeatures: {
    gap: 12,
  },
  safetyFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.bgElevated,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  safetyFeatureText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 8,
  },
  resourcesSection: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 12,
  },
  resourcesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 2,
  },
  resourcesDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  resourcesList: {
    gap: 12,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.bgElevated,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  resourceText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 12,
    fontWeight: '500',
  },
  contactSection: {
    backgroundColor: Colors.dark.border,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  contactDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  contactButton: {
    borderWidth: 2,
    borderColor: Colors.primary[500],
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: Colors.primary[500],
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  goalsSection: {
    backgroundColor: Colors.dark.bgElevated,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  ministriesSection: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalCard: {
    marginBottom: 20,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginLeft: 8,
  },
  goalDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginLeft: 32,
  },
  cdcSection: {
    backgroundColor: Colors.dark.bgCard,
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 12,
  },
  cdcTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 2,
  },
  cdcSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4A574',
    marginBottom: 8,
    textAlign: 'center',
  },
  cdcDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  cdcPhilosophy: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  cdcCommitmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4A574',
    marginBottom: 12,
  },
  cdcList: {
    gap: 8,
    marginBottom: 20,
  },
  cdcListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cdcBullet: {
    fontSize: 14,
    color: Colors.primary[500],
    marginRight: 8,
    fontWeight: 'bold',
  },
  cdcListText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    flex: 1,
  },
  cdcButton: {
    backgroundColor: Colors.primary[500],
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  cdcButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  cdcContactText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 12,
  },
  introSection: {
    backgroundColor: Colors.dark.bgElevated,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginBottom: 12,
    textAlign: 'center',
  },
  introText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  divider: {
    height: 2,
    backgroundColor: Colors.dark.border,
    marginVertical: 20,
    marginHorizontal: 40,
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
    height: 180,
  },
  ministryImage: {
    width: '100%',
    height: '100%',
  },
  ministryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  ministryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  ministryDescription: {
    fontSize: 14,
    color: Colors.dark.border,
  },
});

export default function KidsScreen() {
  const goals = [
    {
      icon: Shield,
      title: 'Environment',
      description: 'To provide a safe, secure and loving environment where parents feel comfortable leaving their child.'
    },
    {
      icon: BookOpen,
      title: 'Learning',
      description: 'To help each child understand the reality of Jesus, God and the Holy Spirit by bringing the stories of the Bible to life.'
    },
    {
      icon: Users,
      title: 'Relationship & Community',
      description: 'To aid each child in accepting Jesus Christ and developing a dynamic relationship with Him, and with each other.'
    },
    {
      icon: Heart,
      title: 'Worship',
      description: 'To provide children the opportunity to participate in worship and ministry at a level fitting their age and stage of development.'
    }
  ];

  const youthPrograms = [
    {
      id: 1,
      title: 'Youth',
      description: 'Keep up-to-date with future events and activities for our Youth.',
      thumbnail: require('@/assets/images/Screen Shot 2025-10-07 at 1.05.31 PM.png')
    },
    {
      id: 2,
      title: 'Family Ministry',
      description: 'Keep close ties with our Family ministry through our events and activities.',
      thumbnail: require('@/assets/images/Screen Shot 2025-10-07 at 1.05.40 PM.png')
    },
    {
      id: 3,
      title: 'Child Development Center',
      description: 'Nurturing growth and learning in a caring environment',
      thumbnail: { uri: 'https://images.pexels.com/photos/8422149/pexels-photo-8422149.jpeg' }
    },
  ];

  const cdcCommitments = [
    "Children's creativity and curiosity is encouraged through a multitude of sensory experiences in a safe, supervised environment.",
    "Pre-Academic curriculum is center-based for children to freely explore their play environment through thematic subjects that spark creativity and individualization.",
    "Each child achieves individual success at his own rate of readiness.",
    "Planned activities provide opportunities for growth in areas of emotional, social, cognitive, language, and physical development.",
    "Self-esteem is bolstered through age-appropriate independence.",
    "Children are encouraged to perform custodial activities to the best of their ability including: dressing, eating, toileting, and social etiquette."
  ];

  const handleCallChurch = () => {
    Linking.openURL('tel:2143634393');
  };

  const handleCallCDC = () => {
    Linking.openURL('tel:2143694630');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kidzone</Text>
        <Text style={styles.headerSubtitle}>Kids are our Future</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/8613059/pexels-photo-8613059.jpeg' }}
            style={styles.welcomeImage}
            resizeMode="cover"
          />
          <View style={styles.welcomeOverlay}>
            <Text style={styles.welcomeTitle}>Welcome to Preston Hollow Kidzone!</Text>
            <Text style={styles.welcomeSubtitle}>Learning, Growing, and Having FUN with Jesus</Text>
          </View>
        </View>

        {/* Introduction Section */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Kids are our Future</Text>
          <Text style={styles.introText}>
            At Preston Hollow, we are excited about your kiddos. We take the precious time we have with them on Sunday Mornings very seriously and relish the opportunity to share the love of Jesus Christ with them as they learn and grow.
          </Text>
          <Text style={styles.introText}>
            Oh, and did we mention ... we want to have FUN!!! On any given Sunday you will find the Preston Hollow Kids making crafts, playing games, learning about God and HAVING FUN!
          </Text>
          <Text style={styles.introText}>
            For more information about the different programs we offer through our Children's Ministry, contact the church office today at (214) 363-4393.
          </Text>
        </View>

        {/* Our Goals Section */}
        <View style={styles.goalsSection}>
          <Text style={styles.sectionTitle}>Our Goals</Text>
          {goals.map((goal, index) => {
            const IconComponent = goal.icon;
            return (
              <View key={index} style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <IconComponent size={24} color={Colors.primary[500]} />
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                </View>
                <Text style={styles.goalDescription}>{goal.description}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.divider} />

        {/* Child Development Center Section */}
        <View style={styles.cdcSection}>
          <Text style={styles.cdcTitle}>Child Development Center</Text>
          <Text style={styles.cdcSubtitle}>Unleash Your Child's Imagination</Text>
          <Text style={styles.cdcDescription}>
            To find out about Preston Hollow Child Development Center please visit our website or call us at 214-369-4630.
          </Text>

          <Text style={styles.cdcPhilosophy}>
            The philosophy of Preston Hollow Child Development Center is founded upon the principle that God has created each individual and that each child is a unique, precious child of God.
          </Text>

          <Text style={styles.cdcCommitmentTitle}>
            The Child Development Center is committed to providing an enriched environment in which:
          </Text>

          <View style={styles.cdcList}>
            {cdcCommitments.map((commitment, index) => (
              <View key={index} style={styles.cdcListItem}>
                <Text style={styles.cdcBullet}>•</Text>
                <Text style={styles.cdcListText}>{commitment}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.cdcButton} onPress={handleCallCDC}>
            <Text style={styles.cdcButtonText}>Call CDC: (214) 369-4630</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Kids Ministry */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Questions About Kidzone?</Text>
          <Text style={styles.contactDescription}>
            Our children's ministry team is here to help answer any questions about our programs.
          </Text>
          <TouchableOpacity style={styles.contactButton} onPress={handleCallChurch}>
            <Text style={styles.contactButtonText}>Call Church Office: (214) 363-4393</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}