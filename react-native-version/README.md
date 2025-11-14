# OUTSINC VR - React Native/Expo for Meta Horizon OS

A comprehensive VR social experiences platform built with React Native and Expo, optimized for Meta Quest and Horizon OS.

## 🎮 Features

- **PIXAR-style Loading Screen**: Animated "OUTSINC" logo with bouncing dot physics
- **15 Complete VR Social Games**:
  1. Comfort Bubble Dates
  2. Third-Place Café
  3. Micro-Date Quests
  4. Pass-Through Home Hangouts
  5. Blind Vibe Rooms
  6. Story-Build Date
  7. Compatibility Mini-Games Arcade
  8. Safe Space Moderator
  9. CityWalk VR Dates
  10. Interest-Cluster Hangouts
  11. Mood-Matching Lounge
  12. Silent Sync Sessions
  13. Speed Vibes Carousel
  14. Values-Based Date Builder
  15. Group Movie + Debrief

- **Advanced Error Logging**: Tap bug icon (🐛) to view error console
- **Native Performance**: Built with React Native for smooth 2D panel-style apps
- **Expo Workflow**: Easy development and deployment
- **Future 3D Support**: Ready for expo-gl and Three.js integration

## 📋 Requirements

- Node.js 18+ (LTS recommended)
- Expo CLI
- Android Studio (for Android emulator)
- Meta Quest 2/3/Pro (for device testing)
- ADB (Android Debug Bridge) for Quest deployment

## 🚀 Installation Instructions

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/acesonder/MQ-CONTEST-IDEAS.git
   cd MQ-CONTEST-IDEAS/react-native-version
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Expo CLI** (if not already installed):
   ```bash
   npm install -g expo-cli
   ```

4. **Start the development server**:
   ```bash
   npm start
   # or
   expo start
   ```

### Running on Meta Quest

#### Method 1: Expo Go (Development)

1. **Enable Developer Mode on Quest**:
   - Open Meta Quest mobile app
   - Go to Settings > Developer Mode
   - Enable Developer Mode

2. **Connect Quest to same WiFi**:
   - Ensure your Quest and development computer are on the same network

3. **Open in Quest Browser**:
   - Start the Expo dev server: `expo start`
   - Note the URL shown (e.g., `exp://192.168.1.100:19000`)
   - Open Quest browser and navigate to that URL
   - The app will load in the browser

#### Method 2: Build APK (Production)

1. **Build Android APK**:
   ```bash
   # For development build
   expo build:android -t apk
   
   # Or using EAS Build (recommended)
   npm install -g eas-cli
   eas build --platform android
   ```

2. **Install on Quest**:
   ```bash
   # Connect Quest via USB
   # Enable USB debugging in Quest developer settings
   adb devices  # Verify Quest is connected
   adb install path/to/your-app.apk
   ```

3. **Launch app**:
   - Find "OUTSINC VR" in your Quest app library under "Unknown Sources"
   - Launch and enjoy!

### Running on Android Emulator

1. **Start Android emulator** (from Android Studio)

2. **Run app**:
   ```bash
   npm run android
   # or
   expo start --android
   ```

### Running on Web (for testing)

```bash
npm run web
# or
expo start --web
```

## 🎯 Usage

### Navigation

- **Main Menu**: Tap any game card to launch
- **In Game**: Scroll to read about features
- **Back**: Tap "← Back to Menu" button
- **Error Log**: Tap 🐛 icon (bottom right) to view logs

### Controls

- **Touch**: Tap buttons and cards
- **Scroll**: Swipe to scroll through content
- **Back**: Use back button in games or Android back gesture

## 🐛 Troubleshooting

### Error Logger

Access detailed error logs:
1. Tap the 🐛 icon in the bottom right corner
2. View recent errors with timestamps
3. Tap "Close" to hide the log

### Common Issues

#### 1. "Metro bundler failed to start"

**Solution**:
```bash
# Clear cache and restart
expo start -c
# or
npm start -- --reset-cache
```

#### 2. Can't connect to development server

**Solution**:
- Verify devices on same WiFi network
- Check firewall isn't blocking port 19000
- Try using tunnel mode: `expo start --tunnel`

#### 3. Build fails on Android

**Solution**:
```bash
# Update dependencies
npm install

# Clear build cache
expo build:android --clear-credentials

# Check Java and Android SDK are installed
```

#### 4. App crashes on Quest

