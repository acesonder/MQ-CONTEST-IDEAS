# OUTSINC VR - WebXR/Immersive Web Version

A comprehensive VR social experiences platform built with WebXR, A-Frame, and Three.js for Meta Quest and other VR headsets.

## 🎮 Features

- **PIXAR-style Loading Screen**: 3D animated "OUTSINC" logo with bouncing dot using room-scale physics
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

- **Advanced Error Logging**: Press 'E' to toggle error console with detailed troubleshooting info
- **WebXR Support**: Full immersive VR mode for Meta Quest and compatible headsets
- **Hand Tracking Ready**: Designed for natural gesture interactions

## 📋 Requirements

- Node.js 16+ (for development server)
- Modern web browser with WebXR support (Chrome, Edge, Firefox Reality)
- Meta Quest 2/3/Pro or other WebXR-compatible VR headset

## 🚀 Installation Instructions

### Quick Start (Easiest Method)

1. **Clone or download this repository**:
   ```bash
   git clone https://github.com/acesonder/MQ-CONTEST-IDEAS.git
   cd MQ-CONTEST-IDEAS/webxr-version
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Access the app**:
   - On your computer: Open http://localhost:8080 in a WebXR-compatible browser
   - On Meta Quest: 
     - Find your computer's IP address (run `ipconfig` on Windows or `ifconfig` on Mac/Linux)
     - Open the Quest browser and navigate to http://YOUR_IP:8080
     - Click "Enter VR" button in the bottom right corner

### Production Deployment

For production, you can deploy to any static hosting service:

#### Option 1: GitHub Pages
```bash
# Build is not needed - files are ready to deploy
# Just push to GitHub and enable GitHub Pages in repository settings
```

#### Option 2: Netlify/Vercel
```bash
# Drag and drop the webxr-version folder to Netlify or Vercel dashboard
# Or connect your GitHub repository
```

#### Option 3: Custom Server
```bash
# Copy all files to your web server
# Ensure HTTPS is enabled (required for WebXR)
# Configure MIME types for .js and .html files
```

## 🎯 Usage

### Accessing on Meta Quest

1. **Enable Developer Mode** (first time only):
   - Install Meta Quest mobile app
   - Enable developer mode in settings

2. **Open Quest Browser**:
   - Launch the browser on your Quest
   - Navigate to your app URL
   - Grant necessary permissions when prompted

3. **Enter VR Mode**:
   - Click the VR goggles icon in the bottom right
   - Allow WebXR permissions
   - Enjoy the experience!

### Controls

- **VR Mode**:
  - Look around: Move your head
  - Navigate: Use controller thumbsticks
  - Select: Point and trigger
  - Menu: Click on game titles

- **Desktop Mode** (for testing):
  - Look: Mouse movement
  - Move: WASD keys
  - Select: Click
  - Error Log: Press 'E' key

## 🐛 Troubleshooting

### Error Logger

The app includes an advanced error logging system:
- Press **'E'** key to toggle the error console
- View real-time errors and warnings
- Export logs with detailed context for debugging

### Common Issues

#### 1. "WebXR not supported" Error

**Solution**:
- Ensure you're using a WebXR-compatible browser
- On Quest: Use the built-in browser, not third-party browsers
- Enable WebXR in browser settings if needed

#### 2. Can't Access from Quest Browser

**Solution**:
- Verify computer and Quest are on same network
- Check firewall isn't blocking port 8080
- Use computer's IP address, not 'localhost'
- Ensure HTTPS if accessing externally (WebXR requires secure context)

#### 3. Black Screen or Won't Load

**Solution**:
- Check browser console for errors (F12 on desktop)
- Toggle error logger with 'E' key
- Ensure JavaScript is enabled
- Try refreshing the page
- Clear browser cache

#### 4. Performance Issues

**Solution**:
- Close other apps on Quest
- Reduce graphics quality in browser settings
- Ensure good WiFi connection
- Update Quest firmware

#### 5. Loading Screen Stuck

**Solution**:
- Wait 7 seconds for animation to complete
- Check error log (press 'E')
- Refresh page
- Check network connection

### Debug Mode

For advanced debugging:

1. **Enable Console Logging**:
   - All errors are logged to browser console
   - Press F12 on desktop or use Quest developer tools
   - Use `ErrorLogger.exportLogs()` in console to download logs

2. **Check Network**:
   ```bash
   # Test server is accessible
   curl http://localhost:8080
   ```

3. **Verify WebXR**:
   - Open browser console
   - Type: `navigator.xr`
   - Should return XR object, not undefined

## 🔧 Development

### Project Structure

```
webxr-version/
├── index.html              # Main HTML with A-Frame scene
├── js/
│   ├── error-logger.js     # Advanced error logging system
│   ├── loading-screen.js   # PIXAR-style loading animation
│   ├── main-menu.js        # Menu navigation system
│   └── games.js            # All 15 game implementations
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

### Customization

#### Modify Games
Edit `js/games.js` and find the specific game loader function:
```javascript
gameLoaders: {
  'comfort-bubble': function() {
    // Your custom implementation
  }
}
```

#### Change Loading Screen
Edit `js/loading-screen.js` and `index.html` (loading-overlay styles):
```javascript
LoadingScreen = {
  animationDuration: 7000, // Adjust timing
  // ...
}
```

#### Add New Games
1. Add button in `index.html` menu section
2. Add loader function in `games.js`:
```javascript
gameLoaders: {
  'your-game': function() {
    this.createEntity({
      // Your game entities
    });
  }
}
```

## 🎨 Technologies Used

- **A-Frame 1.5.0**: WebXR framework
- **Three.js 0.160.0**: 3D graphics library
- **WebXR API**: VR/AR capabilities
- **Vanilla JavaScript**: No framework dependencies
- **HTML5/CSS3**: Modern web standards

## 🔒 Security & Privacy

- All processing happens client-side
- No user data sent to external servers
- WebXR permissions requested only when needed
- Error logs contain no personal information

## 📱 Browser Compatibility

✅ **Recommended**:
- Meta Quest Browser
- Chrome/Edge 90+ (desktop WebXR support)
- Firefox Reality

⚠️ **Limited Support**:
- Safari (WebXR support varies)
- Mobile browsers (limited VR features)

## 🚀 Performance Tips

1. **Optimize Assets**: Keep textures small
2. **Limit Entities**: Each game creates minimal entities
3. **Use Object Pooling**: For multiplayer scenarios
4. **Test on Device**: Always test on actual Quest hardware

## 📄 License

MIT License - feel free to modify and distribute

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Test on Meta Quest
4. Submit pull request

## 📞 Support

For issues:
1. Check error log (press 'E')
2. Export logs: `ErrorLogger.exportLogs()` in console
3. Check GitHub issues
4. Include log file with bug reports

## 🎯 Next Steps

After installation:
1. Test each game in VR mode
2. Customize the experience
3. Add multiplayer features (requires backend)
4. Deploy to production

## 🌟 Credits

Built with passion for VR social experiences
Powered by A-Frame and Three.js communities
