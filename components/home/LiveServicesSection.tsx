import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { LIVE_SERVICES } from '@/constants/homeData';

type Props = {
  onPressService?: (id: number) => void;
};

/**
 * A reusable horizontal section that renders the Live & Upcoming services.
 * You can drop this into your HomeScreen and wire onPressService to navigate
 * or open a modal.
 */
const LiveServicesSection: React.FC<Props> = ({ onPressService }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Live &amp; Upcoming</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {LIVE_SERVICES.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.card}
            onPress={() => onPressService?.(service.id)}
          >
            <Image source={service.thumbnail} style={styles.thumbnail} />
            <Text style={styles.cardTitle}>{service.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.dark.secondary,
  },
  card: {
    marginRight: 12,
    width: 180,
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 16,
  },
  thumbnail: {
    width: '100%',
    height: 110,
  },
  cardTitle: {
    padding: 10,
    color: Colors.dark.text,
    fontWeight: '600',
  },
});

export default LiveServicesSection;
