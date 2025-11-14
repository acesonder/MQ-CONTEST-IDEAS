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

const GAME_CONTENT = {
  'comfort-bubble': {
    title: 'Comfort Bubble Dates',
    description: 'Meet as glowing orbs in a cozy MR/VR "comfort bubble." Voices are slightly anonymized at first; as trust goes up, more details fade in.',
    features: [
      '🎭 Anonymous orb avatars initially',
      '👍 Hand-gestured "comfort meter"',
      '🎨 Shared mini-activities: doodle together',
      '🎵 Pick music together',
      '❓ Answer silly icebreakers',
      '🔒 Safe, low-anxiety environment',
    ],
    instructions: 'Use hand gestures: 👍 = "I\'m comfy" • 👉 = "slow down"',
  },
  'third-place': {
    title: 'Third-Place Café',
    description: 'A persistent virtual "third place" – like a never-closing café/park – where people drop in for chill hangouts.',
    features: [
      '☕ Virtual café environment',
      '🏷️ Vibe tags: Deep Talk, Memes, Music Sharing',
      '🎯 Auto-match to small tables',
      '🔊 Spatial audio for realistic conversations',
      '🚶 Table-hopping via simple teleport',
      '🛡️ "Lower social load" mode',
    ],
    instructions: 'Choose your vibe tag and join a table. Teleport to hop between conversations.',
  },
  'micro-date': {
    title: 'Micro-Date Quests',
    description: '10–15 minute "micro quests" you do with a match: build a tiny city, solve a puzzle, co-draw a creature, etc.',
    features: [
      '🏙️ Build a tiny city together',
      '🧩 Solve collaborative puzzles',
      '🎨 Co-draw creatures',
      '⏱️ 10-15 minute activities',
      '⭐ Rate the experience after',
      '🎯 App suggests next quest',
    ],
    instructions: 'Select an activity and work together. Chemistry through doing, not just talking!',
  },
  'passthrough': {
    title: 'Pass-Through Home Hangouts',
    description: 'Use passthrough so both people see their own real rooms with a shared virtual layer.',
    features: [
      '🏠 MR passthrough mode',
      '🪟 Shared virtual decorations',
      '🖼️ Same "window to a beach"',
      '🎮 Floating board games',
      '🔒 "Show desk but blur background" privacy',
      '🎨 Joint customization',
    ],
    instructions: 'Enable passthrough and customize your shared virtual space together.',
  },
  'blind-vibe': {
    title: 'Blind Vibe Rooms',
    description: 'Pick a "vibe room" and meet as voice-only or abstract avatars. Unlock identity layers as trust builds.',
    features: [
      '🌧️ Cozy Rainy Night room',
      '🎮 Arcade Chaos room',
      '🔥 Campfire Stories room',
      '🎭 Abstract avatars initially',
      '✨ Room reacts to conversation',
      '🔓 Mutually unlock identity layers',
    ],
    instructions: 'Choose a vibe room. Personality over looks – reveal yourselves gradually.',
  },
  'story-build': {
    title: 'Story-Build Date',
    description: 'Co-create a story in real-time. An AI narrator describes what you say/do while the environment morphs.',
    features: [
      '📖 Collaborative storytelling',
      '🤖 AI narrator',
      '🌍 Environment morphs with narrative',
      '🎭 Choose settings and characters',
      '💡 "Tap-in prompts" when shy',
      '💾 Saved story as replay',
    ],
    instructions: 'Create a story together. The AI narrates and the world changes with your choices.',
  },
  'mini-games': {
    title: 'Compatibility Mini-Games Arcade',
    description: 'Fast mini-games (3–5 minutes each) built around cooperation to discover compatibility.',
    features: [
      '🎈 Keep a balloon aloft',
      '🎵 Sync button presses to music',
      '🧭 Guide each other through maze',
      '📊 Compatibility profile generated',
      '🎯 Leading vs following analysis',
      '⚡ Patient vs fast playstyle',
    ],
    instructions: 'Play cooperative mini-games. Discover your compatibility through play!',
  },
  'safe-space': {
    title: 'Safe Space Moderator',
    description: 'A dating/hangout platform fully centered on consent and safety with visible boundaries.',
    features: [
      '⭕ Visible Boundaries Overlay',
      '🌫️ "Fade the room" if overwhelmed',
      '👻 Guardian mode (friend observes)',
      '🚪 Quick polite exit gestures',
      '📏 Preferred distance indicators',
      '💬 Conversation topics comfort level',
    ],
    instructions: 'Your safety tools are always accessible. Use gestures to set boundaries.',
  },
  'citywalk': {
    title: 'CityWalk VR Dates',
    description: 'Take a low-poly walk through iconic places with your match.',
    features: [
      '🗼 Tokyo alley walks',
      '🗼 Paris riverside strolls',
      '🏖️ Caribbean beach visits',
      '📍 Conversation prompts in environment',
      '✈️ Travel Mode for offline use',
      '🌍 Custom town scans',
    ],
    instructions: 'Choose a destination and take a virtual walk together. Great for long-distance!',
  },
  'interest-cluster': {
    title: 'Interest-Cluster Hangouts',
    description: 'Interest-first hangout: harm reduction, music production, writing, activism, gardening, etc.',
    features: [
      '🎹 Music production spaces',
      '✍️ Writing rooms',
      '✊ Activism clusters',
      '🌱 Gardening communities',
      '📝 Shared documents and whiteboards',
      '❤️ Opt-in "chemistry check"',
    ],
    instructions: 'Join interest groups first. Dating is optional, connection comes from shared passions.',
  },
  'mood-matching': {
    title: 'Mood-Matching Lounge',
    description: 'Match by emotional state. Pick a mood and meet others in similar or complementary states.',
    features: [
      '😔 "Burned out" lounge',
      '😃 "Excited" space',
      '😢 "Lonely, low-energy" room',
      '🤔 "Curious but anxious" area',
      '🌅 Environment tuned to mood',
      '📊 Optional mood history tracking',
    ],
    instructions: 'Select your current mood. Meet others who understand what you\'re feeling.',
  },
  'silent-sync': {
    title: 'Silent Sync Sessions',
    description: 'Companion presence without talking. Share a quiet MR/VR space while reading, drawing, or chilling.',
    features: [
      '📚 Reading spaces',
      '🎨 Drawing areas',
      '☕ Chill zones',
      '⏱️ Shared timers (25 min Pomodoro)',
      '🎵 Ambient sounds',
      '😊 Minimal emoji reactions',
    ],
    instructions: 'Join a quiet session. Just enjoy someone\'s presence without pressure to talk.',
  },
  'speed-vibes': {
    title: 'Speed Vibes Carousel',
    description: 'VR speed-meeting with different micro-activities in each round.',
    features: [
      '🎨 Drawing round',
      '🎵 Music guessing',
      '🤔 Rapid "this or that"',
      '❓ Guided questions',
      '🎠 Carousel-style rotation',
      '📝 Mutual bookmark system',
    ],
    instructions: 'Stay in one spot as rooms rotate. Less navigation, more connections!',
  },
  'values-based': {
    title: 'Values-Based Date Builder',
    description: 'Pick 3–5 values and the environment builds itself around those themes.',
    features: [
      '🤝 Mutual aid theme',
      '🎨 Art environment',
      '🌿 Nature setting',
      '💚 Mental health space',
      '🧘 Sobriety/harm reduction',
      '💬 Floating conversation cards',
    ],
    instructions: 'Choose your core values. The world reflects what matters to you both.',
  },
  'movie-debrief': {
    title: 'Group Movie + Debrief',
    description: 'MR/VR co-watching with structured breaks for small-group discussion.',
    features: [
      '🎬 Watch together',
      '🛋️ Breakout sofas',
      '✋ Hand-raise to talk',
      '🤖 AI summarizer',
      '☁️ "Group thoughts" cloud',
      '🎭 Short films/episodes',
    ],
    instructions: 'Watch content together, then discuss in breakout groups. AI captures key insights.',
  },
};

export default function GameContainer({ gameId, onBack }) {
  const game = GAME_CONTENT[gameId];

  if (!game) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Game not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{game.title}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{game.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {game.features.map((feature, index) => (
            <Text key={index} style={styles.feature}>
              {feature}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Play</Text>
          <Text style={styles.instructions}>{game.instructions}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.comingSoon}>
            🚧 Full 3D implementation coming soon! 🚧
          </Text>
          <Text style={styles.comingSoonDesc}>
            This preview shows the game concept. The full VR experience with
            3D environments, interactions, and multiplayer will be available
            in the next update.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back to Menu</Text>
      </TouchableOpacity>
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
    borderBottomWidth: 2,
    borderBottomColor: '#2a5298',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#ffd93d',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
  },
  feature: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    paddingLeft: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  comingSoon: {
    fontSize: 18,
    color: '#ff6b6b',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  comingSoonDesc: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#ff6b6b',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 50,
  },
});
