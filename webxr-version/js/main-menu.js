/**
 * Main Menu System
 * Handles navigation between games and menu interactions
 */
const MainMenu = {
    menuEntity: null,
    backButton: null,
    currentGame: null,

    init() {
        try {
            this.menuEntity = document.getElementById('main-menu');
            this.backButton = document.getElementById('back-button');

            if (!this.menuEntity) {
                throw new Error('Main menu entity not found');
            }

            // Setup click handlers for menu buttons
            this.setupMenuButtons();

            // Setup back button
            if (this.backButton) {
                this.backButton.addEventListener('click', () => {
                    this.returnToMenu();
                });
            }

            ErrorLogger.log('INFO', 'Main menu initialized');

        } catch (error) {
            ErrorLogger.logError('ERROR', 'Failed to initialize main menu: ' + error.message, { error });
        }
    },

    setupMenuButtons() {
        const menuButtons = document.querySelectorAll('.menu-button');
        
        menuButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const gameId = button.getAttribute('data-game');
                if (gameId) {
                    this.launchGame(gameId);
                }
            });

            // Add hover effect
            button.addEventListener('mouseenter', () => {
                button.setAttribute('color', '#16213e');
                button.setAttribute('scale', '1.05 1.05 1.05');
            });

            button.addEventListener('mouseleave', () => {
                button.setAttribute('color', '#0f3460');
                button.setAttribute('scale', '1 1 1');
            });
        });

        ErrorLogger.log('INFO', `Setup ${menuButtons.length} menu buttons`);
    },

    show() {
        try {
            if (this.menuEntity) {
                this.menuEntity.setAttribute('visible', 'true');
                ErrorLogger.log('INFO', 'Main menu shown');
            }
        } catch (error) {
            ErrorLogger.logError('ERROR', 'Failed to show main menu: ' + error.message, { error });
        }
    },

    hide() {
        try {
            if (this.menuEntity) {
                this.menuEntity.setAttribute('visible', 'false');
                ErrorLogger.log('INFO', 'Main menu hidden');
            }
        } catch (error) {
            ErrorLogger.logError('ERROR', 'Failed to hide main menu: ' + error.message, { error });
        }
    },

    launchGame(gameId) {
        try {
            ErrorLogger.log('INFO', `Launching game: ${gameId}`);
            
            // Check if Games object is available
            if (typeof Games === 'undefined' || !Games) {
                throw new Error('Games system is not initialized yet. Please wait...');
            }
            
            this.currentGame = gameId;
            this.hide();
            
            // Show back button
            if (this.backButton) {
                this.backButton.setAttribute('visible', 'true');
            }

            // Load the game
            Games.loadGame(gameId);

        } catch (error) {
            ErrorLogger.logError('ERROR', `Failed to launch game ${gameId}: ` + error.message, { error });
        }
    },

    returnToMenu() {
        try {
            ErrorLogger.log('INFO', 'Returning to main menu');
            
            // Hide back button
            if (this.backButton) {
                this.backButton.setAttribute('visible', 'false');
            }

            // Unload current game
            if (this.currentGame) {
                // Check if Games object is available
                if (typeof Games !== 'undefined' && Games) {
                    Games.unloadGame(this.currentGame);
                }
                this.currentGame = null;
            }

            // Show menu
            this.show();

        } catch (error) {
            ErrorLogger.logError('ERROR', 'Failed to return to menu: ' + error.message, { error });
        }
    }
};

// Make globally available
window.MainMenu = MainMenu;
