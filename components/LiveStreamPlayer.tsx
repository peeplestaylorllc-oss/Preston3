import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Play, Pause, Volume2, Maximize, Wifi } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface LiveStreamPlayerProps {
  isLive?: boolean;
  title?: string;
  viewers?: number;
}

export default function LiveStreamPlayer({ 
  isLive = false, 
  title = "Sunday Service",
  viewers = 0 
}: LiveStreamPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        {/* Live Indicator */}
        {isLive && (
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        )}

        {/* Viewer Count */}
        {isLive && viewers > 0 && (
          <View style={styles.viewerCount}>
            <Wifi size={14} color="#FFFFFF" />
            <Text style={styles.viewerText}>{viewers} watching</Text>
          </View>
        )}

        {/* Player Content */}
        <View style={styles.playerContent}>
          {!isPlaying ? (
            <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
              <Play size={48} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <View style={styles.playingOverlay}>
              <Text style={styles.playingTitle}>{title}</Text>
            </View>
          )}
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={handlePlayPause}>
            {isPlaying ? (
              <Pause size={24} color="#FFFFFF" />
            ) : (
              <Play size={24} color="#FFFFFF" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={handleMute}>
            <Volume2 size={24} color={isMuted ? "#9CA3AF" : "#FFFFFF"} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <Maximize size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stream Info */}
      <View style={styles.streamInfo}>
        <Text style={styles.streamTitle}>{title}</Text>
        <Text style={styles.streamStatus}>
          {isLive ? 'Live now' : 'Stream will begin at service time'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  player: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    aspectRatio: 16/9,
    overflow: 'hidden',
    position: 'relative',
  },
  liveIndicator: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 2,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewerCount: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 2,
  },
  viewerText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
  },
  playerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(245, 158, 11, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playingOverlay: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    right: 16,
  },
  playingTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streamInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  streamTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  streamStatus: {
    fontSize: 14,
    color: '#6B7280',
  },
});