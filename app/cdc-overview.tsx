import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Mail, Clock, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CDCOverview() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Child Development Center</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Welcome to Preston Hollow CDC</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.text}>
            Preston Hollow Child Development Center is dedicated to providing early childhood care
            and education in a Christian environment. We focus on developing the whole child.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Philosophy</Text>
          <Text style={styles.text}>
            We believe every child is created with unique potential and purpose. Our program nurtures
            spiritual, emotional, physical, cognitive, and social growth in each child.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operating Hours</Text>
          <View style={styles.infoRow}>
            <Clock size={20} color="#8B5CF6" />
            <Text style={styles.infoText}>Monday - Friday: 7:30 AM - 5:30 PM</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Programs</Text>
          <View style={styles.programsList}>
            <Text style={styles.bulletPoint}>• Music Program</Text>
            <Text style={styles.bulletPoint}>• Chapel Services</Text>
            <Text style={styles.bulletPoint}>• Bible Lessons</Text>
            <Text style={styles.bulletPoint}>• STEM Room (for 2-4 year olds)</Text>
            <Text style={styles.bulletPoint}>• Library Access</Text>
            <Text style={styles.bulletPoint}>• Parents Night Out (Monthly, 5-8 PM)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Licensing</Text>
          <Text style={styles.text}>
            Licensed by the Texas Health and Human Services Department
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Linking.openURL('tel:214-369-4630')}
          >
            <Phone size={20} color="#8B5CF6" />
            <Text style={styles.contactText}>214-369-4630</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Linking.openURL('mailto:cdc@prestonhollowumc.org')}
          >
            <Mail size={20} color="#8B5CF6" />
            <Text style={styles.contactText}>cdc@prestonhollowumc.org</Text>
          </TouchableOpacity>

          <View style={styles.infoRow}>
            <Clock size={20} color="#8B5CF6" />
            <Text style={styles.infoText}>Office Hours: Mon-Fri, 8:30 AM - 2:30 PM</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Director</Text>
          <Text style={styles.text}>Semien Negash</Text>
        </View>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#4B5563',
    marginLeft: 12,
    flex: 1,
  },
  programsList: {
    marginTop: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
    lineHeight: 24,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
    fontWeight: '500',
  },
});
