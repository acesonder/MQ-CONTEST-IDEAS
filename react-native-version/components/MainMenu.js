import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const GAMES = [
  { id: 'comfort-bubble', name: '1. Comfort Bubble Dates', desc: 'Blind / low-anxiety first meetings' },
  { id: 'third-place', name: '2. Third-Place Café', desc: 'Social hangout / meet-people space' },
  { id: 'micro-date', name: '3. Micro-Date Quests', desc: 'Structured, low-time-commitment dates' },
  { id: 'passthrough', name: '4. Pass-Through Home Hangouts', desc: 'MR shared "your real space" vibes' },
  { id: 'blind-vibe', name: '5. Blind Vibe Rooms', desc: 'Personality > looks' },
  { id: 'story-build', name: '6. Story-Build Date', desc: 'Collaborative narrative as social lubricant' },
  { id: 'mini-games', name: '7. Compatibility Mini-Games Arcade', desc: 'Soft-matching through play style' },
  { id: 'safe-space', name: '8. Safe Space Moderator', desc: 'Dates with built-in safety tools' },
  { id: 'citywalk', name: '9. CityWalk VR Dates', desc: 'Travel + social + dating' },
  { id: 'interest-cluster', name: '10. Interest-Cluster Hangouts', desc: 'Shared cause / shared hobby first' },
  { id: 'mood-matching', name: '11. Mood-Matching Lounge', desc: 'Match by emotional state, not profile' },
  { id: 'silent-sync', name: '12. Silent Sync Sessions', desc: 'Companion presence without talking' },
  { id: 'speed-vibes', name: '13. Speed Vibes Carousel', desc: 'Structured speed-meet format' },
  { id: 'values-based', name: '14. Values-Based Date Builder', desc: 'Serious connections / deeper talks' },
  { id: 'movie-debrief', name: '15. Group Movie + Debrief', desc: 'Social watch parties done properly' },
];

export default function MainMenu({ onGameSelect }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>OUTSINC VR EXPERIENCES</Text>
        <Text style={styles.subtitle}>Select a social experience to begin</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.gameGrid}
      >
        {GAMES.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={styles.gameButton}
            onPress={() => onGameSelect(game.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.gameName}>{game.name}</Text>
            <Text style={styles.gameDesc}>{game.desc}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🎮 Tap any experience to start • 🐛 Tap bug icon for error log
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3c72',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2a5298',
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  gameGrid: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameButton: {
    width: width * 0.45,
    backgroundColor: '#0f3460',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    minHeight: 100,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#16213e',
  },
  gameName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gameDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    lineHeight: 16,
  },
  footer: {
    padding: 15,
    borderTopWidth: 2,
    borderTopColor: '#2a5298',
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
  },
});
