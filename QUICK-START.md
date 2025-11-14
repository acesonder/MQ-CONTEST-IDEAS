# OUTSINC VR - Quick Start Guide

Get up and running in 5 minutes!

## 🎯 Choose Your Path

### Path A: WebXR (Easiest - No Installation on Quest)

Perfect if you want to test immediately in your Quest browser.

```bash
# 1. Clone and enter directory
git clone https://github.com/acesonder/MQ-CONTEST-IDEAS.git
cd MQ-CONTEST-IDEAS/webxr-version

# 2. Install and start
npm install && npm start

# 3. On Quest: Open browser and go to http://YOUR_IP:8080
# Click "Enter VR" button in browser
```

**Find YOUR_IP:**
- Windows: `ipconfig` (look for IPv4)
- Mac/Linux: `ifconfig` (look for inet)

**That's it!** 🎉 You're in VR with all 15 games.

---

### Path B: React Native (Native Performance)

Perfect if you want a native Quest app with offline support.

```bash
# 1. Clone and enter directory
git clone https://github.com/acesonder/MQ-CONTEST-IDEAS.git
cd MQ-CONTEST-IDEAS/react-native-version

# 2. Install dependencies
npm install
npm install -g expo-cli

# 3. Start development server
expo start

# 4. Follow Expo instructions to open on Quest browser
```

**For APK (permanent install):**
```bash
# Build APK
eas build --platform android

# Install on Quest via USB
adb install your-app.apk
```

---

## 🎮 What You Get

### Both versions include:
- ✅ PIXAR-style loading screen
- ✅ All 15 VR social games
- ✅ Error logging tools
- ✅ Easy navigation
- ✅ Professional quality

### The 15 Games:
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

---

## ⚡ Super Quick Commands

### WebXR Version:
```bash
cd webxr-version
npm install && npm start
# Go to http://localhost:8080 on Quest
```

### React Native Version:
```bash
cd react-native-version
npm install && expo start
# Follow Expo instructions
```

---

## 🐛 Quick Troubleshooting

**Can't connect from Quest?**
- Ensure same WiFi network
- Use computer's IP, not "localhost"
- Check firewall isn't blocking

**WebXR won't enter VR?**
- Use Quest's built-in browser
- Grant permissions when asked
- Try refreshing page

**React Native build fails?**
```bash
expo start -c  # Clear cache
```

**Need more help?**
- WebXR: See [webxr-version/README.md](webxr-version/README.md)
- React Native: See [react-native-version/README.md](react-native-version/README.md)
- Full guide: See [INSTALLATION.md](INSTALLATION.md)
- Testing: See [TESTING.md](TESTING.md)

---

## 📱 Quest Setup (First Time)

1. **Enable Developer Mode:**
   - Install Meta Quest mobile app
   - Go to Settings → Developer Mode
   - Toggle ON

2. **For React Native (USB debugging):**
   - In Quest: Settings → System → Developer
   - Enable "USB Debugging"

---

## 🎯 Success Checklist

After starting:
- [ ] Loading screen with "OUTSINC" appears
- [ ] Bouncing dot animates for 7 seconds
- [ ] Menu with 15 games shows
- [ ] Can click/select games
- [ ] Can navigate back to menu
- [ ] Error log accessible (E key or 🐛 icon)

If all checked: **You're ready!** 🚀

---

## 🚀 Next Steps

1. **Test each game** - Try all 15 experiences
2. **Customize** - Modify games for your needs
3. **Deploy** - Host WebXR or build React Native APK
4. **Share** - Let others try it!

---

## 📚 Full Documentation

- **[README.md](README.md)** - Project overview
- **[INSTALLATION.md](INSTALLATION.md)** - Detailed installation
- **[TESTING.md](TESTING.md)** - Testing procedures
- **[PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)** - Complete details

---

## 🎉 You're Done!

Both implementations are ready to use. Choose the one that fits your needs and start building amazing VR social experiences!

**Questions?** Check the troubleshooting sections in the respective README files.

**Issues?** Open a GitHub issue with error logs.

**Happy building!** 🎮✨
