# Testing Guide for OUTSINC VR

This guide helps you test both implementations of the OUTSINC VR platform.

## ✅ Pre-Testing Checklist

Before testing, ensure you have:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Meta Quest headset (2, 3, or Pro)
- [ ] Quest and computer on same WiFi network
- [ ] Quest developer mode enabled
- [ ] USB-C cable (for React Native version)

## 🧪 Testing WebXR Version

### 1. Setup and Installation

```bash
cd webxr-version
npm install
```

Expected output: Dependencies installed successfully

### 2. Start Development Server

```bash
npm start
```

Expected: Server starts on http://localhost:8080

### 3. Desktop Testing (Browser)

**Test in Desktop Browser First:**
1. Open http://localhost:8080 in Chrome/Edge/Firefox
2. You should see:
   - ✅ Loading screen with "OUTSINC" text
   - ✅ Bouncing dot animation (7 seconds)
   - ✅ Transition to main menu
   - ✅ 15 game buttons displayed

**Verify Error Logger:**
- Press 'E' key
- Error log panel should appear (bottom right)
- Should show "Error Logger initialized successfully"

**Test Navigation:**
- Click any game button
- Game environment should load
- Back button should appear
- Click back button → return to menu

### 4. Quest Browser Testing

**Find Your IP Address:**
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

**On Meta Quest:**
1. Put on headset
2. Open Browser app
3. Navigate to: `http://YOUR_IP:8080`
4. Verify loading screen appears
5. Wait for menu to load

**Test VR Mode:**
1. Look for VR goggles icon (bottom right of browser)
2. Click "Enter VR"
3. Grant permissions if prompted
4. Verify:
   - ✅ 3D environment loads
   - ✅ Menu buttons are visible
   - ✅ Can look around with head movement
   - ✅ Cursor follows gaze
   - ✅ Can click buttons with trigger

**Test Each Game:**
Go through each of the 15 games:
- [ ] 1. Comfort Bubble Dates - Check orbs appear
- [ ] 2. Third-Place Café - Check tables render
- [ ] 3. Micro-Date Quests - Check activity options
- [ ] 4. Pass-Through Home Hangouts - Check MR indicator
- [ ] 5. Blind Vibe Rooms - Check vibe room cubes
- [ ] 6. Story-Build Date - Check story prompts
- [ ] 7. Compatibility Mini-Games - Check game stations
- [ ] 8. Safe Space Moderator - Check safety tools
- [ ] 9. CityWalk VR Dates - Check location portals
- [ ] 10. Interest-Cluster Hangouts - Check interest clusters
- [ ] 11. Mood-Matching Lounge - Check mood cubes
- [ ] 12. Silent Sync Sessions - Check quiet spaces
- [ ] 13. Speed Vibes Carousel - Check carousel rotation
- [ ] 14. Values-Based Date Builder - Check value cards
- [ ] 15. Group Movie + Debrief - Check movie screen

### 5. Performance Testing

**Check Performance:**
- FPS should be stable (aim for 60+ FPS)
- No stuttering during head movement
- Smooth transitions between menu and games
- Quick loading times

**Stress Test:**
- Load each game multiple times
- Switch between games rapidly
- Check for memory leaks
- Verify back button works consistently

### 6. Error Testing

**Trigger Intentional Errors:**
```javascript
// Open browser console (F12) and run:
throw new Error("Test error");
```

Verify:
- Error appears in log (press 'E')
- Error contains timestamp
- Error includes context

## 🧪 Testing React Native Version

### 1. Setup and Installation

```bash
cd react-native-version
npm install
```

Expected: Dependencies installed successfully

### 2. Install Expo CLI

```bash
npm install -g expo-cli
```

### 3. Start Development Server

```bash
npm start
```

Expected: Expo dev server starts with QR code

### 4. Web Browser Testing

```bash
npm run web
```

**Verify:**
- [ ] Loading screen appears
- [ ] Bouncing dot animates smoothly
- [ ] Menu loads after 7 seconds
- [ ] All 15 games listed
- [ ] Bug icon (🐛) visible bottom right

**Test Navigation:**
- Click any game card
- Game details should load
- Verify features list shows
- Click back button → return to menu

**Test Error Logger:**
- Tap 🐛 icon
- Error log panel appears
- Shows initialization message
- Tap "Close" to hide

