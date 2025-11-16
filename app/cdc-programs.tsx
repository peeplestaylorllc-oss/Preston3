import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Baby, Users } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CDCPrograms() {
  const programs = [
    {
      id: 1,
      title: 'Infant Classroom',
      ageRange: '3-18 months',
      description: 'A nurturing environment for our youngest learners with individualized care and developmental activities.',
      features: [
        'Age-appropriate sensory activities',
        'Individualized feeding and nap schedules',
        'Daily communication with parents',
        'Safe and stimulating environment'
      ]
    },
    {
      id: 2,
      title: 'Toddler Classroom',
      ageRange: '18-24 months',
      description: 'Encouraging independence and exploration in a safe, structured setting.',
      features: [
        'Language development activities',
        'Motor skill development',
        'Social interaction opportunities',
        'Introduction to routines'
      ]
    },
    {
      id: 3,
      title: 'Two-Year-Old Classroom',
      ageRange: '2 years old',
      description: 'Building confidence and learning through play-based curriculum.',
      features: [
        'Potty training support',
        'Early literacy activities',
        'Creative arts and crafts',
        'Music and movement'
      ]
    },
    {
      id: 4,
      title: 'Three-Year-Old Classroom',
      ageRange: 'Must be 3 by September 15',
      description: 'Preparing for Pre-K with structured learning and social development.',
      features: [
        'Pre-literacy skills',
        'Number and shape recognition',
        'STEM room activities',
        'Chapel and Bible lessons'
      ]
    },
    {
      id: 5,
      title: 'Pre-K Classroom',
      ageRange: '4-5 years old',
      description: 'Kindergarten readiness program with comprehensive curriculum.',
      features: [
        'Reading and writing preparation',
        'Math concepts and problem solving',
        'Science exploration in STEM room',
        'Social and emotional development',
        'Library visits'
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CDC Programs</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Age-Based Programs</Text>
        <Text style={styles.subtitle}>
          We offer developmentally appropriate programs for children from infancy through Pre-K
        </Text>

        {programs.map((program) => (
          <View key={program.id} style={styles.programCard}>
            <View style={styles.programHeader}>
              <Users size={24} color="#8B5CF6" />
              <View style={styles.programTitleContainer}>
                <Text style={styles.programTitle}>{program.title}</Text>
                <Text style={styles.ageRange}>{program.ageRange}</Text>
              </View>
            </View>

            <Text style={styles.programDescription}>{program.description}</Text>

            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Key Features:</Text>
              {program.features.map((feature, index) => (
                <Text key={index} style={styles.feature}>• {feature}</Text>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.additionalInfo}>
          <Text style={styles.infoTitle}>Special Enrichment Programs</Text>
          <Text style={styles.infoText}>
            All classrooms participate in our special programs including Music, Chapel, Bible Lessons,
            and access to our STEM Room and Library facilities.
          </Text>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  programCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  programTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  programTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  ageRange: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
    marginTop: 2,
  },
  programDescription: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
    lineHeight: 24,
  },
  featuresContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  feature: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 6,
    lineHeight: 22,
  },
  additionalInfo: {
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
});
