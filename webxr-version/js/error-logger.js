/**
 * Advanced Error Logger for VR Applications
 * Captures and displays errors with context for easier troubleshooting
 */
const ErrorLogger = {
    logs: [],
    logElement: null,
    maxLogs: 50,
    showErrors: true,

    init() {
        this.logElement = document.getElementById('error-log');
        
        // Capture console errors
        window.addEventListener('error', (event) => {
            this.logError('ERROR', event.message, {
                filename: event.filename,
                line: event.lineno,
                column: event.colno,
                error: event.error
            });
        });

        // Capture unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.logError('PROMISE_REJECTION', event.reason, {
                promise: event.promise
            });
        });

        // Capture console.error calls
        const originalError = console.error;
        console.error = (...args) => {
            this.logError('CONSOLE_ERROR', args.join(' '), {});
            originalError.apply(console, args);
        };

        // Log successful initialization
        this.log('INFO', 'Error Logger initialized successfully');

        // Toggle error display with 'e' key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'e' || e.key === 'E') {
                this.toggleDisplay();
            }
        });
    },

    log(type, message, context = {}) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            type,
            message,
            context
        };

        this.logs.push(logEntry);
        
        // Keep only the last maxLogs entries
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // Update display
        this.updateDisplay();

        // Log to console for debugging
        console.log(`[${type}] ${message}`, context);
    },

    logError(type, message, context = {}) {
        this.log(type, message, context);
        this.showDisplay();
    },

    updateDisplay() {
        if (!this.logElement) return;

        const recentLogs = this.logs.slice(-10).reverse();
        this.logElement.innerHTML = recentLogs.map(log => {
            const typeColor = {
                'ERROR': '#ff6b6b',
                'WARN': '#ffd93d',
                'INFO': '#6bcf7f',
                'PROMISE_REJECTION': '#ff6b6b',
                'CONSOLE_ERROR': '#ff6b6b'
            }[log.type] || '#ffffff';

            return `<div style="margin-bottom: 8px; border-left: 3px solid ${typeColor}; padding-left: 8px;">
                <div style="color: ${typeColor}; font-weight: bold;">[${log.type}]</div>
                <div style="color: #ffffff; font-size: 11px;">${log.timestamp.split('T')[1].split('.')[0]}</div>
                <div style="color: #ffffff; margin-top: 4px;">${this.escapeHtml(log.message)}</div>
                ${Object.keys(log.context).length > 0 ? 
                    `<div style="color: #888; font-size: 10px; margin-top: 2px;">
                        ${this.escapeHtml(JSON.stringify(log.context, null, 2))}
                    </div>` : ''}
            </div>`;
        }).join('');
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    },

    showDisplay() {
        if (this.logElement) {
            this.logElement.classList.add('show');
        }
    },

    hideDisplay() {
        if (this.logElement) {
            this.logElement.classList.remove('show');
        }
    },

    toggleDisplay() {
        if (this.logElement) {
            if (this.logElement.classList.contains('show')) {
                this.hideDisplay();
            } else {
                this.showDisplay();
            }
        }
    },

    // Export logs for troubleshooting
    exportLogs() {
        const dataStr = JSON.stringify(this.logs, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `vr-logs-${new Date().toISOString()}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.log('INFO', 'Logs exported successfully');
    }
};

// Make globally available
window.ErrorLogger = ErrorLogger;