### 5. Android Emulator Testing

**Start Emulator:**
1. Open Android Studio
2. Launch Android emulator (API 30+)

**Run App:**
```bash
npm run android
```

**Verify:**
- App installs on emulator
- Loading screen displays
- Can navigate all games
- Error logger works

### 6. Meta Quest Testing

**Method A: Browser (Quick Test)**
1. Start dev server: `npm start`
2. On Quest browser, visit Expo URL shown
3. Verify app loads

**Method B: Build APK (Full Test)**

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build development APK
eas build --platform android --profile development
```

**Install on Quest:**
```bash
# Connect Quest via USB
adb devices

# Install APK
adb install path/to/app.apk

# Launch
# Find "OUTSINC VR" in Quest library under "Unknown Sources"
```

**Test on Quest:**
- [ ] App launches successfully
- [ ] Loading animation smooth
- [ ] All games accessible
- [ ] Scrolling works well
- [ ] Back navigation works
- [ ] Error logger accessible

### 7. Performance Testing

**Check Performance:**
- Loading screen animation at 60 FPS
- Smooth scrolling in menu
- Quick game transitions
- No crashes or freezes

**Memory Test:**
- Open and close each game
- Check memory usage doesn't grow
- No memory leaks

## 🐛 Common Issues and Solutions

### WebXR Version Issues

**Issue: "Cannot GET /"**
```bash
# Restart server
npm start
```

**Issue: VR mode won't activate**
- Use Quest's built-in browser
- Update Quest firmware
- Clear browser cache

**Issue: Games not loading**
- Check browser console (F12)
- Press 'E' to view error log
- Verify all .js files loaded

### React Native Version Issues

**Issue: Metro bundler failed**
```bash
# Clear cache
expo start -c
```

**Issue: Can't connect to dev server**
```bash
# Use tunnel mode
expo start --tunnel
```

**Issue: Build fails**
```bash
# Clear and reinstall
rm -rf node_modules
npm install
```

## 📊 Test Results Template

Use this template to document your testing:

```
# Test Results - [Date]

## WebXR Version
- [ ] Desktop browser test: PASS/FAIL
- [ ] Quest browser test: PASS/FAIL
- [ ] VR mode test: PASS/FAIL
- [ ] All 15 games: PASS/FAIL
- [ ] Error logging: PASS/FAIL
- [ ] Performance: PASS/FAIL

Issues found: [List any issues]

## React Native Version
- [ ] Web test: PASS/FAIL
- [ ] Emulator test: PASS/FAIL
- [ ] Quest APK test: PASS/FAIL
- [ ] All 15 games: PASS/FAIL
- [ ] Error logging: PASS/FAIL
- [ ] Performance: PASS/FAIL

Issues found: [List any issues]

## Overall Assessment
- Both versions functional: YES/NO
- Ready for production: YES/NO
- Recommendations: [Your notes]
```

## 🚀 Next Steps After Testing

1. **If tests pass:**
   - Deploy WebXR version to hosting
   - Build production APK for React Native
   - Share with beta testers
   - Gather feedback

2. **If tests fail:**
   - Document all issues
   - Check error logs
   - Review troubleshooting sections
   - Fix issues and retest

## 📝 Testing Best Practices

1. **Test on actual Quest hardware** - Emulators can't replicate VR experience
2. **Test all games** - Don't skip any, even if one works
3. **Test error cases** - Try to break things intentionally
4. **Document issues** - Note anything unusual
5. **Test performance** - VR needs consistent frame rates
6. **Test on different networks** - WiFi quality matters
7. **Fresh install testing** - Test from clean state

## 🎯 Acceptance Criteria

For production readiness, verify:
- [ ] Both versions install without errors
- [ ] All 15 games are accessible
- [ ] Loading screens work properly
- [ ] Error logging functional
- [ ] VR mode works in WebXR version
- [ ] APK installs and runs on Quest
- [ ] No critical bugs or crashes
- [ ] Performance is acceptable (60 FPS)
- [ ] Documentation is accurate
- [ ] Installation guides work

## 📞 Getting Help

If you encounter issues:
1. Check error logs (press 'E' or tap 🐛)
2. Review troubleshooting in respective READMEs
3. Check browser/app console
4. Open GitHub issue with logs
5. Include test results template

Good luck with testing! 🎮
