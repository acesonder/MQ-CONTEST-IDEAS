# OUTSINC VR - Complete Installation Guide

This repository contains TWO complete implementations of the OUTSINC VR social experiences platform:

1. **WebXR/Immersive Web Version** - Pure web tech (HTML + JS + A-Frame)
2. **React Native/Expo Version** - Native apps for Meta Quest/Horizon OS

## 🎯 Choose Your Implementation

### WebXR Version (Recommended for Web Developers)

**Best for:**
- Web developers familiar with HTML/JS
- Quick prototyping and testing
- Cross-platform VR (works on any WebXR device)
- Easy deployment (just host static files)

**Pros:**
- No build process needed
- Works in Quest browser immediately
- Easy to modify and test
- No app installation required

**Cons:**
- Slightly lower performance than native
- Limited to browser capabilities
- Requires good WiFi connection

### React Native Version (Recommended for Mobile Developers)

**Best for:**
- React/React Native developers
- Native performance requirements
- 2D panel-style apps
- Offline functionality

**Pros:**
- Native performance
- Better offline support
- Access to native APIs
- Familiar React development

**Cons:**
- Requires build process
- Need to install APK on Quest
- More complex setup

## 🚀 Quick Start

### WebXR Version

```bash
cd webxr-version
npm install
npm start
# Open http://localhost:8080 in Quest browser
```

**Full instructions:** See [webxr-version/README.md](webxr-version/README.md)

### React Native Version

```bash
cd react-native-version
npm install
expo start
# Follow Expo instructions to run on Quest
```

**Full instructions:** See [react-native-version/README.md](react-native-version/README.md)

## 📋 System Requirements

### Both Versions Require:

- Node.js 18+ (LTS recommended)
- Meta Quest 2, 3, or Pro
- Computer for development
- WiFi network

### WebXR Version Additional Requirements:

- Web browser with WebXR support
- http-server (installed via npm)

### React Native Version Additional Requirements:

- Expo CLI
- Android Debug Bridge (ADB)
- Android Studio (optional, for emulator)

## 🎮 15 Included Games

Both implementations include all 15 VR social experiences:

1. **Comfort Bubble Dates** - Blind / low-anxiety first meetings
2. **Third-Place Café** - Social hangout / meet-people space
3. **Micro-Date Quests** - Structured, low-time-commitment dates
4. **Pass-Through Home Hangouts** - MR shared "your real space" vibes
5. **Blind Vibe Rooms** - Personality > looks
6. **Story-Build Date** - Collaborative narrative as social lubricant
7. **Compatibility Mini-Games Arcade** - Soft-matching through play style
8. **Safe Space Moderator** - Dates with built-in safety tools
9. **CityWalk VR Dates** - Travel + social + dating
10. **Interest-Cluster Hangouts** - Shared cause / shared hobby first
11. **Mood-Matching Lounge** - Match by emotional state, not profile
12. **Silent Sync Sessions** - Companion presence without talking
13. **Speed Vibes Carousel** - Structured speed-meet format
14. **Values-Based Date Builder** - Serious connections / deeper talks
15. **Group Movie + Debrief** - Social watch parties done properly

## 🔧 Setup Meta Quest (First Time)

### Enable Developer Mode

1. **Install Meta Quest Mobile App**
   - Download from App Store (iOS) or Google Play (Android)
   - Log in with your Meta/Facebook account

2. **Enable Developer Mode**
   - Open Meta Quest app
   - Go to Menu > Devices > [Your Quest]
   - Tap "Developer Mode"
   - Toggle on "Developer Mode"

3. **Accept Developer Agreement**
   - Follow prompts to accept terms
   - May need to create developer organization (free)

### Enable USB Debugging (For React Native Version)

1. **Put on Quest headset**
2. **Go to Settings** (press Oculus button)
3. **Navigate to:**
   - Settings > System > Developer
   - Enable "USB Debugging"

4. **Connect Quest to Computer**
   - Use USB-C cable
   - Accept debugging prompt in headset

## 📱 Testing on Meta Quest

### WebXR Version Testing

1. **Start development server** on computer:
   ```bash
   cd webxr-version
   npm start
   ```

2. **Find your computer's IP address**:
   - Windows: Open Command Prompt, type `ipconfig`
   - Mac/Linux: Open Terminal, type `ifconfig` or `ip addr`
   - Look for IPv4 address (e.g., 192.168.1.100)

3. **Open Quest Browser**:
   - Put on Quest headset
   - Open Browser app
   - Navigate to: `http://YOUR_IP:8080`
   - Click "Enter VR" button (bottom right)

### React Native Version Testing

1. **Start Expo server**:
   ```bash
   cd react-native-version
   expo start
   ```

