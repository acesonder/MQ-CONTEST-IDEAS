import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import ErrorLogger from './components/ErrorLogger';
import LoadingScreen from './components/LoadingScreen';
import MainMenu from './components/MainMenu';
import GameContainer from './components/GameContainer';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentGame, setCurrentGame] = useState(null);
  const [showErrorLog, setShowErrorLog] = useState(false);

  useEffect(() => {
    // Initialize error logger
    ErrorLogger.init();
    ErrorLogger.log('INFO', 'App initialized');

    // Simulate loading time (matches animation duration)
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      ErrorLogger.log('INFO', 'Loading complete');
    }, 7000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleGameSelect = (gameId) => {
    ErrorLogger.log('INFO', `Game selected: ${gameId}`);
    setCurrentGame(gameId);
  };

  const handleBackToMenu = () => {
    ErrorLogger.log('INFO', 'Returning to main menu');
    setCurrentGame(null);
  };

  const toggleErrorLog = () => {
    setShowErrorLog(!showErrorLog);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      
      {isLoading ? (
        <LoadingScreen />
      ) : currentGame ? (
        <GameContainer 
          gameId={currentGame} 
          onBack={handleBackToMenu}
        />
      ) : (
        <MainMenu onGameSelect={handleGameSelect} />
      )}

      {/* Error Log Toggle Button */}
      <TouchableOpacity 
        style={styles.errorToggle}
        onPress={toggleErrorLog}
      >
        <Text style={styles.errorToggleText}>🐛</Text>
      </TouchableOpacity>

      {/* Error Log Display */}
      {showErrorLog && (
        <View style={styles.errorLogContainer}>
          <ScrollView style={styles.errorLog}>
            <Text style={styles.errorLogTitle}>Error Log</Text>
            {ErrorLogger.getLogs().slice(-10).reverse().map((log, index) => (
              <View key={index} style={styles.logEntry}>
                <Text style={[styles.logType, { color: log.color }]}>
                  [{log.type}]
                </Text>
                <Text style={styles.logTime}>{log.timestamp}</Text>
                <Text style={styles.logMessage}>{log.message}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity 
            style={styles.closeErrorLog}
            onPress={toggleErrorLog}
          >
            <Text style={styles.closeErrorLogText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3c72',
  },
  errorToggle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  errorToggleText: {
    fontSize: 24,
  },
  errorLogContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 350,
    maxHeight: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 10,
    padding: 10,
    zIndex: 1001,
  },
  errorLog: {
    flex: 1,
  },
  errorLogTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logEntry: {
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#ff6b6b',
    paddingLeft: 8,
  },
  logType: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  logTime: {
    color: '#888',
    fontSize: 10,
  },
  logMessage: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 2,
  },
  closeErrorLog: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff6b6b',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeErrorLogText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
