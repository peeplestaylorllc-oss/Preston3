import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Mail, MapPin, Heart, Download, Calendar, Church } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Weddings() {
  const weddingPhotos = [
    { uri: 'https://images.pexels.com/photos/265705/pexels-photo-265705.jpeg' },
    { uri: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg' },
    { uri: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg' },
    { uri: 'https://images.pexels.com/photos/6533831/pexels-photo-6533831.jpeg' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weddings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/265705/pexels-photo-265705.jpeg' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Heart size={40} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.heroTitle}>Celebrate Your Love</Text>
            <Text style={styles.heroSubtitle}>at Preston Hollow Church</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.philosophyCard}>
            <Church size={32} color="#8B5CF6" />
            <Text style={styles.philosophyText}>
              "The wedding ceremony is one of the most sacred of all the rituals of the church...
              a sacred rite into which two persons pledge themselves to each other with the blessings of God."
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Wedding Philosophy</Text>
          <Text style={styles.text}>
            At Preston Hollow Church, we view weddings as worship experiences, not just social events.
            We are honored to serve both church members and community members, creating a joyous and
            safe occasion for your special day.
          </Text>
        </View>

        <View style={styles.photoGallerySection}>
          <Text style={styles.sectionTitle}>Beautiful Ceremony Spaces</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
            {weddingPhotos.map((photo, index) => (
              <Image
                key={index}
                source={photo}
                style={styles.galleryImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Facilities</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Beautiful Sanctuary</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Elegant Bridal Rooms</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Professional Sound & Lighting</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Ample Parking</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Handicap Accessible</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity
            style={styles.locationCard}
            onPress={() => Linking.openURL('https://maps.google.com/?q=6315+Walnut+Hill+Lane,+Dallas,+TX+75230')}
          >
            <MapPin size={24} color="#8B5CF6" />
            <View style={styles.locationInfo}>
              <Text style={styles.locationText}>6315 Walnut Hill Lane</Text>
              <Text style={styles.locationText}>Dallas, TX 75230</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planning Your Wedding</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Download Wedding Policies</Text>
                <Text style={styles.stepDescription}>Review our comprehensive wedding policies and guidelines</Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Contact Cody McAdoo</Text>
                <Text style={styles.stepDescription}>Reach out to discuss your wedding plans and requirements</Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Schedule a Tour</Text>
                <Text style={styles.stepDescription}>Visit our facilities and envision your special day</Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Book Your Date</Text>
                <Text style={styles.stepDescription}>Finalize details and secure your wedding date</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wedding Coordinator</Text>
          <View style={styles.coordinatorCard}>
            <View style={styles.coordinatorHeader}>
              <View style={styles.coordinatorAvatar}>
                <Text style={styles.coordinatorInitials}>CM</Text>
              </View>
              <View style={styles.coordinatorInfo}>
                <Text style={styles.coordinatorName}>Cody McAdoo</Text>
                <Text style={styles.coordinatorTitle}>Wedding Coordinator</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => Linking.openURL('tel:214-363-4393')}
            >
              <Phone size={20} color="#FFFFFF" />
              <Text style={styles.contactButtonText}>214-363-4393</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactButtonSecondary}
              onPress={() => Linking.openURL('mailto:Cody.mcadoo@umcprestonhollow.com')}
            >
              <Mail size={20} color="#8B5CF6" />
              <Text style={styles.contactButtonSecondaryText}>Email Cody</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => Linking.openURL('https://prestonhollowchurch.com/weddings/')}
          >
            <Download size={20} color="#FFFFFF" />
            <Text style={styles.downloadButtonText}>Download Wedding Policies</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tourButton}
            onPress={() => Linking.openURL('tel:214-363-4393')}
          >
            <Calendar size={20} color="#8B5CF6" />
            <Text style={styles.tourButtonText}>Schedule a Tour</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quoteSection}>
          <Text style={styles.quoteText}>
            "We are committed to making your wedding a joyous and safe occasion,
            filled with the blessings of God and surrounded by love."
          </Text>
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
    height: 280,
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
    backgroundColor: 'rgba(139, 92, 246, 0.7)',
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
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  philosophyCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  philosophyText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#4B5563',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: '#4B5563',
  },
  photoGallerySection: {
    paddingVertical: 20,
  },
  photoScroll: {
    paddingLeft: 20,
  },
  galleryImage: {
    width: 280,
    height: 200,
    borderRadius: 16,
    marginRight: 16,
  },
  featuresList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#4B5563',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationInfo: {
    marginLeft: 16,
  },
  locationText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    marginBottom: 4,
  },
  stepsContainer: {
    marginTop: 8,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  coordinatorCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  coordinatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  coordinatorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  coordinatorInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  coordinatorInfo: {
    flex: 1,
  },
  coordinatorName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  coordinatorTitle: {
    fontSize: 15,
    color: '#6B7280',
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
  },
  contactButtonSecondaryText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  tourButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 18,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  tourButtonText: {
    color: '#8B5CF6',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  quoteSection: {
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 12,
  },
  quoteText: {
    fontSize: 17,
    lineHeight: 28,
    color: '#4B5563',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomSpacing: {
    height: 32,
  },
});
