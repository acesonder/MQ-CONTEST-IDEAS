import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen() {
  const dotPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const dotScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // PIXAR-style bouncing dot animation
    const sequence = Animated.sequence([
      // Bounce around crazy for 7 seconds
      Animated.parallel([
        Animated.timing(dotPosition, {
          toValue: { x: width * 0.8, y: -height * 0.3 },
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 1.5,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(dotPosition, {
          toValue: { x: -width * 0.4, y: height * 0.4 },
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 0.8,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(dotPosition, {
          toValue: { x: width * 0.6, y: height * 0.1 },
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 1.2,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(dotPosition, {
          toValue: { x: -width * 0.3, y: -height * 0.2 },
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 0.9,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(dotPosition, {
          toValue: { x: width * 0.5, y: height * 0.3 },
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 1.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(dotPosition, {
          toValue: { x: -width * 0.6, y: height * 0.05 },
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 0.85,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(dotPosition, {
          toValue: { x: width * 0.3, y: -height * 0.25 },
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 1.15,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(dotPosition, {
          toValue: { x: -width * 0.35, y: height * 0.2 },
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 0.95,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(dotPosition, {
          toValue: { x: width * 0.7, y: -height * 0.15 },
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 1.25,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      // Finally settle into position
      Animated.parallel([
        Animated.spring(dotPosition, {
          toValue: { x: 0, y: 0 },
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(dotScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]);

    sequence.start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>OUTS</Text>
        <View style={styles.dotContainer}>
          <Animated.View
            style={[
              styles.dot,
              {
                transform: [
                  { translateX: dotPosition.x },
                  { translateY: dotPosition.y },
                  { scale: dotScale },
                ],
              },
            ]}
          />
        </View>
        <Text style={styles.text}>NC</Text>
      </View>
      <Text style={styles.subtitle}>Loading VR Experience...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3c72',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 72,
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 8,
  },
  dotContainer: {
    width: 30,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff6b6b',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  subtitle: {
    marginTop: 30,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
