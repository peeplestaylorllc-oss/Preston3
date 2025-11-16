import React from 'react';
import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import {
  MessageCircle,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Heart,
  Users,
  Music,
  Star,
  Settings,
  ChevronRight
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function MoreScreen() {
  const menuItems = [
    {
      section: 'About',
      items: [
        { icon: Users, label: 'Meet Our Team', description: 'Pastors and staff', action: 'https://prestonhollowchurch.com/meet-the-team/' },
        { icon: Heart, label: 'Wedding Information', description: 'Policies and procedures', action: 'https://prestonhollowchurch.com/weddings/' },
        { icon: MapPin, label: 'Visit Us', description: 'Location and directions', action: 'https://prestonhollowchurch.com/times-location/' },
        { icon: Star, label: 'Our Story', description: 'Church history and mission', action: 'https://prestonhollowchurch.com/meet-the-pastor/' },
      ]
    },
    {
      section: 'Contact',
      items: [
        { icon: Phone, label: 'Call Us', description: '(214) 363-4393', action: 'tel:2143634393' },
        { icon: Mail, label: 'Email Us', description: 'Contact the church', action: 'https://prestonhollowchurch.com/contact/' },
        { icon: ExternalLink, label: 'Website', description: 'prestonhollowchurch.com', action: 'https://prestonhollowchurch.com' },
        { icon: Settings, label: 'App Settings', description: 'Notifications and preferences', route: 'settings' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'YouTube', color: '#FF0000', url: 'https://www.youtube.com/@prestonhollowumc' },
    { name: 'Facebook', color: '#1877F2', url: 'https://www.facebook.com/prestonhollowumc' },
    { name: 'Instagram', color: '#E4405F', url: 'https://www.instagram.com/prestonhollowumc' },
  ];

  const staffMembers = [
    {
      name: 'Jim Gray',
      role: 'Associate Director',
      image: { uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' },
      bio: 'Jim Gray was called to ministry at a young age. While in his junior year pursuing a bachelor\'s degree in Music Education, he stepped into his first ministry role as Worship Pastor at a small church in Colorado — a congregation of just 19 people. With a servant\'s heart and deep love for the Church, Jim volunteered his time, pouring into the people and the mission. Over the next ten years, that little church grew to more than 3,000 in weekly attendance.'
    },
    {
      name: 'Cody McAdoo',
      role: 'Worship Director',
      image: { uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' },
      bio: 'Cody McAdoo is a dedicated individual who graduated from California Baptist University with a profound love for leading worship and a deep connection to the Church. His journey has been centered around creating a meaningful and transformative worship experience for others. With his passion, skill, and unwavering faith, Cody McAdoo continues to dedicate himself to leading worship, contributing to the spiritual growth and vitality of the Church.'
    },
    {
      name: 'Semien Negash',
      role: 'CDC Director',
      image: { uri: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200' },
      bio: 'Originally from Eritrea, Semien is a proud mother of two beautiful children who continue to inspire her love for community and her commitment to nurturing the whole child—mind, body, and spirit. Her professional journey includes serving in family services, mental health advocacy for children, and working with the Boys & Girls Club. Her heart for creating compassionate, inclusive environments shines in all she does.'
    },
    {
      name: 'Courtney Y. Wilson',
      role: 'Choir Director',
      image: { uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' },
      bio: 'Courtney Wilson is in her 8th year of teaching middle school choir in the DFW metroplex! She currently teaches at Hays Muddle School in Prosper ISD. She has previously taught at Faubion Middle School in McKinney ISD, Murphy Middle School in Plano ISD and Brandenburg Middle School in Garland ISD.'
    },
    {
      name: 'Mike Larsen',
      role: 'Director of Finance',
      image: { uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
      bio: 'Contact: business@umcprestonhollow.com'
    },
  ];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
        <Text style={styles.headerSubtitle}>Connect, learn, and grow with us</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Church Info Card */}
        <View style={styles.churchCard}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/208277/pexels-photo-208277.jpeg?auto=compress&cs=tinysrgb&w=1200' }}
            style={styles.churchImage}
            resizeMode="cover"
          />
          <View style={styles.churchInfo}>
            <Text style={styles.churchName}>Preston Hollow Church</Text>
            <Text style={styles.churchMission}>
              Growing in Faith Together
            </Text>
            <View style={styles.churchAddress}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.addressText}>123 Preston Hollow Lane, Dallas, TX 75230</Text>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[styles.menuItem, !item.route && !(item as any).action && styles.menuItemDisabled]}
                onPress={() => {
                  if (item.route) {
                    router.push(`/${item.route}` as any);
                  } else if ((item as any).action) {
                    handleLinkPress((item as any).action);
                  }
                }}
                disabled={!item.route && !(item as any).action}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <item.icon size={20} color="#1E3A8A" />
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                    <Text style={styles.menuItemDescription}>{item.description}</Text>
                  </View>
                </View>
                {item.route ? (
                  <ChevronRight size={16} color="#9CA3AF" />
                ) : (
                  <ExternalLink size={16} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Social Media */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialLinks}>
            {socialLinks.map((social, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.socialButton, { backgroundColor: social.color }]}
                onPress={() => handleLinkPress(social.url)}
              >
                <Text style={styles.socialButtonText}>{social.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Get in Touch</Text>
          <View style={styles.contactInfo}>
            <TouchableOpacity style={styles.contactItem} onPress={() => handleLinkPress('tel:2143634393')}>
              <Phone size={18} color="#1E3A8A" />
              <Text style={styles.contactText}>(214) 363-4393</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem} onPress={() => handleLinkPress('https://prestonhollowchurch.com/contact/')}>
              <Mail size={18} color="#1E3A8A" />
              <Text style={styles.contactText}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem} onPress={() => handleLinkPress('https://prestonhollowchurch.com')}>
              <ExternalLink size={18} color="#1E3A8A" />
              <Text style={styles.contactText}>prestonhollowchurch.com</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.generalInquiryButton} onPress={() => handleLinkPress('https://prestonhollowchurch.com/contact/')}>
            <Text style={styles.generalInquiryText}>Send General Inquiry</Text>
          </TouchableOpacity>
        </View>

        {/* Wedding Information */}
        <View style={styles.weddingSection}>
          <Heart size={24} color="#F59E0B" />
          <Text style={styles.weddingTitle}>Wedding Information</Text>
          <Text style={styles.weddingDescription}>
            We'd be honored to celebrate your special day with you. Learn about our 
            wedding policies and how to schedule your ceremony.
          </Text>
          <TouchableOpacity style={styles.weddingButton} onPress={() => handleLinkPress('https://prestonhollowchurch.com/weddings/')}>
            <Text style={styles.weddingButtonText}>Download Wedding Packet</Text>
          </TouchableOpacity>
        </View>

        {/* App Information */}
        <View style={styles.appInfo}>
          <Text style={styles.appTitle}>Preston Hollow Church App</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            Stay connected with our church family wherever you are. Built with love 
            to help you grow in faith and community.
          </Text>
        </View>
      </ScrollView>
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
  churchCard: {
    backgroundColor: Colors.dark.bgElevated,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  churchImage: {
    width: '100%',
    height: 120,
  },
  churchInfo: {
    padding: 16,
  },
  churchName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'CrimsonText-Bold',
  },
  churchMission: {
    fontSize: 16,
    color: Colors.text.secondary,
    fontStyle: 'italic',
    marginVertical: 4,
  },
  churchAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addressText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 6,
    flex: 1,
  },
  menuSection: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginBottom: 24,
    marginTop: 8,
    fontFamily: 'CrimsonText-Bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.bgElevated,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  menuItemDisabled: {
    opacity: 0.6,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  menuItemDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  staffSection: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    padding: 20,
    marginBottom: 20,
  },
  staffCard: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  staffImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'CrimsonText-Bold',
  },
  staffRole: {
    fontSize: 14,
    color: Colors.primary[500],
    fontWeight: '600',
    marginVertical: 2,
  },
  staffBio: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  socialSection: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    padding: 20,
    marginBottom: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  socialButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contactCard: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    padding: 20,
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginBottom: 16,
    fontFamily: 'CrimsonText-Bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
  contactInfo: {
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 10,
  },
  generalInquiryButton: {
    borderWidth: 2,
    borderColor: Colors.primary[500],
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  generalInquiryText: {
    color: Colors.primary[500],
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  weddingSection: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  weddingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'CrimsonText-Bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
  weddingDescription: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  weddingButton: {
    borderWidth: 2,
    borderColor: Colors.primary[500],
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  weddingButtonText: {
    color: Colors.primary[500],
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  appInfo: {
    backgroundColor: Colors.dark.bgCard,
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});