2. **Option A: Browser Access**:
   - Open Quest browser
   - Navigate to the URL shown in terminal

3. **Option B: Build and Install APK**:
   ```bash
   # Build APK
   expo build:android
   
   # Install on Quest
   adb install your-app.apk
   ```

## 🐛 Troubleshooting

### Both Versions

**Issue: Quest not connecting to computer**
- Ensure both on same WiFi network
- Check firewall settings
- Restart Quest and router

**Issue: Poor performance**
- Close other Quest apps
- Restart Quest
- Check WiFi signal strength
- Use 5GHz WiFi if available

### WebXR Version Specific

**Issue: "WebXR not supported"**
- Use Quest's built-in browser (not Chrome or Firefox)
- Update Quest firmware
- Try different browser if available

**Issue: Can't enter VR mode**
- Grant permissions when prompted
- Reload page
- Clear browser cache

### React Native Version Specific

**Issue: "Cannot connect to development server"**
```bash
expo start --tunnel  # Use tunnel mode
```

**Issue: ADB not detecting Quest**
```bash
adb kill-server
adb start-server
adb devices  # Should show Quest
```

**Issue: Build fails**
```bash
expo start -c  # Clear cache
rm -rf node_modules
npm install    # Reinstall dependencies
```

## 📊 Feature Comparison

| Feature | WebXR Version | React Native Version |
|---------|--------------|---------------------|
| Loading Screen | ✅ 3D Animated | ✅ Animated |
| 15 Games | ✅ Full 3D | ✅ 2D Panels (3D ready) |
| Error Logging | ✅ Advanced | ✅ Advanced |
| Installation | ✅ No install needed | ❌ APK required |
| Performance | ⚠️ Good | ✅ Excellent |
| Offline Mode | ❌ Needs connection | ✅ Works offline |
| Development Speed | ✅ Very fast | ⚠️ Moderate |
| 3D Graphics | ✅ Full WebGL | ⚠️ Requires expo-gl |
| Hand Tracking | ✅ Ready | ⚠️ Limited |
| Passthrough | ✅ WebXR API | ⚠️ Limited |

## 🎨 Customization

### Changing Colors/Theme

**WebXR:** Edit `webxr-version/index.html` CSS section
**React Native:** Edit StyleSheet in each component file

### Adding Games

**WebXR:** 
1. Add button in `index.html`
2. Add loader in `js/games.js`

**React Native:**
1. Add to GAMES array in `MainMenu.js`
2. Add content in `GameContainer.js`

### Modifying Loading Screen

**WebXR:** Edit `js/loading-screen.js`
**React Native:** Edit `components/LoadingScreen.js`

## 📚 Documentation

- [WebXR Version README](webxr-version/README.md) - Complete WebXR documentation
- [React Native Version README](react-native-version/README.md) - Complete React Native documentation
- [A-Frame Documentation](https://aframe.io/docs/) - WebXR framework
- [Expo Documentation](https://docs.expo.dev/) - React Native platform
- [Meta Quest Developer Docs](https://developer.oculus.com/) - Official Quest docs

## 🔐 Security Notes

- Both versions process everything locally
- No user data sent to external servers
- Error logs contain no personal information
- WebXR requires HTTPS for production (except localhost)

## 🚀 Deployment

### WebXR Version

**GitHub Pages:**
```bash
# Enable GitHub Pages in repository settings
# Point to webxr-version folder
```

**Netlify/Vercel:**
- Drag and drop `webxr-version` folder
- Or connect GitHub repository

### React Native Version

**Google Play Store:**
1. Build signed APK with `expo build:android -t app-bundle`
2. Follow Expo's publishing guide
3. Submit to Meta Quest store or Google Play

**Sideload Quest:**
```bash
adb install your-app.apk
```

## 🤝 Contributing

Both versions welcome contributions:

1. Fork the repository
2. Choose version to work on
3. Create feature branch
4. Test on actual Quest device
5. Submit pull request

## 📞 Getting Help

1. **Check error logs** (press 'E' for WebXR, tap 🐛 for React Native)
2. **Review troubleshooting** sections in respective READMEs
3. **Check console** for detailed errors
4. **Open GitHub issue** with error logs

## 🎯 Next Steps

1. **Choose your version** based on your needs
2. **Follow installation** for that version
3. **Test on Quest** in VR mode
4. **Customize** for your use case
5. **Deploy** to production

## 📄 License

MIT License - See LICENSE file

## 🌟 Credits

- Built with A-Frame and Three.js (WebXR)
- Built with React Native and Expo (Native)
- Designed for Meta Quest VR platform
- 15 original game concepts for VR social experiences