**Solution**:
- Check error log (🐛 icon)
- View Android logs: `adb logcat`
- Ensure Quest has latest firmware
- Try reinstalling the app

#### 5. Slow performance

**Solution**:
- Close other apps on Quest
- Reduce animation complexity
- Use production build instead of dev build
- Check WiFi connection quality (for dev mode)

### Debug Commands

```bash
# View connected devices
adb devices

# View Android logs
adb logcat | grep ReactNative

# Clear app data
adb shell pm clear com.outsinc.vr

# Uninstall app
adb uninstall com.outsinc.vr

# Check app is installed
adb shell pm list packages | grep outsinc
```

## 🔧 Development

### Project Structure

```
react-native-version/
├── App.js                      # Main app component
├── app.json                    # Expo configuration
├── package.json               # Dependencies
├── components/
│   ├── ErrorLogger.js         # Error logging system
│   ├── LoadingScreen.js       # PIXAR-style loading animation
│   ├── MainMenu.js            # Game selection menu
│   └── GameContainer.js       # Individual game display
├── assets/                    # Images and icons
└── README.md                  # This file
```

### Adding New Games

1. **Update MainMenu.js**:
   ```javascript
   const GAMES = [
     // ... existing games
     { 
       id: 'new-game', 
       name: '16. Your New Game', 
       desc: 'Brief description' 
     },
   ];
   ```

2. **Add game content in GameContainer.js**:
   ```javascript
   const GAME_CONTENT = {
     // ... existing games
     'new-game': {
       title: 'Your New Game',
       description: 'Full description...',
       features: ['Feature 1', 'Feature 2'],
       instructions: 'How to play...',
     },
   };
   ```

### Customizing Styles

All styles use React Native StyleSheet. Edit component files to customize:

```javascript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e3c72', // Change colors
    // ... other styles
  },
});
```

### Adding 3D Content

To add 3D VR experiences using expo-gl and Three.js:

1. **Install dependencies**:
   ```bash
   npm install expo-gl expo-three three
   ```

2. **Create 3D component**:
   ```javascript
   import { GLView } from 'expo-gl';
   import { Renderer } from 'expo-three';
   import * as THREE from 'three';
   
   // Implement 3D scene
   ```

3. **Integrate into games**:
   Replace 2D content with GLView components

## 🎨 Technologies Used

- **React Native 0.73**: Mobile app framework
- **Expo SDK 50**: Development platform
- **JavaScript**: Programming language
- **expo-gl**: WebGL bindings (ready for 3D)
- **expo-three**: Three.js integration (ready for 3D)

## 🔒 Security & Privacy

- All processing happens on-device
- No analytics or tracking
- No external API calls in base version
- Error logs stored locally only

## 📱 Supported Platforms

✅ **Primary**:
- Meta Quest 2/3/Pro (Android)
- Android devices 8.0+

⚠️ **Limited**:
- Android emulator (for testing)
- Web browser (preview only)

❌ **Not Supported**:
- iOS (Quest is Android-based)

## 🚀 Performance Tips

1. **Use production builds** for best performance
2. **Enable hardware acceleration** on Quest
3. **Close background apps** before launching
4. **Use stable WiFi** for development mode
5. **Update Quest firmware** regularly

## 📄 License

MIT License - feel free to modify and distribute

## 🤝 Contributing

Contributions welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Test on actual Quest device
4. Submit pull request with description

## 📞 Support

For issues:
1. Check error log (🐛 icon in app)
2. Review troubleshooting section
3. Check GitHub issues
4. Include error logs with bug reports

## 🎯 Next Steps

After installation:
1. Test all 15 games
2. Customize for your use case
3. Add 3D content with expo-gl
4. Implement multiplayer features
5. Deploy to production

## 🌟 Roadmap

- [ ] Full 3D implementations with expo-gl
- [ ] Hand tracking integration
- [ ] Multiplayer networking
- [ ] Passthrough AR features
- [ ] Voice chat integration
- [ ] User authentication
- [ ] Cloud save/sync

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Meta Quest Developer Docs](https://developer.oculus.com/)
- [expo-gl Guide](https://docs.expo.dev/versions/latest/sdk/gl-view/)
- [Three.js Docs](https://threejs.org/docs/)

## 🙏 Credits

Built for VR social experiences
Powered by React Native and Expo
Designed for Meta Quest ecosystem
