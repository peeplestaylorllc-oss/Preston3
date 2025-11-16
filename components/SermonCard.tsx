import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Play, Clock, Calendar, Download } from 'lucide-react-native';

interface SermonCardProps {
  title: string;
  speaker: string;
  date: string;
  duration: string;
  series?: string;
  image?: string;
  onPlay: () => void;
  onDownload?: () => void;
}

export default function SermonCard({
  title,
  speaker,
  date,
  duration,
  series,
  image,
  onPlay,
  onDownload
}: SermonCardProps) {
  return (
    <View style={styles.card}>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {series && (
            <View style={styles.seriesBadge}>
              <Text style={styles.seriesText}>{series}</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.speaker}>{speaker}</Text>
        
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Calendar size={14} color="#6B7280" />
            <Text style={styles.metaText}>{date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.playButton} onPress={onPlay}>
            <Play size={16} color="#FFFFFF" />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
          
          {onDownload && (
            <TouchableOpacity style={styles.downloadButton} onPress={onDownload}>
              <Download size={16} color="#374151" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 14,
  },
  seriesBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  seriesText: {
    fontSize: 9,
    color: '#F59E0B',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Inter-Bold',
  },
  speaker: {
    fontSize: 9,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Inter-SemiBold',
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 8,
    color: '#6B7280',
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Inter-Regular',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playButton: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontFamily: 'Inter-Bold',
  },
  downloadButton: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});