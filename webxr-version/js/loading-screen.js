/**
 * PIXAR-style Loading Screen
 * Features bouncing dot animation with room-scale physics simulation
 */
const LoadingScreen = {
    overlay: null,
    loadingDot: null,
    animationDuration: 7000, // 7 seconds

    init() {
        try {
            this.overlay = document.getElementById('loading-overlay');
            this.loadingDot = document.getElementById('loading-dot');

            if (!this.overlay || !this.loadingDot) {
                throw new Error('Loading screen elements not found');
            }

            ErrorLogger.log('INFO', 'Loading screen initialized');

            // Wait for animation to complete, then fade out
            setTimeout(() => {
                this.fadeOut();
            }, this.animationDuration);

        } catch (error) {
            ErrorLogger.logError('ERROR', 'Failed to initialize loading screen: ' + error.message, { error });
        }
    },

    fadeOut() {
        try {
            ErrorLogger.log('INFO', 'Fading out loading screen');
            
            // Fade out the overlay
            this.overlay.classList.add('fade-out');

            // After fade animation completes, show main menu
            setTimeout(() => {
                this.overlay.style.display = 'none';
                MainMenu.show();
            }, 1000);

        } catch (error) {
            ErrorLogger.logError('ERROR', 'Failed to fade out loading screen: ' + error.message, { error });
        }
    },

    // Method to show loading screen again if needed
    show() {
        if (this.overlay) {
            this.overlay.style.display = 'flex';
            this.overlay.classList.remove('fade-out');
        }
    }
};

// Make globally available
window.LoadingScreen = LoadingScreen;
