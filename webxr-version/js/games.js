/**
 * Games System
 * Implements all 15 VR social experiences
 */
const Games = {
    container: null,
    currentGameElements: [],

    init() {
        try {
            this.container = document.getElementById('game-container');
            if (!this.container) {
                throw new Error('Game container not found');
            }
            ErrorLogger.log('INFO', 'Games system initialized');
        } catch (error) {
            ErrorLogger.logError('ERROR', 'Failed to initialize games: ' + error.message, { error });
        }
    },

    loadGame(gameId) {
        try {
            ErrorLogger.log('INFO', `Loading game: ${gameId}`);
            
            // Clear any existing game
            this.clearContainer();

            // Load the appropriate game
            const gameLoader = this.gameLoaders[gameId];
            if (gameLoader) {
                gameLoader.call(this);
            } else {
                throw new Error(`Game loader not found for: ${gameId}`);
            }

        } catch (error) {
            ErrorLogger.logError('ERROR', `Failed to load game ${gameId}: ` + error.message, { error });
        }
    },

    unloadGame() {
        this.clearContainer();
    },

    clearContainer() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.currentGameElements = [];
    },

    createEntity(config) {
        const entity = document.createElement('a-entity');
        Object.keys(config).forEach(key => {
            if (key === 'components') {
                Object.keys(config.components).forEach(comp => {
                    entity.setAttribute(comp, config.components[comp]);
                });
            } else {
                entity.setAttribute(key, config[key]);
            }
        });
        this.container.appendChild(entity);
        this.currentGameElements.push(entity);
        return entity;
    },

    // Game Loaders
    gameLoaders: {
        'comfort-bubble': function() {
            ErrorLogger.log('INFO', 'Creating Comfort Bubble Dates experience');
            
            // Create cozy environment
            this.createEntity({
                geometry: 'primitive: sphere; radius: 0.5',
                material: 'color: #ff6b9d; opacity: 0.6; transparent: true; shader: flat',
                position: '-2 1.6 -3',
                animation: 'property: position; to: -2 1.8 -3; dur: 2000; dir: alternate; loop: true; easing: easeInOutSine'
            });

            this.createEntity({
                geometry: 'primitive: sphere; radius: 0.5',
                material: 'color: #6bcf7f; opacity: 0.6; transparent: true; shader: flat',
                position: '2 1.6 -3',
                animation: 'property: position; to: 2 1.8 -3; dur: 2000; dir: alternate; loop: true; easing: easeInOutSine'
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 4; height: 1.5',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 2.5 -3'
            });

            this.createEntity({
                components: {
                    text: {
                        value: 'COMFORT BUBBLE DATES\n\nMeet as glowing orbs in a cozy space.\nVoices are anonymized at first.\nAs trust grows, details fade in.\n\nUse hand gestures:\n👍 = Comfortable  👉 = Slow down',
                        align: 'center',
                        color: '#ffffff',
                        width: 3.5,
                        wrapCount: 40
                    }
                },
                position: '0 2.5 -2.99'
            });

            // Comfort meter visualization
            for (let i = 0; i < 5; i++) {
                this.createEntity({
                    geometry: 'primitive: box; width: 0.3; height: 0.3; depth: 0.1',
                    material: `color: ${i < 2 ? '#ff6b6b' : '#6bcf7f'}`,
                    position: `${-1 + i * 0.5} 0.5 -3`
                });
            }

            // Shared activities
            this.createEntity({
                geometry: 'primitive: plane; width: 2; height: 1.5',
                material: 'color: #2a2a4e',
                position: '0 1 -4',
                components: {
                    text: {
                        value: 'Shared Activities:\n\n• Doodle Together\n• Pick Music\n• Answer Icebreakers',
                        align: 'center',
                        color: '#ffffff',
                        width: 1.8
                    }
                }
            });
        },

        'third-place': function() {
            ErrorLogger.log('INFO', 'Creating Third-Place Café experience');
            
            // Create café environment
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 2',
                material: 'color: #3d2817',
                position: '0 2 -5',
                rotation: '0 0 0'
            });

            // Tables
            for (let i = 0; i < 3; i++) {
                this.createEntity({
                    geometry: 'primitive: cylinder; radius: 0.8; height: 0.1',
                    material: 'color: #5c4033',
                    position: `${-3 + i * 3} 1 -3`
                });

                // Chairs around table
                for (let j = 0; j < 4; j++) {
                    const angle = (j / 4) * Math.PI * 2;
                    const x = Math.cos(angle) * 1.2;
                    const z = Math.sin(angle) * 1.2;
                    this.createEntity({
                        geometry: 'primitive: box; width: 0.4; height: 0.8; depth: 0.4',
                        material: 'color: #8b6f47',
                        position: `${-3 + i * 3 + x} 0.4 ${-3 + z}`
                    });
                }
            }

            // Vibe tags
            const vibeTags = ['Deep Talk', 'Memes', 'Music', 'Chill'];
            vibeTags.forEach((tag, i) => {
                this.createEntity({
                    geometry: 'primitive: plane; width: 1; height: 0.3',
                    material: 'color: #ff6b9d',
                    position: `${-3 + i * 2} 2.5 -3`,
                    components: {
                        text: {
                            value: tag,
                            align: 'center',
                            color: '#ffffff',
                            width: 0.9
                        }
                    }
                });
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 4; height: 1',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 3 -4',
                components: {
                    text: {
                        value: 'THIRD-PLACE CAFÉ\n\nA persistent virtual café for chill hangouts.\nChoose your vibe tag and join a table.\nSpatial audio • Table hopping • Low social load mode',
                        align: 'center',
                        color: '#ffffff',
                        width: 3.5,
                        wrapCount: 45
                    }
                }
            });
        },

        'micro-date': function() {
            ErrorLogger.log('INFO', 'Creating Micro-Date Quests experience');
            
            // Quest timer
            this.createEntity({
                geometry: 'primitive: cylinder; radius: 0.5; height: 0.1',
                material: 'color: #ffd93d',
                position: '0 2.5 -3',
                animation: 'property: scale; to: 0.8 0.8 0.8; dur: 1000; dir: alternate; loop: true'
            });

            // Activity options
            const activities = [
                { name: 'Build a City', icon: '🏙️', pos: '-2 1.5 -3' },
                { name: 'Solve Puzzle', icon: '🧩', pos: '0 1.5 -3' },
                { name: 'Draw Together', icon: '🎨', pos: '2 1.5 -3' }
            ];

            activities.forEach(activity => {
                const parts = activity.pos.split(' ').map(Number);
                this.createEntity({
                    geometry: 'primitive: box; width: 1.2; height: 1.2; depth: 0.2',
                    material: 'color: #0f3460',
                    position: activity.pos
                });

                this.createEntity({
                    components: {
                        text: {
                            value: `${activity.icon}\n${activity.name}`,
                            align: 'center',
                            color: '#ffffff',
                            width: 1
                        }
                    },
                    position: `${parts[0]} ${parts[1]} ${parts[2] + 0.11}`
                });
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1.2',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 3.2 -3.5',
                components: {
                    text: {
                        value: 'MICRO-DATE QUESTS\n\n10-15 minute activities with your match.\nChemistry through doing, not just talking.\nRate the experience after completion.',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 50
                    }
                }
            });

            // Rating system preview
            for (let i = 0; i < 5; i++) {
                this.createEntity({
                    geometry: 'primitive: sphere; radius: 0.15',
                    material: 'color: #ffd93d',
                    position: `${-1 + i * 0.5} 0.5 -3`
                });
            }
        },

        'passthrough': function() {
            ErrorLogger.log('INFO', 'Creating Pass-Through Home Hangouts experience');
            
            // MR passthrough indicator
            this.createEntity({
                geometry: 'primitive: plane; width: 6; height: 3',
                material: 'color: #00ff00; opacity: 0.1; transparent: true',
                position: '0 1.6 -4'
            });

            // Privacy controls
            this.createEntity({
                geometry: 'primitive: plane; width: 3; height: 1.5',
                material: 'color: #1a1a2e',
                position: '-2 2 -3',
                components: {
                    text: {
                        value: 'PRIVACY CONTROLS\n\n• Show desk only\n• Blur background\n• Custom masking',
                        align: 'center',
                        color: '#ffffff',
                        width: 2.5
                    }
                }
            });

            // Shared decorations
            const decorItems = ['🖼️', '🪴', '🕯️', '📚'];
            decorItems.forEach((item, i) => {
                this.createEntity({
                    components: {
                        text: {
                            value: item,
                            align: 'center',
                            color: '#ffffff',
                            width: 0.5
                        }
                    },
                    position: `${-1.5 + i} 1.5 -3`
                });
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1.5',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '2 2 -3',
                components: {
                    text: {
                        value: 'PASS-THROUGH HOME HANGOUTS\n\nBoth see their real rooms with\nshared virtual layers.\nJoint customization of space.\nPrivacy-first design with blur options.',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 40
                    }
                }
            });
        },

        'blind-vibe': function() {
            ErrorLogger.log('INFO', 'Creating Blind Vibe Rooms experience');
            
            // Vibe room options
            const vibeRooms = [
                { name: 'Cozy Rainy Night', color: '#2c3e50', pos: '-3 1.6 -3' },
                { name: 'Arcade Chaos', color: '#e74c3c', pos: '0 1.6 -3' },
                { name: 'Campfire Stories', color: '#e67e22', pos: '3 1.6 -3' }
            ];

            vibeRooms.forEach(room => {
                this.createEntity({
                    geometry: 'primitive: box; width: 1.5; height: 1.5; depth: 1.5',
                    material: `color: ${room.color}; opacity: 0.7; transparent: true`,
                    position: room.pos,
                    animation: 'property: rotation; to: 0 360 0; dur: 10000; loop: true; easing: linear'
                });

                const parts = room.pos.split(' ').map(Number);
                this.createEntity({
                    components: {
                        text: {
                            value: room.name,
                            align: 'center',
                            color: '#ffffff',
                            width: 1.3
                        }
                    },
                    position: `${parts[0]} ${parts[1] - 1} ${parts[2]}`
                });
            });

            // Abstract avatar preview
            this.createEntity({
                geometry: 'primitive: octahedron; radius: 0.4',
                material: 'color: #9b59b6; wireframe: true',
                position: '0 2.5 -2',
                animation: 'property: rotation; to: 360 360 0; dur: 8000; loop: true; easing: linear'
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1.5',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 3.5 -3.5',
                components: {
                    text: {
                        value: 'BLIND VIBE ROOMS\n\nPersonality over looks.\nVoice-only or abstract avatars at first.\nRoom reacts to your conversation.\nMutually unlock identity layers.',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 45
                    }
                }
            });
        },

        'story-build': function() {
            ErrorLogger.log('INFO', 'Creating Story-Build Date experience');
            
            // Story environment that morphs
            this.createEntity({
                geometry: 'primitive: sphere; radius: 5; segmentsHeight: 32',
                material: 'color: #34495e; side: back; opacity: 0.8; transparent: true',
                position: '0 1.6 0'
            });

            // Story elements
            const storyPrompts = [
                'Setting: Where does the story begin?',
                'Character: Who is the protagonist?',
                'Dilemma: What challenge arises?'
            ];

            storyPrompts.forEach((prompt, i) => {
                this.createEntity({
                    geometry: 'primitive: plane; width: 2; height: 0.8',
                    material: 'color: #8e44ad',
                    position: `${-2 + i * 2} ${2 + i * 0.3} -3`,
                    components: {
                        text: {
                            value: prompt,
                            align: 'center',
                            color: '#ffffff',
                            width: 1.8,
                            wrapCount: 25
                        }
                    }
                });
            });

            // AI narrator indicator
            this.createEntity({
                geometry: 'primitive: torus; radius: 0.5; radiusTubular: 0.1',
                material: 'color: #3498db',
                position: '0 3 -2',
                animation: 'property: rotation; to: 360 0 360; dur: 6000; loop: true; easing: linear'
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1.5',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 0.8 -3',
                components: {
                    text: {
                        value: 'STORY-BUILD DATE\n\nCo-create a story in real-time.\nAI narrator describes your choices.\nEnvironment morphs with the narrative.\nSaved as replay at the end.',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 45
                    }
                }
            });
        },

        'mini-games': function() {
            ErrorLogger.log('INFO', 'Creating Compatibility Mini-Games Arcade');
            
            // Game stations
            const games = [
                { name: 'Balloon Float', icon: '🎈', pos: '-2.5 1.5 -3' },
                { name: 'Sync Rhythm', icon: '🎵', pos: '0 1.5 -3' },
                { name: 'Maze Guide', icon: '🧭', pos: '2.5 1.5 -3' }
            ];

            games.forEach(game => {
                const parts = game.pos.split(' ').map(Number);
                
                this.createEntity({
                    geometry: 'primitive: cylinder; radius: 0.6; height: 0.3',
                    material: 'color: #e74c3c',
                    position: game.pos
                });

                this.createEntity({
                    components: {
                        text: {
                            value: `${game.icon}\n${game.name}`,
                            align: 'center',
                            color: '#ffffff',
                            width: 1
                        }
                    },
                    position: `${parts[0]} ${parts[1] + 0.5} ${parts[2]}`
                });
            });

            // Compatibility profile preview
            this.createEntity({
                geometry: 'primitive: plane; width: 3; height: 2',
                material: 'color: #2c3e50',
                position: '0 2.5 -4',
                components: {
                    text: {
                        value: 'COMPATIBILITY PROFILE\n\nPlay Style Analysis:\n• Leading vs Following\n• Patient vs Fast\n• Strategic vs Spontaneous\n\nGenerated after games!',
                        align: 'center',
                        color: '#ffffff',
                        width: 2.8,
                        wrapCount: 30
                    }
                }
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 3.8 -3.5',
                components: {
                    text: {
                        value: 'COMPATIBILITY MINI-GAMES ARCADE\n\n3-5 minute cooperative games. Soft-matching through play style.',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 50
                    }
                }
            });
        },

        'safe-space': function() {
            ErrorLogger.log('INFO', 'Creating Safe Space Moderator experience');
            
            // Visible boundaries overlay
            this.createEntity({
                geometry: 'primitive: ring; radiusInner: 0.9; radiusOuter: 1',
                material: 'color: #2ecc71; opacity: 0.5; transparent: true; side: double',
                position: '0 0.1 -3',
                rotation: '-90 0 0'
            });

            // Safety tools panel
            this.createEntity({
                geometry: 'primitive: plane; width: 2.5; height: 2',
                material: 'color: #27ae60',
                position: '-2.5 2 -3',
                components: {
                    text: {
                        value: 'SAFETY TOOLS\n\n🛡️ Boundaries Ring\n🌫️ Fade Room\n👻 Guardian Mode\n🚪 Quick Exit\n\nGesture for help\nanytime',
                        align: 'center',
                        color: '#ffffff',
                        width: 2.2,
                        wrapCount: 20
                    }
                }
            });

            // Comfort indicators
            const comfortLevels = ['😰', '😐', '🙂', '😊', '🥰'];
            comfortLevels.forEach((emoji, i) => {
                this.createEntity({
                    components: {
                        text: {
                            value: emoji,
                            align: 'center',
                            width: 0.3
                        }
                    },
                    position: `${-1 + i * 0.5} 1 -2.5`
                });
            });

            // Guardian mode visualization
            this.createEntity({
                geometry: 'primitive: sphere; radius: 0.3',
                material: 'color: #3498db; opacity: 0.3; transparent: true',
                position: '2.5 2 -3',
                animation: 'property: scale; to: 1.2 1.2 1.2; dur: 2000; dir: alternate; loop: true'
            });

            this.createEntity({
                components: {
                    text: {
                        value: 'Guardian\n(visible only to you)',
                        align: 'center',
                        color: '#3498db',
                        width: 1
                    }
                },
                position: '2.5 1.2 -3'
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1.2',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 3.5 -3.5',
                components: {
                    text: {
                        value: 'SAFE SPACE MODERATOR\n\nConsent and safety centered platform.\nVisible boundaries • Quick fade • Guardian mode\nBuilt-in safety tools at your fingertips.',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 45
                    }
                }
            });
        },

        'citywalk': function() {
            ErrorLogger.log('INFO', 'Creating CityWalk VR Dates experience');
            
            // City locations
            const locations = [
                { name: 'Tokyo Alley', color: '#e91e63', pos: '-3 1.5 -4' },
                { name: 'Paris Riverside', color: '#9c27b0', pos: '0 1.5 -4' },
                { name: 'Caribbean Beach', color: '#00bcd4', pos: '3 1.5 -4' }
            ];

            locations.forEach(location => {
                const parts = location.pos.split(' ').map(Number);
                
                // Location portal
                this.createEntity({
                    geometry: 'primitive: box; width: 1.5; height: 2; depth: 0.2',
                    material: `color: ${location.color}`,
                    position: location.pos
                });

                this.createEntity({
                    components: {
                        text: {
                            value: location.name,
                            align: 'center',
                            color: '#ffffff',
                            width: 1.3
                        }
                    },
                    position: `${parts[0]} ${parts[1] + 1.2} ${parts[2] + 0.11}`
                });
            });

            // Conversation prompts floating
            const prompts = ['First job?', 'Wildest cooking?', 'Dream travel?'];
            prompts.forEach((prompt, i) => {
                this.createEntity({
                    geometry: 'primitive: plane; width: 1; height: 0.4',
                    material: 'color: #ffd93d',
                    position: `${-2 + i * 2} 3 -3`,
                    animation: 'property: position; to: ' + `${-2 + i * 2} 3.3 -3` + '; dur: 2000; dir: alternate; loop: true',
                    components: {
                        text: {
                            value: prompt,
                            align: 'center',
                            color: '#000000',
                            width: 0.9
                        }
                    }
                });
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1.2',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 0.5 -3',
                components: {
                    text: {
                        value: 'CITYWALK VR DATES\n\nTake low-poly walks through iconic places.\nConversation prompts in environment.\nTravel mode for offline use.',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 45
                    }
                }
            });
        },

        'interest-cluster': function() {
            ErrorLogger.log('INFO', 'Creating Interest-Cluster Hangouts');
            
            // Interest clusters
            const interests = [
                { name: 'Music Production', icon: '🎹', pos: '-3 1.5 -3' },
                { name: 'Writing', icon: '✍️', pos: '-1 1.5 -3' },
                { name: 'Activism', icon: '✊', pos: '1 1.5 -3' },
                { name: 'Gardening', icon: '🌱', pos: '3 1.5 -3' }
            ];

            interests.forEach(interest => {
                const parts = interest.pos.split(' ').map(Number);
                
                this.createEntity({
                    geometry: 'primitive: cylinder; radius: 0.5; height: 1',
                    material: 'color: #16a085',
                    position: interest.pos
                });

                this.createEntity({
                    components: {
                        text: {
                            value: `${interest.icon}\n${interest.name}`,
                            align: 'center',
                            color: '#ffffff',
                            width: 0.9
                        }
                    },
                    position: `${parts[0]} ${parts[1] + 1} ${parts[2]}`
                });
            });

            // Work tables
            this.createEntity({
                geometry: 'primitive: box; width: 3; height: 0.1; depth: 2',
                material: 'color: #34495e',
                position: '0 1 -4'
            });

            // Chemistry check button
            this.createEntity({
                geometry: 'primitive: sphere; radius: 0.3',
                material: 'color: #e74c3c',
                position: '0 2.5 -3',
                animation: 'property: scale; to: 1.1 1.1 1.1; dur: 1000; dir: alternate; loop: true'
            });

            this.createEntity({
                components: {
                    text: {
                        value: '❤️ Chemistry Check',
                        align: 'center',
                        color: '#ffffff',
                        width: 1
                    }
                },
                position: '0 2 -3'
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1.2',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 3.5 -3.5',
                components: {
                    text: {
                        value: 'INTEREST-CLUSTER HANGOUTS\n\nInterest-first hangouts, dating second.\nMeet around shared causes and hobbies.\nOpt-in chemistry checks for 1-on-1 follow-ups.',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 45
                    }
                }
            });
        },

        'mood-matching': function() {
            ErrorLogger.log('INFO', 'Creating Mood-Matching Lounge');
            
            // Mood options
            const moods = [
                { name: 'Burned Out', color: '#95a5a6', brightness: 0.3, pos: '-3 1.5 -3' },
                { name: 'Excited', color: '#f39c12', brightness: 1, pos: '-1 1.5 -3' },
                { name: 'Lonely', color: '#3498db', brightness: 0.5, pos: '1 1.5 -3' },
                { name: 'Curious', color: '#9b59b6', brightness: 0.7, pos: '3 1.5 -3' }
            ];

            moods.forEach(mood => {
                // Environment preview
                this.createEntity({
                    geometry: 'primitive: box; width: 1.2; height: 1.2; depth: 1.2',
                    material: `color: ${mood.color}; opacity: ${mood.brightness}; transparent: true`,
                    position: mood.pos,
                    animation: 'property: rotation; to: 0 360 0; dur: 8000; loop: true; easing: linear'
                });

                const parts = mood.pos.split(' ').map(Number);
                this.createEntity({
                    components: {
                        text: {
                            value: mood.name,
                            align: 'center',
                            color: '#ffffff',
                            width: 1
                        }
                    },
                    position: `${parts[0]} ${parts[1] - 1} ${parts[2]}`
                });
            });

            // Mood history graph
            this.createEntity({
                geometry: 'primitive: plane; width: 3; height: 1.5',
                material: 'color: #2c3e50',
                position: '0 2.8 -4',
                components: {
                    text: {
                        value: 'MOOD HISTORY\n\nTrack what helps you:\n📊 Weekly patterns\n🎯 Best matches\n💡 Insights',
                        align: 'center',
                        color: '#ffffff',
                        width: 2.8,
                        wrapCount: 25
                    }
                }
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1.2',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 0.5 -3',
                components: {
                    text: {
                        value: 'MOOD-MATCHING LOUNGE\n\nMatch by emotional state, not profile.\nEnvironment tuned to collective mood.\nOptional mood tracking for insights.',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 45
                    }
                }
            });
        },

        'silent-sync': function() {
            ErrorLogger.log('INFO', 'Creating Silent Sync Sessions');
            
            // Quiet spaces
            for (let i = 0; i < 3; i++) {
                this.createEntity({
                    geometry: 'primitive: box; width: 2; height: 1.5; depth: 2',
                    material: 'color: #34495e; opacity: 0.7; transparent: true',
                    position: `${-3 + i * 3} 1 -4`
                });
            }

            // Activity options
            const activities = [
                { name: 'Read', icon: '📖', pos: '-3 1.5 -4' },
                { name: 'Draw', icon: '🎨', pos: '0 1.5 -4' },
                { name: 'Chill', icon: '☕', pos: '3 1.5 -4' }
            ];

            activities.forEach(activity => {
                this.createEntity({
                    components: {
                        text: {
                            value: `${activity.icon}\n${activity.name}`,
                            align: 'center',
                            color: '#ffffff',
                            width: 1
                        }
                    },
                    position: activity.pos
                });
            });

            // Timer display
            this.createEntity({
                geometry: 'primitive: cylinder; radius: 0.5; height: 0.2',
                material: 'color: #2ecc71',
                position: '0 2.5 -3'
            });

            this.createEntity({
                components: {
                    text: {
                        value: '⏱️ 25:00\nPomodoro Timer',
                        align: 'center',
                        color: '#ffffff',
                        width: 1
                    }
                },
                position: '0 3 -3'
            });

            // Minimal interaction options
            const emojis = ['👍', '❤️', '🙏'];
            emojis.forEach((emoji, i) => {
                this.createEntity({
                    components: {
                        text: {
                            value: emoji,
                            align: 'center',
                            width: 0.3
                        }
                    },
                    position: `${-0.5 + i * 0.5} 0.5 -2.5`
                });
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1.2',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 3.8 -3.5',
                components: {
                    text: {
                        value: 'SILENT SYNC SESSIONS\n\nCompanion presence without talking.\nShared timers • Ambient sounds • Minimal interaction\nChat optionally after session ends.',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 45
                    }
                }
            });
        },

        'speed-vibes': function() {
            ErrorLogger.log('INFO', 'Creating Speed Vibes Carousel');
            
            // Carousel structure
            const stations = 6;
            for (let i = 0; i < stations; i++) {
                const angle = (i / stations) * Math.PI * 2;
                const radius = 3;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius - 3;
                
                this.createEntity({
                    geometry: 'primitive: cylinder; radius: 0.8; height: 2',
                    material: `color: ${['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'][i]}`,
                    position: `${x} 1 ${z}`
                });

                // Activity labels
                const activities = ['Draw', 'Music', 'This/That', 'Q&A', 'Story', 'Emoji'];
                this.createEntity({
                    components: {
                        text: {
                            value: activities[i],
                            align: 'center',
                            color: '#ffffff',
                            width: 0.7
                        }
                    },
                    position: `${x} 2.2 ${z}`
                });
            }

            // Center indicator
            this.createEntity({
                geometry: 'primitive: sphere; radius: 0.5',
                material: 'color: #ffd93d',
                position: '0 1.6 -3',
                animation: 'property: rotation; to: 0 360 0; dur: 30000; loop: true; easing: linear'
            });

            // Connection list preview
            this.createEntity({
                geometry: 'primitive: plane; width: 2; height: 1.5',
                material: 'color: #2c3e50',
                position: '0 3 -1.5',
                components: {
                    text: {
                        value: 'CONNECTIONS\n\n✓ mutual bookmarks\nappear here!',
                        align: 'center',
                        color: '#ffffff',
                        width: 1.8
                    }
                }
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 3.8 -3.5',
                components: {
                    text: {
                        value: 'SPEED VIBES CAROUSEL\n\nSpeed-meeting with different micro-activities.\nRooms rotate • Less navigation • More flow',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 50
                    }
                }
            });
        },

        'values-based': function() {
            ErrorLogger.log('INFO', 'Creating Values-Based Date Builder');
            
            // Value selection
            const values = [
                'Mutual Aid', 'Art', 'Nature', 'Mental Health', 'Sustainability'
            ];

            values.forEach((value, i) => {
                this.createEntity({
                    geometry: 'primitive: box; width: 1.5; height: 0.5; depth: 0.2',
                    material: 'color: #16a085',
                    position: `${-3 + i * 1.5} 2 -3`
                });

                const parts = `${-3 + i * 1.5} 2 -3`.split(' ').map(Number);
                this.createEntity({
                    components: {
                        text: {
                            value: value,
                            align: 'center',
                            color: '#ffffff',
                            width: 1.3,
                            wrapCount: 15
                        }
                    },
                    position: `${parts[0]} ${parts[1]} ${parts[2] + 0.11}`
                });
            });

            // Environment themed to values
            this.createEntity({
                geometry: 'primitive: plane; width: 8; height: 4',
                material: 'color: #27ae60; opacity: 0.3; transparent: true',
                position: '0 1.5 -5'
            });

            // Conversation cards
            for (let i = 0; i < 3; i++) {
                this.createEntity({
                    geometry: 'primitive: plane; width: 1.2; height: 0.8',
                    material: 'color: #8e44ad',
                    position: `${-1.5 + i * 1.5} 1.5 -2.5`,
                    rotation: `${10 - i * 10} 0 0`,
                    animation: 'property: position; to: ' + `${-1.5 + i * 1.5} 1.7 -2.5` + '; dur: 2000; dir: alternate; loop: true',
                    components: {
                        text: {
                            value: `💭\nDeep Topic\n${i + 1}`,
                            align: 'center',
                            color: '#ffffff',
                            width: 1
                        }
                    }
                });
            }

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1.2',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 3.5 -3.5',
                components: {
                    text: {
                        value: 'VALUES-BASED DATE BUILDER\n\nEnvironment builds around your values.\nDeep conversation cards float nearby.\nThemed murals, quotes, and prompts.',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 45
                    }
                }
            });
        },

        'movie-debrief': function() {
            ErrorLogger.log('INFO', 'Creating Group Movie + Debrief');
            
            // Movie screen
            this.createEntity({
                geometry: 'primitive: plane; width: 6; height: 3.5',
                material: 'color: #000000',
                position: '0 2 -5'
            });

            // Play indicator
            this.createEntity({
                geometry: 'primitive: cone; radiusBottom: 0.5; radiusTop: 0',
                material: 'color: #e74c3c',
                position: '0 2 -4.9',
                rotation: '0 0 -90'
            });

            // Seating/sofas
            for (let i = 0; i < 4; i++) {
                this.createEntity({
                    geometry: 'primitive: box; width: 1; height: 0.4; depth: 0.8',
                    material: 'color: #8e44ad',
                    position: `${-1.5 + i} 0.6 -1`
                });
            }

            // Breakout sofa spaces
            this.createEntity({
                geometry: 'primitive: plane; width: 3; height: 2',
                material: 'color: #34495e; opacity: 0.7; transparent: true',
                position: '-3 1.5 -2',
                components: {
                    text: {
                        value: 'BREAKOUT\nSOFA 1\n\n💬 Discussion',
                        align: 'center',
                        color: '#ffffff',
                        width: 2.5
                    }
                }
            });

            this.createEntity({
                geometry: 'primitive: plane; width: 3; height: 2',
                material: 'color: #34495e; opacity: 0.7; transparent: true',
                position: '3 1.5 -2',
                components: {
                    text: {
                        value: 'BREAKOUT\nSOFA 2\n\n💬 Discussion',
                        align: 'center',
                        color: '#ffffff',
                        width: 2.5
                    }
                }
            });

            // Group thoughts cloud
            this.createEntity({
                geometry: 'primitive: sphere; radius: 1',
                material: 'color: #3498db; opacity: 0.4; transparent: true',
                position: '0 3.5 -3',
                animation: 'property: scale; to: 1.1 1.1 1.1; dur: 3000; dir: alternate; loop: true'
            });

            this.createEntity({
                components: {
                    text: {
                        value: '☁️ Group Thoughts\nAI Summary',
                        align: 'center',
                        color: '#ffffff',
                        width: 1.5
                    }
                },
                position: '0 3.5 -2.9'
            });

            // Instructions
            this.createEntity({
                geometry: 'primitive: plane; width: 5; height: 1',
                material: 'color: #1a1a2e; opacity: 0.9',
                position: '0 0.3 -1',
                components: {
                    text: {
                        value: 'GROUP MOVIE + DEBRIEF\n\nCo-watch with discussion breaks • Breakout sofas • AI summary',
                        align: 'center',
                        color: '#ffffff',
                        width: 4.5,
                        wrapCount: 50
                    }
                }
            });
        }
    }
};

// Make globally available
window.Games = Games;
